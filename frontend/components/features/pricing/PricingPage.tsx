'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import ThemedCard from '@/components/common/ThemedCard';
import { usePricingStore, type PricingPlan, type PricingFeature } from '@/lib/stores/pricingStore';
import { formatPlanPriceDisplay, getCurrencyLabel, pickLocalized } from '@/lib/i18n/localeHelpers';
import { pricingServiceImages } from '@/lib/data/sectionImages';
import Image from 'next/image';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'تعرفه خدمات',
    subtitle: 'پکیج‌های مناسب برای هر نوع کسب‌وکار',
    selectService: 'انتخاب خدمت',
    allServices: 'همه خدمات',
    webDesign: 'طراحی سایت',
    appDevelopment: 'توسعه اپلیکیشن',
    botDevelopment: 'توسعه ربات',
    softwareDevelopment: 'توسعه نرم‌افزار',
    monthly: 'ماهانه',
    yearly: 'سالانه',
    oneTime: 'یک‌بار',
    getStarted: 'شروع کنید',
    contactUs: 'تماس با ما',
    included: 'شامل',
    notIncluded: 'شامل نیست',
    popular: 'محبوب',
    noPlans: 'پکیجی برای این خدمت یافت نشد',
    customPackage: 'نیاز به پکیج سفارشی دارید؟',
  },
  en: {
    title: 'Pricing Plans',
    subtitle: 'Suitable packages for every type of business',
    selectService: 'Select Service',
    allServices: 'All Services',
    webDesign: 'Web Design',
    appDevelopment: 'App Development',
    botDevelopment: 'Bot Development',
    softwareDevelopment: 'Software Development',
    monthly: 'Monthly',
    yearly: 'Yearly',
    oneTime: 'One-time',
    getStarted: 'Get Started',
    contactUs: 'Contact Us',
    included: 'Included',
    notIncluded: 'Not Included',
    popular: 'Popular',
    noPlans: 'No packages found for this service',
    customPackage: 'Need a custom package?',
  },
  ar: {
    title: 'خطط الأسعار',
    subtitle: 'حزم مناسبة لكل نوع من الأعمال',
    selectService: 'اختر الخدمة',
    allServices: 'جميع الخدمات',
    webDesign: 'تصميم المواقع',
    appDevelopment: 'تطوير التطبيقات',
    botDevelopment: 'تطوير الروبوتات',
    softwareDevelopment: 'تطوير البرمجيات',
    monthly: 'شهري',
    yearly: 'سنوي',
    oneTime: 'مرة واحدة',
    getStarted: 'ابدأ',
    contactUs: 'اتصل بنا',
    included: 'مشمول',
    notIncluded: 'غير مشمول',
    popular: 'الأكثر شعبية',
    noPlans: 'لم يتم العثور على باقات لهذه الخدمة',
    customPackage: 'هل تحتاج إلى باقة مخصصة؟',
  },
};

export default function PricingPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getPlansByService } = usePricingStore();
  const [selectedService, setSelectedService] = useState<'web' | 'app' | 'bot' | 'software' | 'all'>('all');

  const plans = getPlansByService(selectedService);

  const serviceOptions = [
    { value: 'all', label: t.allServices },
    { value: 'web', label: t.webDesign },
    { value: 'app', label: t.appDevelopment },
    { value: 'bot', label: t.botDevelopment },
    { value: 'software', label: t.softwareDevelopment },
  ];

  const formatPlanPrice = (plan: PricingPlan) => formatPlanPriceDisplay(plan, locale);

  const getPeriodLabel = (period: string) => {
    if (period === 'monthly') return t.monthly;
    if (period === 'yearly') return t.yearly;
    return t.oneTime;
  };

  const getPlanName = (plan: PricingPlan) =>
    pickLocalized(plan as unknown as Record<string, unknown>, 'name', locale);

  const getPlanDescription = (plan: PricingPlan) =>
    pickLocalized(plan as unknown as Record<string, unknown>, 'description', locale);

  const getFeatureName = (feature: PricingFeature) =>
    pickLocalized(feature as unknown as Record<string, unknown>, 'name', locale);

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
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

        {/* Service Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {serviceOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedService(option.value as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedService === option.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              <ThemedCard
                background="pricing"
                className={`h-full overflow-hidden ${plan.popular ? 'ring-4 ring-primary-500' : ''}`}
              >
              <div className="relative h-32">
                <Image
                  src={pricingServiceImages[plan.service] || pricingServiceImages.all}
                  alt={getPlanName(plan)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              </div>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  {t.popular}
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {getPlanName(plan)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {getPlanDescription(plan)}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {locale === 'fa' ? (
                        formatPlanPrice(plan)
                      ) : (
                        <>${formatPlanPrice(plan)}</>
                      )}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 mr-2">
                      {getCurrencyLabel(locale)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {getPeriodLabel(plan.period)}
                  </p>
                </div>

                <Link href={`/${locale}/contact`}>
                  <Button
                    className="w-full mb-6"
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="lg"
                  >
                    {t.getStarted}
                    <ArrowLeft className="mr-2" size={20} />
                  </Button>
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.id} className="flex items-start space-x-3 space-x-reverse">
                      {feature.included ? (
                        <Check className="text-green-500 mt-1 flex-shrink-0" size={20} />
                      ) : (
                        <X className="text-gray-300 dark:text-gray-600 mt-1 flex-shrink-0" size={20} />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-600 line-through'
                        }`}
                      >
                        {getFeatureName(feature)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              </ThemedCard>
            </motion.div>
          ))}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>{t.noPlans}</p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t.customPackage}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" variant="outline">
              {t.contactUs}
              <ArrowLeft className="mr-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}






