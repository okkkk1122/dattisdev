import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncStoreToBackend } from '@/lib/hooks/useContentSync';

export interface FAQ {
  id: number;
  question: string;
  questionEn: string;
  questionAr: string;
  answer: string;
  answerEn: string;
  answerAr: string;
  category: 'خدمات' | 'قیمت' | 'فنی' | 'عمومی';
  views: number;
  helpful: number;
  notHelpful: number;
  status: 'فعال' | 'غیرفعال';
  order: number;
}

export const defaultFAQs: FAQ[] = [
  {
    id: 1,
    question: 'چقدر زمان می‌برد تا سایت ما آماده شود؟',
    questionEn: 'How long does it take to build our website?',
    questionAr: 'كم من الوقت يستغرق بناء موقعنا الإلكتروني؟',
    answer: 'زمان تحویل پروژه بستگی به پیچیدگی و حجم کار دارد. معمولاً یک سایت ساده 2-3 هفته، سایت متوسط 4-6 هفته و سایت پیچیده 8-12 هفته زمان می‌برد.',
    answerEn: 'Project delivery time depends on complexity and scope. Usually a simple site takes 2-3 weeks, medium site 4-6 weeks, and complex site 8-12 weeks.',
    answerAr: 'يعتمد وقت التسليم على التعقيد والنطاق. عادة ما يستغرق الموقع البسيط 2-3 أسابيع، والموقع المتوسط 4-6 أسابيع، والموقع المعقد 8-12 أسبوعًا.',
    category: 'خدمات',
    views: 250,
    helpful: 45,
    notHelpful: 2,
    status: 'فعال',
    order: 1,
  },
  {
    id: 2,
    question: 'قیمت طراحی سایت چقدر است؟',
    questionEn: 'How much does website design cost?',
    questionAr: 'كم تكلفة تصميم الموقع الإلكتروني؟',
    answer: 'قیمت طراحی سایت بسته به نیازهای شما متفاوت است. ما پکیج‌های مختلفی از ۵۰ میلیون ریال تا ۳۰۰ میلیون ریال داریم. برای دریافت قیمت دقیق، با ما تماس بگیرید.',
    answerEn: 'Website design cost varies based on your needs. We have different packages from $199 to $1,199 USD. Contact us for exact pricing.',
    answerAr: 'تختلف تكلفة تصميم الموقع حسب احتياجاتك. لدينا حزم مختلفة من 199 إلى 1199 دولار أمريكي. اتصل بنا للحصول على السعر الدقيق.',
    category: 'قیمت',
    views: 320,
    helpful: 60,
    notHelpful: 5,
    status: 'فعال',
    order: 2,
  },
  {
    id: 3,
    question: 'آیا سایت ما واکنش‌گرا (Responsive) خواهد بود؟',
    questionEn: 'Will our website be responsive?',
    questionAr: 'هل سيكون موقعنا متجاوبًا؟',
    answer: 'بله، تمام سایت‌هایی که ما طراحی می‌کنیم به صورت کامل واکنش‌گرا هستند و در تمام دستگاه‌ها (موبایل، تبلت، دسکتاپ) به بهترین شکل نمایش داده می‌شوند.',
    answerEn: 'Yes, all websites we design are fully responsive and display perfectly on all devices (mobile, tablet, desktop).',
    answerAr: 'نعم، جميع المواقع التي نصممها متجاوبة بالكامل وتعرض بشكل مثالي على جميع الأجهزة (الهاتف المحمول، الجهاز اللوحي، سطح المكتب).',
    category: 'فنی',
    views: 180,
    helpful: 35,
    notHelpful: 1,
    status: 'فعال',
    order: 3,
  },
  {
    id: 4,
    question: 'آیا بعد از تحویل پروژه پشتیبانی ارائه می‌دهید؟',
    questionEn: 'Do you provide support after project delivery?',
    questionAr: 'هل تقدمون الدعم بعد تسليم المشروع؟',
    answer: 'بله، ما پشتیبانی کامل بعد از تحویل پروژه ارائه می‌دهیم. مدت زمان پشتیبانی بسته به پکیج انتخابی شما متفاوت است (از 3 تا 12 ماه).',
    answerEn: 'Yes, we provide full support after project delivery. Support duration varies based on your selected package (3 to 12 months).',
    answerAr: 'نعم، نقدم دعماً كاملاً بعد تسليم المشروع. تختلف مدة الدعم حسب الحزمة المختارة (من 3 إلى 12 شهرًا).',
    category: 'عمومی',
    views: 200,
    helpful: 40,
    notHelpful: 3,
    status: 'فعال',
    order: 4,
  },
  {
    id: 5,
    question: 'آیا می‌توانید اپلیکیشن موبایل هم بسازید؟',
    questionEn: 'Can you also build mobile apps?',
    questionAr: 'هل يمكنكم أيضًا بناء تطبيقات الهاتف المحمول؟',
    answer: 'بله، ما تخصص کامل در توسعه اپلیکیشن‌های iOS و Android داریم. از React Native و Flutter استفاده می‌کنیم تا اپلیکیشن‌های با کیفیت و سریع بسازیم.',
    answerEn: 'Yes, we have full expertise in developing iOS and Android apps. We use React Native and Flutter to build high-quality and fast applications.',
    answerAr: 'نعم، لدينا خبرة كاملة في تطوير تطبيقات iOS و Android. نستخدم React Native و Flutter لبناء تطبيقات عالية الجودة وسريعة.',
    category: 'خدمات',
    views: 150,
    helpful: 30,
    notHelpful: 2,
    status: 'فعال',
    order: 5,
  },
];

interface FAQState {
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id' | 'views' | 'helpful' | 'notHelpful'>) => void;
  updateFAQ: (id: number, faq: Partial<FAQ>) => void;
  deleteFAQ: (id: number) => void;
  getFAQ: (id: number) => FAQ | undefined;
  getFAQsByCategory: (category: string) => FAQ[];
  getActiveFAQs: () => FAQ[];
  incrementViews: (id: number) => void;
  markHelpful: (id: number) => void;
  markNotHelpful: (id: number) => void;
}

export const useFAQStore = create<FAQState>()(
  persist(
    (set, get) => ({
      faqs: defaultFAQs,
      addFAQ: (faq) => {
        const newFAQ: FAQ = {
          ...faq,
          id: Date.now(),
          views: 0,
          helpful: 0,
          notHelpful: 0,
        };
        set((state) => ({
          faqs: [...state.faqs, newFAQ],
        }));
        syncStoreToBackend('faq', get().faqs);
      },
      updateFAQ: (id, updatedFAQ) => {
        set((state) => ({
          faqs: state.faqs.map((faq) => (faq.id === id ? { ...faq, ...updatedFAQ } : faq)),
        }));
        syncStoreToBackend('faq', get().faqs);
      },
      deleteFAQ: (id) => {
        set((state) => ({
          faqs: state.faqs.filter((faq) => faq.id !== id),
        }));
        syncStoreToBackend('faq', get().faqs);
      },
      getFAQ: (id) => {
        return get().faqs.find((faq) => faq.id === id);
      },
      getFAQsByCategory: (category) => {
        if (category === 'all') {
          return get().getActiveFAQs();
        }
        return get()
          .getActiveFAQs()
          .filter((faq) => faq.category === category);
      },
      getActiveFAQs: () => {
        return get()
          .faqs.filter((faq) => faq.status === 'فعال')
          .sort((a, b) => a.order - b.order);
      },
      incrementViews: (id) => {
        set((state) => ({
          faqs: state.faqs.map((faq) =>
            faq.id === id ? { ...faq, views: faq.views + 1 } : faq
          ),
        }));
      },
      markHelpful: (id) => {
        set((state) => ({
          faqs: state.faqs.map((faq) =>
            faq.id === id ? { ...faq, helpful: faq.helpful + 1 } : faq
          ),
        }));
      },
      markNotHelpful: (id) => {
        set((state) => ({
          faqs: state.faqs.map((faq) =>
            faq.id === id ? { ...faq, notHelpful: faq.notHelpful + 1 } : faq
          ),
        }));
      },
    }),
    {
      name: 'dattisdev-faq-storage-v2',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: true,
    }
  )
);






