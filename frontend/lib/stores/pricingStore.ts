import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncStoreToBackend } from '@/lib/hooks/useContentSync';

export interface PricingFeature {
  id: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  nameEn: string;
  nameAr: string;
  description: string;
  descriptionEn: string;
  descriptionAr: string;
  /** Iranian Rial — shown on Persian (fa) locale */
  priceRial: number;
  /** US Dollar — shown on English and Arabic locales */
  priceUsd: number;
  /** @deprecated migrated to priceRial */
  price?: number;
  /** @deprecated */
  currency?: string;
  period: 'monthly' | 'yearly' | 'one-time';
  features: PricingFeature[];
  popular?: boolean;
  service: 'web' | 'app' | 'bot' | 'software' | 'all';
  status: 'فعال' | 'غیرفعال';
}

export const defaultPricingPlans: PricingPlan[] = [
  {
    id: 'web-basic',
    name: 'پکیج پایه',
    nameEn: 'Basic Package',
    nameAr: 'الباقة الأساسية',
    description: 'مناسب برای کسب‌وکارهای کوچک',
    descriptionEn: 'Perfect for small businesses',
    descriptionAr: 'مثالي للشركات الصغيرة',
    priceRial: 50000000,
    priceUsd: 199,
    period: 'one-time',
    service: 'web',
    status: 'فعال',
    features: [
      { id: '1', name: 'طراحی 5 صفحه', nameEn: '5 Page Design', nameAr: 'تصميم 5 صفحات', included: true },
      { id: '2', name: 'واکنش‌گرا (Responsive)', nameEn: 'Responsive Design', nameAr: 'متجاوب (Responsive)', included: true },
      { id: '3', name: 'سیستم مدیریت محتوا', nameEn: 'Content Management System', nameAr: 'نظام إدارة المحتوى', included: true },
      { id: '4', name: 'بهینه‌سازی SEO', nameEn: 'SEO Optimization', nameAr: 'تحسين SEO', included: false },
      { id: '5', name: 'پشتیبانی 3 ماهه', nameEn: '3 Months Support', nameAr: 'دعم 3 أشهر', included: true },
    ],
  },
  {
    id: 'web-pro',
    name: 'پکیج حرفه‌ای',
    nameEn: 'Professional Package',
    nameAr: 'الباقة الاحترافية',
    description: 'مناسب برای کسب‌وکارهای متوسط',
    descriptionEn: 'Perfect for medium businesses',
    descriptionAr: 'مثالي للشركات المتوسطة',
    priceRial: 150000000,
    priceUsd: 599,
    period: 'one-time',
    service: 'web',
    status: 'فعال',
    popular: true,
    features: [
      { id: '1', name: 'طراحی نامحدود صفحه', nameEn: 'Unlimited Pages', nameAr: 'صفحات غير محدودة', included: true },
      { id: '2', name: 'واکنش‌گرا (Responsive)', nameEn: 'Responsive Design', nameAr: 'متجاوب (Responsive)', included: true },
      { id: '3', name: 'سیستم مدیریت محتوا پیشرفته', nameEn: 'Advanced CMS', nameAr: 'نظام إدارة محتوى متقدم', included: true },
      { id: '4', name: 'بهینه‌سازی SEO کامل', nameEn: 'Full SEO Optimization', nameAr: 'تحسين SEO كامل', included: true },
      { id: '5', name: 'پشتیبانی 6 ماهه', nameEn: '6 Months Support', nameAr: 'دعم 6 أشهر', included: true },
      { id: '6', name: 'پنل ادمین', nameEn: 'Admin Panel', nameAr: 'لوحة الإدارة', included: true },
    ],
  },
  {
    id: 'web-enterprise',
    name: 'پکیج سازمانی',
    nameEn: 'Enterprise Package',
    nameAr: 'الباقة المؤسسية',
    description: 'مناسب برای شرکت‌های بزرگ',
    descriptionEn: 'Perfect for large companies',
    descriptionAr: 'مثالي للشركات الكبيرة',
    priceRial: 300000000,
    priceUsd: 1199,
    period: 'one-time',
    service: 'web',
    status: 'فعال',
    features: [
      { id: '1', name: 'طراحی نامحدود صفحه', nameEn: 'Unlimited Pages', nameAr: 'صفحات غير محدودة', included: true },
      { id: '2', name: 'واکنش‌گرا (Responsive)', nameEn: 'Responsive Design', nameAr: 'متجاوب (Responsive)', included: true },
      { id: '3', name: 'سیستم مدیریت محتوا سفارشی', nameEn: 'Custom CMS', nameAr: 'نظام إدارة محتوى مخصص', included: true },
      { id: '4', name: 'بهینه‌سازی SEO کامل', nameEn: 'Full SEO Optimization', nameAr: 'تحسين SEO كامل', included: true },
      { id: '5', name: 'پشتیبانی 12 ماهه', nameEn: '12 Months Support', nameAr: 'دعم 12 شهرًا', included: true },
      { id: '6', name: 'پنل ادمین پیشرفته', nameEn: 'Advanced Admin Panel', nameAr: 'لوحة إدارة متقدمة', included: true },
      { id: '7', name: 'API سفارشی', nameEn: 'Custom API', nameAr: 'واجهة API مخصصة', included: true },
      { id: '8', name: 'مشاوره رایگان', nameEn: 'Free Consultation', nameAr: 'استشارة مجانية', included: true },
    ],
  },
  {
    id: 'app-basic',
    name: 'اپلیکیشن پایه',
    nameEn: 'Basic App',
    nameAr: 'التطبيق الأساسي',
    description: 'اپلیکیشن ساده برای iOS و Android',
    descriptionEn: 'Simple app for iOS and Android',
    descriptionAr: 'تطبيق بسيط لنظامي iOS و Android',
    priceRial: 200000000,
    priceUsd: 799,
    period: 'one-time',
    service: 'app',
    status: 'فعال',
    features: [
      { id: '1', name: 'طراحی UI/UX', nameEn: 'UI/UX Design', nameAr: 'تصميم UI/UX', included: true },
      { id: '2', name: 'توسعه iOS و Android', nameEn: 'iOS & Android Development', nameAr: 'تطوير iOS و Android', included: true },
      { id: '3', name: '5 صفحه اصلی', nameEn: '5 Main Screens', nameAr: '5 شاشات رئيسية', included: true },
      { id: '4', name: 'پشتیبانی 3 ماهه', nameEn: '3 Months Support', nameAr: 'دعم 3 أشهر', included: true },
    ],
  },
  {
    id: 'app-pro',
    name: 'اپلیکیشن حرفه‌ای',
    nameEn: 'Professional App',
    nameAr: 'التطبيق الاحترافي',
    description: 'اپلیکیشن کامل با قابلیت‌های پیشرفته',
    descriptionEn: 'Complete app with advanced features',
    descriptionAr: 'تطبيق كامل بميزات متقدمة',
    priceRial: 500000000,
    priceUsd: 1999,
    period: 'one-time',
    service: 'app',
    status: 'فعال',
    popular: true,
    features: [
      { id: '1', name: 'طراحی UI/UX پیشرفته', nameEn: 'Advanced UI/UX Design', nameAr: 'تصميم UI/UX متقدم', included: true },
      { id: '2', name: 'توسعه iOS و Android', nameEn: 'iOS & Android Development', nameAr: 'تطوير iOS و Android', included: true },
      { id: '3', name: 'صفحات نامحدود', nameEn: 'Unlimited Screens', nameAr: 'شاشات غير محدودة', included: true },
      { id: '4', name: 'پنل مدیریت', nameEn: 'Management Panel', nameAr: 'لوحة الإدارة', included: true },
      { id: '5', name: 'پشتیبانی 6 ماهه', nameEn: '6 Months Support', nameAr: 'دعم 6 أشهر', included: true },
      { id: '6', name: 'انتشار در استورها', nameEn: 'App Store Publishing', nameAr: 'النشر في المتاجر', included: true },
    ],
  },
];

interface PricingState {
  plans: PricingPlan[];
  addPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  updatePlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePlan: (id: string) => void;
  getPlan: (id: string) => PricingPlan | undefined;
  getPlansByService: (service: 'web' | 'app' | 'bot' | 'software' | 'all') => PricingPlan[];
  getActivePlans: () => PricingPlan[];
}

export const usePricingStore = create<PricingState>()(
  persist(
    (set, get) => ({
      plans: defaultPricingPlans,
      addPlan: (plan) => {
        const newPlan: PricingPlan = {
          ...plan,
          id: `plan-${Date.now()}`,
        };
        set((state) => ({
          plans: [...state.plans, newPlan],
        }));
        syncStoreToBackend('pricing', get().plans);
      },
      updatePlan: (id, updatedPlan) => {
        set((state) => ({
          plans: state.plans.map((plan) => (plan.id === id ? { ...plan, ...updatedPlan } : plan)),
        }));
        syncStoreToBackend('pricing', get().plans);
      },
      deletePlan: (id) => {
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== id),
        }));
        syncStoreToBackend('pricing', get().plans);
      },
      getPlan: (id) => {
        return get().plans.find((plan) => plan.id === id);
      },
      getPlansByService: (service) => {
        if (service === 'all') {
          return get().getActivePlans();
        }
        return get()
          .getActivePlans()
          .filter((plan) => plan.service === service);
      },
      getActivePlans: () => {
        return get().plans.filter((plan) => plan.status === 'فعال');
      },
    }),
    {
      name: 'dattisdev-pricing-storage-v4',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: true,
    }
  )
);
