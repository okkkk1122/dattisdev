export type SiteLocale = 'fa' | 'en' | 'ar';

/** Arabic-speaking countries → Arabic UI */
const ARABIC_COUNTRIES = new Set([
  'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'YE', 'IQ', 'SY', 'JO', 'LB', 'PS',
  'EG', 'LY', 'TN', 'DZ', 'MA', 'SD', 'MR', 'SO', 'DJ', 'KM',
]);

/** Iran → Persian UI */
const PERSIAN_COUNTRIES = new Set(['IR']);

export function localeFromCountryCode(countryCode: string | null | undefined): SiteLocale {
  const code = (countryCode || '').toUpperCase();
  if (!code || code === 'XX') return 'en';
  if (PERSIAN_COUNTRIES.has(code)) return 'fa';
  if (ARABIC_COUNTRIES.has(code)) return 'ar';
  return 'en';
}

function isPrivateIp(ip: string): boolean {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return true;
  if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('169.254.')) return true;
  if (ip.startsWith('172.')) {
    const second = Number(ip.split('.')[1]);
    if (second >= 16 && second <= 31) return true;
  }
  if (ip.startsWith('fc') || ip.startsWith('fd') || ip.startsWith('fe80')) return true;
  return false;
}

export function getClientIp(headers: Headers): string {
  const directCandidates = [
    headers.get('cf-connecting-ip'),
    headers.get('true-client-ip'),
    headers.get('x-real-ip'),
  ];

  for (const ip of directCandidates) {
    const trimmed = ip?.trim();
    if (trimmed && !isPrivateIp(trimmed)) return trimmed;
  }

  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    for (const part of forwarded.split(',').map((s) => s.trim())) {
      if (part && !isPrivateIp(part)) return part;
    }
  }

  return '127.0.0.1';
}

export function countryCodeFromHeaders(headers: Headers): string | null {
  const headerCountry =
    headers.get('cf-ipcountry') ||
    headers.get('x-vercel-ip-country') ||
    headers.get('x-country-code') ||
    headers.get('cloudfront-viewer-country');

  if (headerCountry && headerCountry !== 'XX') {
    return headerCountry.toUpperCase();
  }
  return null;
}

async function fetchCountryFromIp(ip: string): Promise<string | null> {
  const providers = [
    async () => {
      const res = await fetch(`https://ipwho.is/${ip}?fields=country_code`, {
        signal: AbortSignal.timeout(2500),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return typeof data.country_code === 'string' ? data.country_code : null;
    },
    async () => {
      const res = await fetch(`https://ipapi.co/${ip}/country/`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) return null;
      const text = (await res.text()).trim().toUpperCase();
      return /^[A-Z]{2}$/.test(text) ? text : null;
    },
    async () => {
      const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return typeof data.countryCode === 'string' ? data.countryCode : null;
    },
  ];

  for (const provider of providers) {
    try {
      const code = await provider();
      if (code) return code.toUpperCase();
    } catch {
      // try next provider
    }
  }
  return null;
}

export async function detectCountryCode(
  headers: Headers,
  geoCountry?: string | null
): Promise<string> {
  const fromHeaders = countryCodeFromHeaders(headers);
  if (fromHeaders) return fromHeaders;

  if (geoCountry) return geoCountry.toUpperCase();

  const ip = getClientIp(headers);
  if (isPrivateIp(ip)) return 'IR';

  const fromApi = await fetchCountryFromIp(ip);
  return fromApi || 'US';
}

export async function detectLocaleFromRequest(
  headers: Headers,
  geoCountry?: string | null
): Promise<SiteLocale> {
  const country = await detectCountryCode(headers, geoCountry);
  return localeFromCountryCode(country);
}
