'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Shield, Code, Heart, Rocket, Target } from 'lucide-react';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'چرا داتیس‌دِو را انتخاب کنید؟',
    subtitle: 'ما با تخصص و تجربه، بهترین راهکارها را برای شما ارائه می‌دهیم',
    quality: {
      title: 'کیفیت بالا',
      description: 'استفاده از بهترین تکنولوژی‌ها و استانداردهای صنعتی',
    },
    speed: {
      title: 'سرعت بالا',
      description: 'تحویل سریع پروژه‌ها بدون کاهش کیفیت',
    },
    support: {
      title: 'پشتیبانی کامل',
      description: 'پشتیبانی 24/7 برای تمام پروژه‌های شما',
    },
    innovation: {
      title: 'نوآوری',
      description: 'استفاده از جدیدترین تکنولوژی‌ها و روش‌های توسعه',
    },
    security: {
      title: 'امنیت',
      description: 'رعایت بالاترین استانداردهای امنیتی',
    },
    experience: {
      title: 'تجربه',
      description: 'سال‌ها تجربه در توسعه پروژه‌های بزرگ',
    },
  },
  en: {
    title: 'Why Choose DattisDev?',
    subtitle: 'We provide the best solutions with expertise and experience',
    quality: {
      title: 'High Quality',
      description: 'Using the best technologies and industry standards',
    },
    speed: {
      title: 'Fast Delivery',
      description: 'Quick project delivery without compromising quality',
    },
    support: {
      title: 'Full Support',
      description: '24/7 support for all your projects',
    },
    innovation: {
      title: 'Innovation',
      description: 'Using the latest technologies and development methods',
    },
    security: {
      title: 'Security',
      description: 'Following the highest security standards',
    },
    experience: {
      title: 'Experience',
      description: 'Years of experience in developing large projects',
    },
  },
  ar: {
    title: 'لماذا تختار داتيس ديف؟',
    subtitle: 'نقدم أفضل الحلول بخبرة وتجربة',
    quality: {
      title: 'جودة عالية',
      description: 'استخدام أفضل التقنيات والمعايير الصناعية',
    },
    speed: {
      title: 'سرعة عالية',
      description: 'تسليم سريع للمشاريع دون تقليل الجودة',
    },
    support: {
      title: 'دعم كامل',
      description: 'دعم 24/7 لجميع مشاريعك',
    },
    innovation: {
      title: 'الابتكار',
      description: 'استخدام أحدث التقنيات وطرق التطوير',
    },
    security: {
      title: 'الأمان',
      description: 'اتباع أعلى معايير الأمان',
    },
    experience: {
      title: 'التجربة',
      description: 'سنوات من الخبرة في تطوير المشاريع الكبيرة',
    },
  },
};

const features = [
  { icon: Zap, key: 'speed' },
  { icon: Shield, key: 'security' },
  { icon: Code, key: 'quality' },
  { icon: Heart, key: 'support' },
  { icon: Rocket, key: 'innovation' },
  { icon: Target, key: 'experience' },
];

export default function FeaturesSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div ref={ref} className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const featureData = t[feature.key as keyof typeof t] as {
              title: string;
              description: string;
            };
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-xl transition-all group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4 group-hover:bg-primary-600 dark:group-hover:bg-primary-700 transition-colors"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon
                    className="text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors"
                    size={28}
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {featureData.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {featureData.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

