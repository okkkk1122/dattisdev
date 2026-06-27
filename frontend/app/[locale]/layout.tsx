import { Vazirmatn, Inter } from 'next/font/google';
import { setRequestLocale } from 'next-intl/server';
import ClientLocaleLayout from './ClientLocaleLayout';
import '../globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const locales = ['fa', 'en', 'ar'] as const;

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const isRtl = locale === 'ar' || locale === 'fa';
  const isEnglish = locale === 'en';

  setRequestLocale(locale);

  if (!locales.includes(locale as (typeof locales)[number])) {
    return null;
  }

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${vazirmatn.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${
          isEnglish ? inter.className : vazirmatn.className
        } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors antialiased`}
        suppressHydrationWarning
      >
        <ClientLocaleLayout locale={locale}>{children}</ClientLocaleLayout>
      </body>
    </html>
  );
}
