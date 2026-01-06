'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '@/components/common/Button';
import SocialLinks from './SocialLinks';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from '@/components/common/DarkModeToggle';

const translations: Record<string, Record<string, string>> = {
  fa: {
    home: 'خانه',
    about: 'درباره ما',
    services: 'خدمات',
    portfolio: 'نمونه کارها',
    blog: 'بلاگ',
    contact: 'تماس با ما',
    login: 'ورود',
    register: 'ثبت نام',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact Us',
    login: 'Login',
    register: 'Register',
  },
  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    portfolio: 'معرض الأعمال',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
  },
};

export default function Header() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/services`, label: t.services },
    { href: `/${locale}/portfolio`, label: t.portfolio },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
          : 'bg-white dark:bg-gray-900 shadow-md'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              DattisDev
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"
                  layoutId="underline"
                />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <DarkModeToggle />
            <LanguageSwitcher />
            <SocialLinks />
            <Link href={`/${locale}/login`}>
              <Button variant="outline" size="sm">
                {t.login}
              </Button>
            </Link>
            <Link href={`/${locale}/register`}>
              <Button size="sm">{t.register}</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-4 py-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 space-y-2 flex flex-col">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <DarkModeToggle />
                    <LanguageSwitcher />
                    <SocialLinks />
                  </div>
                  <Link href={`/${locale}/login`} className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      {t.login}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/register`} className="block">
                    <Button size="sm" className="w-full">
                      {t.register}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
