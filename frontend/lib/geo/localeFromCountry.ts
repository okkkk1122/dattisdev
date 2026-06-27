export type SiteLocale = 'fa' | 'en' | 'ar';

const ARABIC_COUNTRIES = new Set([
  'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'YE', 'IQ', 'SY', 'JO', 'LB', 'PS',
  'EG', 'LY', 'TN', 'DZ', 'MA', 'SD', 'MR', 'SO', 'DJ', 'KM',
]);

const PERSIAN_COUNTRIES = new Set(['IR', 'AF', 'TJ']);

const ENGLISH_COUNTRIES = new Set([
  'US', 'CA', 'GB', 'AU', 'NZ', 'IE', 'ZA', 'IN', 'PK', 'BD', 'NG', 'KE',
  'GH', 'PH', 'MY', 'SG', 'HK', 'JM', 'TT', 'BB', 'BS', 'BZ', 'GY',
  'DE', 'FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK',
  'FI', 'PL', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'HR', 'SI', 'EE', 'LV',
  'LT', 'LU', 'MT', 'CY', 'IS', 'LI', 'MC', 'AD', 'SM', 'VA', 'UA', 'MD',
  'BY', 'RS', 'BA', 'ME', 'MK', 'AL', 'XK',
]);

export function localeFromCountryCode(countryCode: string | null | undefined): SiteLocale {
  const code = (countryCode || '').toUpperCase();
  if (!code) return 'en';
  if (PERSIAN_COUNTRIES.has(code)) return 'fa';
  if (ARABIC_COUNTRIES.has(code)) return 'ar';
  if (ENGLISH_COUNTRIES.has(code)) return 'en';
  return 'en';
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}
