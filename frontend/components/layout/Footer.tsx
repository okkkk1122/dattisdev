'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

const translations: Record<string, Record<string, any>> = {
  fa: {
    description: 'داتیس‌دِو یک تیم حرفه‌ای از توسعه‌دهندگان و طراحان است که راهکارهای دیجیتال خلاقانه برای کسب‌وکار شما ارائه می‌دهد.',
    company: 'شرکت',
    services: 'خدمات',
    resources: 'منابع',
    contactUs: 'ارتباط با ما',
    about: 'درباره ما',
    portfolio: 'نمونه کارها',
    blog: 'بلاگ',
    pricing: 'تعرفه‌ها',
    faq: 'سوالات متداول',
    contact: 'تماس با ما',
    privacy: 'حریم خصوصی',
    terms: 'قوانین',
    rights: 'تمامی حقوق محفوظ است.',
    newsletter: {
      title: 'عضویت در خبرنامه',
      placeholder: 'ایمیل شما',
      subscribe: 'عضویت',
    },
  },
  en: {
    description: 'DattisDev is a professional team of developers and designers providing creative digital solutions for your business.',
    company: 'Company',
    services: 'Services',
    resources: 'Resources',
    contactUs: 'Contact Us',
    about: 'About Us',
    portfolio: 'Portfolio',
    blog: 'Blog',
    pricing: 'Pricing',
    faq: 'FAQ',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    rights: 'All rights reserved.',
    newsletter: {
      title: 'Newsletter',
      placeholder: 'Your email',
      subscribe: 'Subscribe',
    },
  },
  ar: {
    description: 'داتيس ديف هو فريق محترف من المطورين والمصممين يقدم حلولاً رقمية إبداعية لأعمالك.',
    company: 'الشركة',
    services: 'الخدمات',
    resources: 'الموارد',
    contactUs: 'اتصل بنا',
    about: 'من نحن',
    portfolio: 'معرض الأعمال',
    blog: 'المدونة',
    pricing: 'الأسعار',
    faq: 'الأسئلة الشائعة',
    contact: 'اتصل',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    rights: 'جميع الحقوق محفوظة.',
    newsletter: {
      title: 'النشرة الإخبارية',
      placeholder: 'بريدك الإلكتروني',
      subscribe: 'اشترك',
    },
  },
};

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;

  const footerLinks = {
    company: [
      { href: `/${locale}/about`, label: t.about },
      { href: `/${locale}/services`, label: t.services },
      { href: `/${locale}/portfolio`, label: t.portfolio },
      { href: `/${locale}/pricing`, label: t.pricing || 'تعرفه‌ها' },
      { href: `/${locale}/faq`, label: t.faq || 'سوالات متداول' },
      { href: `/${locale}/contact`, label: t.contact },
    ],
    resources: [
      { href: `/${locale}/blog`, label: t.blog },
      { href: `/${locale}/privacy`, label: t.privacy },
      { href: `/${locale}/terms`, label: t.terms },
    ],
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              DattisDev
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {t.description}
            </p>
            <SocialLinks />
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t.company}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t.resources}</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t.newsletter.title}</h4>
            <p className="text-gray-400 mb-4 text-sm">
              {locale === 'fa' && 'از آخرین اخبار و مقالات ما باخبر شوید'}
              {locale === 'en' && 'Stay updated with our latest news and articles'}
              {locale === 'ar' && 'ابق على اطلاع بآخر أخبارنا ومقالاتنا'}
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={t.newsletter.placeholder}
                className="px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.newsletter.subscribe}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DattisDev. {t.rights}
            </p>
            <div className="flex items-center space-x-6 space-x-reverse">
              <Link
                href={`/${locale}/privacy`}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {t.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
