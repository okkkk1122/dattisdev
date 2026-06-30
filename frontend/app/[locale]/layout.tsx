import { setRequestLocale } from 'next-intl/server';
import ClientLocaleLayout from './ClientLocaleLayout';
import { inter, iranSharp, heroLotus, vazirmatn } from '@/lib/fonts';
import '../globals.css';

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
      className={`${vazirmatn.variable} ${iranSharp.variable} ${heroLotus.variable} ${inter.variable}`}
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
