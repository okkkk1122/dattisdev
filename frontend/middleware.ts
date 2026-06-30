import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { detectLocaleFromRequest } from './lib/geo/localeFromCountry';

const LOCALES = ['fa', 'en', 'ar'] as const;
type AppLocale = (typeof LOCALES)[number];

const LOCALE_COOKIE = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const intlMiddleware = createMiddleware({
  locales: [...LOCALES],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: false,
});

function isValidLocale(value: string | undefined | null): value is AppLocale {
  return !!value && LOCALES.includes(value as AppLocale);
}

function redirectToLocale(request: NextRequest, locale: AppLocale): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (pathname === '/' || pathname === '') {
    if (isValidLocale(savedLocale)) {
      return redirectToLocale(request, savedLocale);
    }

    const locale = await detectLocaleFromRequest(request.headers, request.geo?.country);
    return redirectToLocale(request, locale);
  }

  const response = intlMiddleware(request);

  if (isValidLocale(savedLocale)) {
    response.cookies.set(LOCALE_COOKIE, savedLocale, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};
