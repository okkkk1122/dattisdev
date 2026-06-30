'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { seededRange } from '@/lib/utils/seeded';
import Button from '@/components/common/Button';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'آماده شروع پروژه خود هستید؟',
    subtitle: 'با ما تماس بگیرید و از مشاوره رایگان بهره‌مند شوید',
    cta: 'شروع پروژه',
    contact: 'تماس با ما',
    description: 'ما اینجا هستیم تا به شما کمک کنیم بهترین راهکار را برای کسب‌وکار خود پیدا کنید.',
  },
  en: {
    title: 'Ready to Start Your Project?',
    subtitle: 'Contact us and get free consultation',
    cta: 'Start Project',
    contact: 'Contact Us',
    description: 'We are here to help you find the best solution for your business.',
  },
  ar: {
    title: 'هل أنت مستعد لبدء مشروعك؟',
    subtitle: 'اتصل بنا واحصل على استشارة مجانية',
    cta: 'ابدأ المشروع',
    contact: 'اتصل بنا',
    description: 'نحن هنا لمساعدتك في العثور على أفضل حل لأعمالك.',
  },
};

export default function CTASection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-brand-gradient relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${seededRange(i * 3 + 1, 0, 100)}%`,
              top: `${seededRange(i * 3 + 2, 0, 100)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: seededRange(i * 5 + 3, 3, 5),
              repeat: Infinity,
              delay: seededRange(i * 5 + 4, 0, 2),
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center text-white max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-white/90">
            {t.subtitle}
          </p>
          <p className="text-lg mb-8 text-white/80">
            {t.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-slate-50 shadow-brand-lg transition-all"
              >
                {t.cta}
                <ArrowLeft className="mr-2" size={20} />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/45 text-white hover:bg-white/12 hover:border-white/55 backdrop-blur-sm"
              >
                {t.contact}
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/90">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Mail size={20} />
              <span>info@dattisdev.com</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Phone size={20} />
              <span>+98 21 1234 5678</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



