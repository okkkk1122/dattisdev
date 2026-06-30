'use client';

import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { seededRange } from '@/lib/utils/seeded';
import Button from '@/components/common/Button';
import HeroTitle from '@/components/features/home/HeroTitle';
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-gradient pt-20 md:pt-24"
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
        <motion.div variants={itemVariants} className="mb-8 md:mb-10">
          <motion.span
            className="hero-badge"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 120, damping: 14 }}
          >
            <span className="hero-badge-dot" aria-hidden />
            {t.subtitle}
          </motion.span>
        </motion.div>

        <HeroTitle text={t.title} locale={locale} />

        <motion.p
          variants={itemVariants}
          className="font-sans text-lg md:text-xl lg:text-2xl mb-10 md:mb-12 text-white/85 max-w-2xl mx-auto leading-[1.75] font-medium"
        >
          {t.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5"
        >
          <Button
            size="lg"
            className="hero-cta-primary group bg-white text-primary-700 hover:bg-slate-50 shadow-brand-lg font-semibold"
          >
            {t.cta}
            <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hero-cta-secondary border-2 border-white/45 text-white hover:bg-white/12 hover:border-white/55 backdrop-blur-sm font-medium"
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
