'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ThemedCard from '@/components/common/ThemedCard';
import type { BackgroundKey } from '@/lib/data/backgroundImages';
import { serviceImages } from '@/lib/data/sectionImages';
import { Monitor, Smartphone, Bot, Code, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
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

const services: { icon: typeof Monitor; key: keyof typeof serviceImages; color: string; bg: BackgroundKey }[] = [
  { icon: Monitor, key: 'webDesign', color: 'from-primary-500 to-primary-700', bg: 'web' },
  { icon: Smartphone, key: 'appDevelopment', color: 'from-primary-600 to-secondary-500', bg: 'app' },
  { icon: Bot, key: 'botDevelopment', color: 'from-secondary-500 to-secondary-700', bg: 'bot' },
  { icon: Code, key: 'softwareDevelopment', color: 'from-primary-500 to-secondary-600', bg: 'software' },
];

export default function ServicesPreviewSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 section-surface-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
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
                <ThemedCard background={service.bg} className="h-full group cursor-pointer overflow-hidden">
                  <div className="relative h-36">
                    <Image
                      src={serviceImages[service.key]}
                      alt={serviceData.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div
                      className={`absolute bottom-3 right-3 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="h-full p-6">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {serviceData.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {serviceData.description}
                    </p>
                  </div>
                </ThemedCard>
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

