'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code, Smartphone, Bot, Monitor } from 'lucide-react';
import Image from 'next/image';
import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { getPortfolioCategoryLabel, pickLocalized } from '@/lib/i18n/localeHelpers';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'نمونه کارها',
    subtitle: 'پروژه‌های موفق ما',
    filter: {
      all: 'همه',
      web: 'وب‌سایت',
      app: 'اپلیکیشن',
      bot: 'ربات',
      software: 'نرم‌افزار',
    },
    viewProject: 'مشاهده پروژه',
    technologies: 'تکنولوژی‌ها',
  },
  en: {
    title: 'Portfolio',
    subtitle: 'Our successful projects',
    filter: {
      all: 'All',
      web: 'Website',
      app: 'Application',
      bot: 'Bot',
      software: 'Software',
    },
    viewProject: 'View Project',
    technologies: 'Technologies',
  },
  ar: {
    title: 'معرض الأعمال',
    subtitle: 'مشاريعنا الناجحة',
    filter: {
      all: 'الكل',
      web: 'موقع ويب',
      app: 'تطبيق',
      bot: 'روبوت',
      software: 'برمجيات',
    },
    viewProject: 'عرض المشروع',
    technologies: 'التقنيات',
  },
};

const categoryIcons = {
  web: Monitor,
  app: Smartphone,
  bot: Bot,
  software: Code,
};

export default function PortfolioPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const [activeFilter, setActiveFilter] = useState('all');
  const { getActiveProjects, projects } = usePortfolioStore();
  const activeProjects = getActiveProjects();

  const filteredProjects =
    activeFilter === 'all'
      ? activeProjects
      : activeProjects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['all', 'web', 'app', 'bot', 'software'] as const).map((filter) => {
            const Icon = filter === 'all' ? Code : categoryIcons[filter as keyof typeof categoryIcons] || Code;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 space-x-reverse ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span>{t.filter[filter]}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const Icon = categoryIcons[project.category as keyof typeof categoryIcons] || Code;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={pickLocalized(project as unknown as Record<string, unknown>, 'title', locale)}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-2 space-x-reverse px-3 py-1 bg-white/90 dark:bg-gray-900/90 rounded-full">
                          <Icon size={20} className="text-primary-600" />
                          <span className="text-sm font-semibold">
                            {getPortfolioCategoryLabel(project.category, locale)}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <a
                          href={project.link}
                          className="p-4 bg-white rounded-full shadow-xl"
                        >
                          <ExternalLink size={24} className="text-primary-600" />
                        </a>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {pickLocalized(project as unknown as Record<string, unknown>, 'title', locale)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {pickLocalized(project as unknown as Record<string, unknown>, 'description', locale)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        {t.viewProject}
                        <ExternalLink size={16} className="mr-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

