import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { syncStoreToBackend } from '@/lib/hooks/useContentSync';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  roleEn: string;
  roleAr: string;
  company?: string;
  companyEn?: string;
  companyAr?: string;
  image?: string;
  rating: number;
  text: string;
  textEn: string;
  textAr: string;
  project?: string;
  projectEn?: string;
  projectAr?: string;
  service?: string;
  serviceEn?: string;
  serviceAr?: string;
  status: 'تأیید شده' | 'در انتظار' | 'رد شده';
  date: string;
  views: number;
}

export const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'علی احمدی',
    role: 'مدیر عامل',
    roleEn: 'CEO',
    roleAr: 'المدير التنفيذي',
    company: 'شرکت ABC',
    companyEn: 'ABC Company',
    companyAr: 'شركة ABC',
    image: '/images/testimonial1.jpg',
    rating: 5,
    text: 'داتیس‌دِو یک تیم حرفه‌ای و متعهد است. پروژه ما را در زمان مقرر و با کیفیت عالی تحویل دادند.',
    textEn: 'DattisDev is a professional and committed team. They delivered our project on time with excellent quality.',
    textAr: 'داتيس ديف فريق محترف وملتزم. سلّموا مشروعنا في الوقت المحدد بجودة ممتازة.',
    project: 'طراحی سایت',
    projectEn: 'Website Design',
    projectAr: 'تصميم موقع',
    service: 'طراحی سایت',
    serviceEn: 'Web Design',
    serviceAr: 'تصميم المواقع',
    status: 'تأیید شده',
    date: '2024-01-15',
    views: 150,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'مدیر عامل',
    roleEn: 'CEO',
    roleAr: 'المدير التنفيذي',
    company: 'Tech Corp',
    companyEn: 'Tech Corp',
    companyAr: 'تك كورب',
    image: '/images/testimonial2.jpg',
    rating: 5,
    text: 'داتیس‌دِو یک اپلیکیشن موبایل فوق‌العاده تحویل داد. توجه به جزئیات و حرفه‌ای‌گری آن‌ها قابل تحسین است.',
    textEn: 'DattisDev delivered an outstanding mobile app. Their attention to detail and professionalism is remarkable.',
    textAr: 'قدّم داتيس ديف تطبيقًا جوالًا متميزًا. اهتمامهم بالتفاصيل واحترافيتهم لافت للنظر.',
    project: 'اپلیکیشن موبایل',
    projectEn: 'Mobile App',
    projectAr: 'تطبيق جوال',
    service: 'توسعه اپلیکیشن',
    serviceEn: 'App Development',
    serviceAr: 'تطوير التطبيقات',
    status: 'تأیید شده',
    date: '2024-01-10',
    views: 120,
  },
  {
    id: 3,
    name: 'محمد الخالدی',
    role: 'مدیر',
    roleEn: 'Manager',
    roleAr: 'مدير',
    company: 'شركة XYZ',
    companyEn: 'XYZ Company',
    companyAr: 'شركة XYZ',
    image: '/images/testimonial3.jpg',
    rating: 5,
    text: 'تیمی حرفه‌ای و خلاق که راه‌حل‌های دیجیتال عالی ارائه داد و به رشد چشمگیر کسب‌وکار ما کمک کرد.',
    textEn: 'A professional and creative team that delivered excellent digital solutions and helped our business grow significantly.',
    textAr: 'فريق محترف ومبدع قدم لنا حلولاً رقمية ممتازة ساعدت في نمو أعمالنا بشكل كبير.',
    project: 'ربات تلگرام',
    projectEn: 'Telegram Bot',
    projectAr: 'روبوت تلغرام',
    service: 'توسعه ربات',
    serviceEn: 'Bot Development',
    serviceAr: 'تطوير الروبوتات',
    status: 'تأیید شده',
    date: '2024-01-05',
    views: 95,
  },
  {
    id: 4,
    name: 'رضا محمدی',
    role: 'بنیان‌گذار',
    roleEn: 'Founder',
    roleAr: 'المؤسس',
    company: 'استارتاپ',
    companyEn: 'Startup',
    companyAr: 'شركة ناشئة',
    image: '/images/testimonial4.jpg',
    rating: 5,
    text: 'از طراحی سایت تا توسعه اپلیکیشن، همه چیز را به بهترین شکل انجام دادند. بسیار راضی هستم.',
    textEn: 'From website design to app development, they did everything perfectly. I am very satisfied.',
    textAr: 'من تصميم الموقع إلى تطوير التطبيق، أنجزوا كل شيء بأفضل شكل. أنا راضٍ جدًا.',
    project: 'نرم‌افزار',
    projectEn: 'Software',
    projectAr: 'برمجيات',
    service: 'توسعه نرم‌افزار',
    serviceEn: 'Software Development',
    serviceAr: 'تطوير البرمجيات',
    status: 'تأیید شده',
    date: '2024-01-01',
    views: 80,
  },
];

interface TestimonialsState {
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date' | 'views'>) => void;
  updateTestimonial: (id: number, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: number) => void;
  getTestimonial: (id: number) => Testimonial | undefined;
  getApprovedTestimonials: () => Testimonial[];
  getTestimonialsByService: (service: string) => Testimonial[];
}

export const useTestimonialsStore = create<TestimonialsState>()(
  persist(
    (set, get) => ({
      testimonials: defaultTestimonials,
      addTestimonial: (testimonial) => {
        const newTestimonial: Testimonial = {
          ...testimonial,
          id: Date.now(),
          date: new Date().toISOString().split('T')[0],
          views: 0,
          status: testimonial.status || 'در انتظار',
        };
        set((state) => ({
          testimonials: [newTestimonial, ...state.testimonials],
        }));
        syncStoreToBackend('testimonials', get().testimonials);
      },
      updateTestimonial: (id, updatedTestimonial) => {
        set((state) => ({
          testimonials: state.testimonials.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
          ),
        }));
        syncStoreToBackend('testimonials', get().testimonials);
      },
      deleteTestimonial: (id) => {
        set((state) => ({
          testimonials: state.testimonials.filter((testimonial) => testimonial.id !== id),
        }));
        syncStoreToBackend('testimonials', get().testimonials);
      },
      getTestimonial: (id) => {
        return get().testimonials.find((testimonial) => testimonial.id === id);
      },
      getApprovedTestimonials: () => {
        return get().testimonials.filter((testimonial) => testimonial.status === 'تأیید شده');
      },
      getTestimonialsByService: (service) => {
        return get()
          .testimonials.filter((testimonial) => testimonial.status === 'تأیید شده')
          .filter((testimonial) => testimonial.service === service);
      },
    }),
    {
      name: 'dattisdev-testimonials-storage-v3',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: true,
    }
  )
);
