'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Smartphone, Bot, Code, Check, ArrowLeft } from 'lucide-react';
import Button from '@/components/common/Button';
import Link from 'next/link';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'خدمات ما',
    subtitle: 'راهکارهای حرفه‌ای برای کسب‌وکار شما',
    webDesign: {
      title: 'طراحی سایت',
      description: 'طراحی سایت‌های مدرن، واکنش‌گرا و بهینه‌شده برای موتورهای جستجو',
      features: ['طراحی واکنش‌گرا', 'بهینه‌سازی SEO', 'سرعت بالا', 'امنیت', 'پشتیبانی کامل'],
      price: 'از 5,000,000 تومان',
    },
    appDevelopment: {
      title: 'توسعه اپلیکیشن',
      description: 'توسعه اپلیکیشن‌های موبایل برای iOS و Android',
      features: ['iOS و Android', 'طراحی UX/UI', 'عملکرد بالا', 'پشتیبانی', 'بروزرسانی'],
      price: 'از 10,000,000 تومان',
    },
    botDevelopment: {
      title: 'توسعه ربات',
      description: 'ربات‌های هوشمند برای تلگرام، واتساپ و سایر پلتفرم‌ها',
      features: ['ربات تلگرام', 'ربات واتساپ', 'هوش مصنوعی', 'اتوماسیون', 'پشتیبانی'],
      price: 'از 2,000,000 تومان',
    },
    softwareDevelopment: {
      title: 'توسعه نرم‌افزار',
      description: 'نرم‌افزارهای سفارشی برای نیازهای خاص کسب‌وکار شما',
      features: ['نرم‌افزار سفارشی', 'مقیاس‌پذیری', 'امنیت بالا', 'پشتیبانی', 'مستندات'],
      price: 'قیمت بر اساس پروژه',
    },
    contactUs: 'تماس با ما',
  },
  en: {
    title: 'Our Services',
    subtitle: 'Professional solutions for your business',
    webDesign: {
      title: 'Web Design',
      description: 'Modern, responsive and SEO-optimized website design',
      features: ['Responsive Design', 'SEO Optimization', 'High Speed', 'Security', 'Full Support'],
      price: 'From $200',
    },
    appDevelopment: {
      title: 'App Development',
      description: 'Mobile app development for iOS and Android',
      features: ['iOS & Android', 'UX/UI Design', 'High Performance', 'Support', 'Updates'],
      price: 'From $500',
    },
    botDevelopment: {
      title: 'Bot Development',
      description: 'Smart bots for Telegram, WhatsApp and other platforms',
      features: ['Telegram Bot', 'WhatsApp Bot', 'AI Integration', 'Automation', 'Support'],
      price: 'From $100',
    },
    softwareDevelopment: {
      title: 'Software Development',
      description: 'Custom software for your specific business needs',
      features: ['Custom Software', 'Scalability', 'High Security', 'Support', 'Documentation'],
      price: 'Project-based pricing',
    },
    contactUs: 'Contact Us',
  },
  ar: {
    title: 'خدماتنا',
    subtitle: 'حلول احترافية لأعمالك',
    webDesign: {
      title: 'تصميم المواقع',
      description: 'تصميم مواقع حديثة ومتجاوبة ومحسّنة لمحركات البحث',
      features: ['تصميم متجاوب', 'تحسين SEO', 'سرعة عالية', 'الأمان', 'دعم كامل'],
      price: 'من 200 دولار',
    },
    appDevelopment: {
      title: 'تطوير التطبيقات',
      description: 'تطوير تطبيقات الهاتف المحمول لنظامي iOS و Android',
      features: ['iOS و Android', 'تصميم UX/UI', 'أداء عالي', 'الدعم', 'التحديثات'],
      price: 'من 500 دولار',
    },
    botDevelopment: {
      title: 'تطوير الروبوتات',
      description: 'روبوتات ذكية لتلجرام وواتساب ومنصات أخرى',
      features: ['روبوت تلجرام', 'روبوت واتساب', 'الذكاء الاصطناعي', 'الأتمتة', 'الدعم'],
      price: 'من 100 دولار',
    },
    softwareDevelopment: {
      title: 'تطوير البرمجيات',
      description: 'برمجيات مخصصة لاحتياجات أعمالك الخاصة',
      features: ['برمجيات مخصصة', 'قابلية التوسع', 'أمان عالي', 'الدعم', 'التوثيق'],
      price: 'تسعير حسب المشروع',
    },
    contactUs: 'اتصل بنا',
  },
};

const services = [
  { icon: Monitor, key: 'webDesign', color: 'from-blue-500 to-cyan-500' },
  { icon: Smartphone, key: 'appDevelopment', color: 'from-purple-500 to-pink-500' },
  { icon: Bot, key: 'botDevelopment', color: 'from-green-500 to-emerald-500' },
  { icon: Code, key: 'softwareDevelopment', color: 'from-orange-500 to-red-500' },
];

export default function ServicesPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const serviceData = t[service.key as keyof typeof t] as {
              title: string;
              description: string;
              features: string[];
              price: string;
            };
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <Icon className="text-white" size={64} />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {serviceData.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                    {serviceData.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {serviceData.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3 space-x-reverse">
                        <Check className="text-green-500 flex-shrink-0" size={20} />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {serviceData.price}
                    </span>
                    <Link href={`/${locale}/contact`}>
                      <Button>
                        {t.contactUs}
                        <ArrowLeft className="mr-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



