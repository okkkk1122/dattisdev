'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ThemedCard from '@/components/common/ThemedCard';
import { useTestimonialsStore } from '@/lib/stores/testimonialsStore';
import { pickLocalized } from '@/lib/i18n/localeHelpers';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'نظرات مشتریان',
    subtitle: 'آنچه مشتریان ما می‌گویند',
    empty: 'هنوز نظری ثبت نشده است',
  },
  en: {
    title: 'Client Testimonials',
    subtitle: 'What our clients say',
    empty: 'No testimonials yet',
  },
  ar: {
    title: 'شهادات العملاء',
    subtitle: 'ماذا يقول عملاؤنا',
    empty: 'لا توجد شهادات بعد',
  },
};

export default function TestimonialsSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getApprovedTestimonials } = useTestimonialsStore();
  const testimonials = getApprovedTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-20 section-surface-tint">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>{t.empty}</p>
            </div>
          ) : (
            <ThemedCard background="testimonial" className="h-80 shadow-2xl" overlay="light">
            <div className="relative h-80 overflow-hidden">
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
                        className="text-accent-400 fill-accent-400"
                        size={24}
                      />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-6 max-w-2xl">
                    "{pickLocalized(testimonial as unknown as Record<string, unknown>, 'text', locale)}"
                  </p>
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white text-xl font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {pickLocalized(testimonial as unknown as Record<string, unknown>, 'role', locale)}
                        {testimonial.company &&
                          ` - ${pickLocalized(testimonial as unknown as Record<string, unknown>, 'company', locale)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
            </ThemedCard>
          )}

          {testimonials.length > 0 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}



