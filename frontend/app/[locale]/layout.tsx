'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/chat/ChatWidget';
import BackToTop from '@/components/common/BackToTop';
import LoadingScreen from '@/components/common/LoadingScreen';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/lib/stores/theme';
import '../globals.css';

const locales = ['fa', 'en', 'ar'] as const;

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme, mounted]);

  if (!locales.includes(locale as any)) {
    return null;
  }

  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'fa' ? 'rtl' : 'ltr'}>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <LoadingScreen />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <BackToTop />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
