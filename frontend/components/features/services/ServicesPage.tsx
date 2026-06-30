'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Smartphone, Bot, Code, Check, ArrowLeft, Sparkles } from 'lucide-react';
import Button from '@/components/common/Button';
import { serviceImages } from '@/lib/data/sectionImages';
import Image from 'next/image';
import Link from 'next/link';
import { usePricingStore } from '@/lib/stores/pricingStore';
import { formatStartingPrice } from '@/lib/i18n/localeHelpers';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'خدمات ما',
    subtitle: 'راهکارهای حرفه‌ای برای رشد دیجیتال کسب‌وکار شما',
    heroBadge: '۴ حوزه تخصصی',
    ctaTitle: 'پروژه بعدی‌تان را با ما شروع کنید',
    ctaSubtitle: 'مشاوره رایگان و برآورد قیمت در کمتر از ۲۴ ساعت',
    webDesign: {
      title: 'طراحی سایت',
      description: 'طراحی سایت‌های مدرن، واکنش‌گرا و بهینه‌شده برای موتورهای جستجو',
      features: ['طراحی واکنش‌گرا', 'بهینه‌سازی SEO', 'سرعت بالا', 'امنیت', 'پشتیبانی کامل'],
      price: '',
    },
    appDevelopment: {
      title: 'توسعه اپلیکیشن',
      description: 'توسعه اپلیکیشن‌های موبایل برای iOS و Android',
      features: ['iOS و Android', 'طراحی UX/UI', 'عملکرد بالا', 'پشتیبانی', 'بروزرسانی'],
      price: '',
    },
    botDevelopment: {
      title: 'توسعه ربات',
      description: 'ربات‌های هوشمند برای تلگرام، واتساپ و سایر پلتفرم‌ها',
      features: ['ربات تلگرام', 'ربات واتساپ', 'هوش مصنوعی', 'اتوماسیون', 'پشتیبانی'],
      price: '',
    },
    softwareDevelopment: {
      title: 'توسعه نرم‌افزار',
      description: 'نرم‌افزارهای سفارشی برای نیازهای خاص کسب‌وکار شما',
      features: ['نرم‌افزار سفارشی', 'مقیاس‌پذیری', 'امنیت بالا', 'پشتیبانی', 'مستندات'],
      price: 'قیمت بر اساس پروژه',
    },
    contactUs: 'تماس با ما',
    freeConsult: 'مشاوره رایگان',
  },
  en: {
    title: 'Our Services',
    subtitle: 'Professional solutions for your digital growth',
    heroBadge: '4 specialized areas',
    ctaTitle: 'Start your next project with us',
    ctaSubtitle: 'Free consultation and quote within 24 hours',
    webDesign: {
      title: 'Web Design',
      description: 'Modern, responsive and SEO-optimized website design',
      features: ['Responsive Design', 'SEO Optimization', 'High Speed', 'Security', 'Full Support'],
      price: '',
    },
    appDevelopment: {
      title: 'App Development',
      description: 'Mobile app development for iOS and Android',
      features: ['iOS & Android', 'UX/UI Design', 'High Performance', 'Support', 'Updates'],
      price: '',
    },
    botDevelopment: {
      title: 'Bot Development',
      description: 'Smart bots for Telegram, WhatsApp and other platforms',
      features: ['Telegram Bot', 'WhatsApp Bot', 'AI Integration', 'Automation', 'Support'],
      price: '',
    },
    softwareDevelopment: {
      title: 'Software Development',
      description: 'Custom software for your specific business needs',
      features: ['Custom Software', 'Scalability', 'High Security', 'Support', 'Documentation'],
      price: 'Project-based pricing',
    },
    contactUs: 'Contact Us',
    freeConsult: 'Free Consultation',
  },
  ar: {
    title: 'خدماتنا',
    subtitle: 'حلول احترافية لنمو أعمالك الرقمي',
    heroBadge: '٤ مجالات متخصصة',
    ctaTitle: 'ابدأ مشروعك القادم معنا',
    ctaSubtitle: 'استشارة مجانية وتقدير سعر خلال ٢٤ ساعة',
    webDesign: {
      title: 'تصميم المواقع',
      description: 'تصميم مواقع حديثة ومتجاوبة ومحسّنة لمحركات البحث',
      features: ['تصميم متجاوب', 'تحسين SEO', 'سرعة عالية', 'الأمان', 'دعم كامل'],
      price: '',
    },
    appDevelopment: {
      title: 'تطوير التطبيقات',
      description: 'تطوير تطبيقات الهاتف المحمول لنظامي iOS و Android',
      features: ['iOS و Android', 'تصميم UX/UI', 'أداء عالي', 'الدعم', 'التحديثات'],
      price: '',
    },
    botDevelopment: {
      title: 'تطوير الروبوتات',
      description: 'روبوتات ذكية لتلجرام وواتساب ومنصات أخرى',
      features: ['روبوت تلجرام', 'روبوت واتساب', 'الذكاء الاصطناعي', 'الأتمتة', 'الدعم'],
      price: '',
    },
    softwareDevelopment: {
      title: 'تطوير البرمجيات',
      description: 'برمجيات مخصصة لاحتياجات أعمالك الخاصة',
      features: ['برمجيات مخصصة', 'قابلية التوسع', 'أمان عالي', 'الدعم', 'التوثيق'],
      price: 'تسعير حسب المشروع',
    },
    contactUs: 'اتصل بنا',
    freeConsult: 'استشارة مجانية',
  },
};

const servicePricingMap: Record<string, 'web' | 'app' | 'bot' | 'software'> = {
  webDesign: 'web',
  appDevelopment: 'app',
  botDevelopment: 'bot',
  softwareDevelopment: 'software',
};

const servicePriceFallback: Record<string, { priceRial: number; priceUsd: number } | null> = {
  botDevelopment: { priceRial: 20000000, priceUsd: 100 },
  softwareDevelopment: null,
};

type ServiceKey = 'webDesign' | 'appDevelopment' | 'botDevelopment' | 'softwareDevelopment';

interface ServiceTheme {
  iconBg: string;
  imageOverlay: string;
  accentBar: string;
  featureBg: string;
  checkBg: string;
  checkColor: string;
  priceColor: string;
  tagBg: string;
  tagText: string;
}

const serviceThemes: Record<ServiceKey, ServiceTheme> = {
  webDesign: {
    iconBg: 'from-primary-500 to-primary-700',
    imageOverlay: 'from-primary-950/85 via-primary-800/55 to-primary-600/25',
    accentBar: 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600',
    featureBg: 'bg-primary-50/90 dark:bg-primary-950/30',
    checkBg: 'bg-primary-100 dark:bg-primary-900/50',
    checkColor: 'text-primary-600 dark:text-primary-400',
    priceColor: 'text-primary-700 dark:text-primary-300',
    tagBg: 'bg-primary-100/90 dark:bg-primary-900/40',
    tagText: 'text-primary-700 dark:text-primary-300',
  },
  appDevelopment: {
    iconBg: 'from-primary-500 to-secondary-600',
    imageOverlay: 'from-secondary-950/85 via-primary-900/50 to-secondary-600/25',
    accentBar: 'bg-gradient-to-r from-primary-400 via-secondary-500 to-secondary-600',
    featureBg: 'bg-secondary-50/90 dark:bg-secondary-950/30',
    checkBg: 'bg-secondary-100 dark:bg-secondary-900/50',
    checkColor: 'text-secondary-600 dark:text-secondary-400',
    priceColor: 'text-secondary-700 dark:text-secondary-300',
    tagBg: 'bg-secondary-100/90 dark:bg-secondary-900/40',
    tagText: 'text-secondary-700 dark:text-secondary-300',
  },
  botDevelopment: {
    iconBg: 'from-secondary-500 to-secondary-700',
    imageOverlay: 'from-secondary-950/85 via-secondary-800/55 to-primary-700/25',
    accentBar: 'bg-gradient-to-r from-secondary-400 via-secondary-500 to-secondary-700',
    featureBg: 'bg-secondary-50/90 dark:bg-secondary-950/30',
    checkBg: 'bg-secondary-100 dark:bg-secondary-900/50',
    checkColor: 'text-secondary-600 dark:text-secondary-400',
    priceColor: 'text-secondary-700 dark:text-secondary-300',
    tagBg: 'bg-secondary-100/90 dark:bg-secondary-900/40',
    tagText: 'text-secondary-700 dark:text-secondary-300',
  },
  softwareDevelopment: {
    iconBg: 'from-primary-600 to-secondary-700',
    imageOverlay: 'from-slate-950/85 via-primary-900/50 to-secondary-800/30',
    accentBar: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500',
    featureBg: 'bg-slate-50/90 dark:bg-slate-800/50',
    checkBg: 'bg-primary-100 dark:bg-primary-900/50',
    checkColor: 'text-primary-600 dark:text-primary-400',
    priceColor: 'text-accent-600 dark:text-accent-400',
    tagBg: 'bg-accent-100/90 dark:bg-accent-500/15',
    tagText: 'text-accent-700 dark:text-accent-400',
  },
};

const services: { icon: typeof Monitor; key: ServiceKey }[] = [
  { icon: Monitor, key: 'webDesign' },
  { icon: Smartphone, key: 'appDevelopment' },
  { icon: Bot, key: 'botDevelopment' },
  { icon: Code, key: 'softwareDevelopment' },
];

export default function ServicesPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const { getPlansByService } = usePricingStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getServicePrice = (serviceKey: string, staticFallback: string) => {
    const serviceType = servicePricingMap[serviceKey];
    const plans = serviceType ? getPlansByService(serviceType) : [];
    if (plans.length) return formatStartingPrice(plans, locale, staticFallback);
    const fallback = servicePriceFallback[serviceKey];
    if (fallback) return formatStartingPrice([fallback], locale, staticFallback);
    return staticFallback;
  };

  return (
    <>
      <section className="page-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12)_0%,_transparent_55%)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-accent-300" />
              {t.heroBadge}
            </span>
            <h1 className="page-hero-title">{t.title}</h1>
            <p className="page-hero-subtitle">{t.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-16 md:py-20 section-surface-tint">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              const theme = serviceThemes[service.key];
              const serviceData = t[service.key] as {
                title: string;
                description: string;
                features: string[];
                price: string;
              };
              const priceText = getServicePrice(service.key, serviceData.price);

              return (
                <motion.article
                  key={service.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="service-card group h-full flex flex-col"
                >
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <Image
                      src={serviceImages[service.key]}
                      alt={serviceData.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${theme.imageOverlay}`}
                    />
                    <div className="absolute top-5 right-5 flex items-center gap-3">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${theme.iconBg} flex items-center justify-center shadow-brand-lg ring-2 ring-white/25`}
                      >
                        <Icon className="text-white" size={28} />
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-6 pt-16 bg-gradient-to-t from-black/50 to-transparent">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${theme.tagBg} ${theme.tagText}`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
                        {serviceData.title}
                      </h2>
                    </div>
                  </div>

                  <div className={`h-1 ${theme.accentBar}`} />

                  <div className="p-7 md:p-8 flex flex-col flex-1">
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                      {serviceData.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {serviceData.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${theme.featureBg}`}
                        >
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${theme.checkBg}`}
                          >
                            <Check className={theme.checkColor} size={16} />
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-700/60">
                      {priceText ? (
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {locale === 'en' ? 'Starting from' : locale === 'ar' ? 'يبدأ من' : 'شروع از'}
                          </p>
                          <span className={`text-xl md:text-2xl font-bold ${theme.priceColor}`}>
                            {priceText}
                          </span>
                        </div>
                      ) : (
                        <div />
                      )}
                      <Link href={`/${locale}/contact`} className="sm:flex-shrink-0">
                        <Button className="w-full sm:w-auto">
                          {t.contactUs}
                          <ArrowLeft className="mr-2" size={20} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-16 md:mt-20 rounded-2xl bg-brand-gradient p-8 md:p-12 text-center text-white shadow-brand-lg relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.ctaTitle}</h3>
              <p className="text-white/85 text-lg mb-8 max-w-xl mx-auto">{t.ctaSubtitle}</p>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-white/90 shadow-lg border-0"
                >
                  {t.freeConsult}
                  <ArrowLeft className="mr-2" size={20} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
