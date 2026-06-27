'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { seededRange } from '@/lib/utils/seeded';
import Button from '@/components/common/Button';
import { ArrowLeft, Code, Smartphone, Bot, Monitor } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'به داتیس‌دِو خوش آمدید',
    subtitle: 'تخصص ما در طراحی سایت، اپلیکیشن، ربات و نرم‌افزار',
    description: 'ما یک تیم حرفه‌ای از توسعه‌دهندگان و طراحان هستیم که با استفاده از جدیدترین تکنولوژی‌ها، راهکارهای دیجیتال خلاقانه برای کسب‌وکار شما ارائه می‌دهیم.',
    cta: 'شروع پروژه',
    ctaSecondary: 'مشاهده نمونه کارها',
  },
  en: {
    title: 'Welcome to DattisDev',
    subtitle: 'Expert in Web Design, Apps, Bots & Software Development',
    description: 'We are a professional team of developers and designers who provide creative digital solutions for your business using the latest technologies.',
    cta: 'Start Project',
    ctaSecondary: 'View Portfolio',
  },
  ar: {
    title: 'مرحباً بكم في داتيس ديف',
    subtitle: 'متخصصون في تصميم المواقع والتطبيقات والروبوتات وتطوير البرمجيات',
    description: 'نحن فريق محترف من المطورين والمصممين الذين يقدمون حلولاً رقمية إبداعية لأعمالك باستخدام أحدث التقنيات.',
    cta: 'ابدأ المشروع',
    ctaSecondary: 'عرض المعرض',
  },
};

const floatingIcons = [
  { icon: Code, delay: 0, x: 10, y: 20 },
  { icon: Smartphone, delay: 0.2, x: -15, y: 30 },
  { icon: Bot, delay: 0.4, x: 20, y: -20 },
  { icon: Monitor, delay: 0.6, x: -10, y: 25 },
];

export default function HeroSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 dark:from-primary-900 dark:via-primary-800 dark:to-secondary-900"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
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

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute text-white/10"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            <Icon size={80} />
          </motion.div>
        );
      })}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 text-center text-white"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {t.subtitle}
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-12 md:mb-16 text-white leading-[1.2] overflow-visible"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all"
          >
            {t.cta}
            <ArrowLeft className="mr-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
          >
            {t.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
