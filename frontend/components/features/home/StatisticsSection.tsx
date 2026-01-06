'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code, Users, Award, Zap } from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  fa: {
    projects: 'پروژه‌های موفق',
    clients: 'مشتریان راضی',
    experience: 'سال تجربه',
    team: 'اعضای تیم',
  },
  en: {
    projects: 'Successful Projects',
    clients: 'Satisfied Clients',
    experience: 'Years Experience',
    team: 'Team Members',
  },
  ar: {
    projects: 'مشاريع ناجحة',
    clients: 'عملاء راضون',
    experience: 'سنوات خبرة',
    team: 'أعضاء الفريق',
  },
};

interface StatItem {
  icon: typeof Code;
  value: number;
  label: string;
  suffix?: string;
}

export default function StatisticsSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats: StatItem[] = [
    { icon: Code, value: 150, label: t.projects, suffix: '+' },
    { icon: Users, value: 80, label: t.clients, suffix: '+' },
    { icon: Award, value: 5, label: t.experience, suffix: '+' },
    { icon: Zap, value: 12, label: t.team, suffix: '+' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StatCard
                key={index}
                icon={Icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                isInView={isInView}
                delay={index * 0.1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  suffix,
  isInView,
  delay,
}: StatItem & { isInView: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [mounted, isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-primary-600 dark:text-primary-400" size={32} />
      </motion.div>
      <motion.div
        className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: delay + 0.2, type: 'spring' }}
      >
        {mounted ? count : 0}
        {suffix}
      </motion.div>
      <p className="text-gray-600 dark:text-gray-400">{label}</p>
    </motion.div>
  );
}



