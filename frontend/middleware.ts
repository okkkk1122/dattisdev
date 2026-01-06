import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fa', 'en', 'ar'],
  defaultLocale: 'fa',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};

