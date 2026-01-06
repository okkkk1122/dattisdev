'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Smartphone, Bot, Code, ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'خدمات ما',
    subtitle: 'راهکارهای جامع برای نیازهای دیجیتال شما',
    webDesign: {
      title: 'طراحی سایت',
      description: 'طراحی سایت‌های مدرن، واکنش‌گرا و بهینه‌شده',
    },
    appDevelopment: {
      title: 'توسعه اپلیکیشن',
      description: 'توسعه اپلیکیشن‌های موبایل برای iOS و Android',
    },
    botDevelopment: {
      title: 'توسعه ربات',
      description: 'ربات‌های هوشمند برای تلگرام و واتساپ',
    },
    softwareDevelopment: {
      title: 'توسعه نرم‌افزار',
      description: 'نرم‌افزارهای سفارشی برای کسب‌وکار شما',
    },
    viewAll: 'مشاهده همه خدمات',
  },
  en: {
    title: 'Our Services',
    subtitle: 'Comprehensive solutions for your digital needs',
    webDesign: {
      title: 'Web Design',
      description: 'Modern, responsive and optimized website design',
    },
    appDevelopment: {
      title: 'App Development',
      description: 'Mobile app development for iOS and Android',
    },
    botDevelopment: {
      title: 'Bot Development',
      description: 'Smart bots for Telegram and WhatsApp',
    },
    softwareDevelopment: {
      title: 'Software Development',
      description: 'Custom software for your business',
    },
    viewAll: 'View All Services',
  },
  ar: {
    title: 'خدماتنا',
    subtitle: 'حلول شاملة لاحتياجاتك الرقمية',
    webDesign: {
      title: 'تصميم المواقع',
      description: 'تصميم مواقع حديثة ومتجاوبة ومحسّنة',
    },
    appDevelopment: {
      title: 'تطوير التطبيقات',
      description: 'تطوير تطبيقات الهاتف المحمول لنظامي iOS و Android',
    },
    botDevelopment: {
      title: 'تطوير الروبوتات',
      description: 'روبوتات ذكية لتلجرام وواتساب',
    },
    softwareDevelopment: {
      title: 'تطوير البرمجيات',
      description: 'برمجيات مخصصة لأعمالك',
    },
    viewAll: 'عرض جميع الخدمات',
  },
};

const services = [
  { icon: Monitor, key: 'webDesign', color: 'from-blue-500 to-cyan-500' },
  { icon: Smartphone, key: 'appDevelopment', color: 'from-purple-500 to-pink-500' },
  { icon: Bot, key: 'botDevelopment', color: 'from-green-500 to-emerald-500' },
  { icon: Code, key: 'softwareDevelopment', color: 'from-orange-500 to-red-500' },
];

export default function ServicesPreviewSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const serviceData = t[service.key as keyof typeof t] as {
              title: string;
              description: string;
            };
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="h-full p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {serviceData.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {serviceData.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link href={`/${locale}/services`}>
            <Button size="lg">
              {t.viewAll}
              <ArrowLeft className="mr-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

