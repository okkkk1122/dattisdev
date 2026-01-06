'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'نظرات مشتریان',
    subtitle: 'آنچه مشتریان ما می‌گویند',
  },
  en: {
    title: 'Client Testimonials',
    subtitle: 'What our clients say',
  },
  ar: {
    title: 'شهادات العملاء',
    subtitle: 'ماذا يقول عملاؤنا',
  },
};

const testimonials = [
  {
    id: 1,
    name: 'علی احمدی',
    role: 'مدیر عامل شرکت ABC',
    image: '/images/testimonial1.jpg',
    rating: 5,
    text: 'داتیس‌دِو یک تیم حرفه‌ای و متعهد است. پروژه ما را در زمان مقرر و با کیفیت عالی تحویل دادند.',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CEO, Tech Corp',
    image: '/images/testimonial2.jpg',
    rating: 5,
    text: 'DattisDev delivered an outstanding mobile app. Their attention to detail and professionalism is remarkable.',
  },
  {
    id: 3,
    name: 'محمد الخالدی',
    role: 'مدير شركة XYZ',
    image: '/images/testimonial3.jpg',
    rating: 5,
    text: 'فريق محترف ومبدع. قدم لنا حلولاً رقمية ممتازة ساعدت في نمو أعمالنا بشكل كبير.',
  },
  {
    id: 4,
    name: 'رضا محمدی',
    role: 'بنیان‌گذار استارتاپ',
    image: '/images/testimonial4.jpg',
    rating: 5,
    text: 'از طراحی سایت تا توسعه اپلیکیشن، همه چیز را به بهترین شکل انجام دادند. بسیار راضی هستم.',
  },
];

export default function TestimonialsSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
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

        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-80 overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                  x: index === currentIndex ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 p-8 md:p-12 ${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
              >
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <Quote className="text-primary-500 mb-4" size={48} />
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={24}
                      />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          <div className="flex justify-center mt-6 space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



