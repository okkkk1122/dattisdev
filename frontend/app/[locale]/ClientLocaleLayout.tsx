'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/features/chat/ChatWidget';
import BackToTop from '@/components/common/BackToTop';
import LoadingScreen from '@/components/common/LoadingScreen';
import ContentSyncProvider from '@/components/common/ContentSyncProvider';
import StoreHydrationProvider from '@/lib/providers/StoreHydrationProvider';
import { Toaster } from 'react-hot-toast';
import { useThemeStore, Theme } from '@/lib/stores/theme';

const locales = ['fa', 'en', 'ar'] as const;

export default function ClientLocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const stored = localStorage.getItem('dattisdev-theme') as Theme | null;
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (!locales.includes(locale as (typeof locales)[number])) {
    return null;
  }

  return (
    <StoreHydrationProvider>
      <LoadingScreen locale={locale} />
      <ContentSyncProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget locale={locale} />
        <BackToTop />
      </ContentSyncProvider>
      <Toaster position="top-center" />
    </StoreHydrationProvider>
  );
}
