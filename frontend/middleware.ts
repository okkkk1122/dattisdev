import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, localeFromCountryCode } from './lib/geo/localeFromCountry';

const intlMiddleware = createMiddleware({
  locales: ['fa', 'en', 'ar'],
  defaultLocale: 'fa',
  localePrefix: 'always',
  localeDetection: false,
});

const LOCALE_COOKIE = 'NEXT_LOCALE';
const GEO_COOKIE = 'GEO_LOCALE_SET';

async function detectCountryCode(request: NextRequest): Promise<string> {
  const cfCountry = request.headers.get('cf-ipcountry');
  if (cfCountry && cfCountry !== 'XX') return cfCountry;

  const vercelCountry = request.geo?.country;
  if (vercelCountry) return vercelCountry;

  const ip = getClientIp(request.headers);
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'IR';
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      return data.countryCode || 'US';
    }
  } catch {
    // fallback below
  }
  return 'US';
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const geoSet = request.cookies.get(GEO_COOKIE)?.value;

  if (!userLocale && !geoSet && (pathname === '/' || pathname === '')) {
    const country = await detectCountryCode(request);
    const locale = localeFromCountryCode(country);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(GEO_COOKIE, '1', { maxAge: 60 * 60 * 24 * 30, path: '/' });
    return response;
  }

  const response = intlMiddleware(request);

  if (userLocale && ['fa', 'en', 'ar'].includes(userLocale)) {
    response.cookies.set(LOCALE_COOKIE, userLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
