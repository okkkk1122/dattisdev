import { setRequestLocale } from 'next-intl/server';
import ClientLocaleLayout from './ClientLocaleLayout';
import { inter, iranianSans, yekan, farhang } from '@/lib/fonts';
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
      className={`${iranianSans.variable} ${yekan.variable} ${farhang.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${
          isEnglish ? inter.className : iranianSans.className
        } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors antialiased`}
        suppressHydrationWarning
      >
        <ClientLocaleLayout locale={locale}>{children}</ClientLocaleLayout>
      </body>
    </html>
  );
}
