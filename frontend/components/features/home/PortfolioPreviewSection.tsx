'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/common/Button';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'نمونه کارهای ما',
    subtitle: 'پروژه‌های موفق و خلاقانه ما',
    viewProject: 'مشاهده پروژه',
    viewAll: 'مشاهده همه نمونه کارها',
  },
  en: {
    title: 'Our Portfolio',
    subtitle: 'Our successful and creative projects',
    viewProject: 'View Project',
    viewAll: 'View All Portfolio',
  },
  ar: {
    title: 'معرض أعمالنا',
    subtitle: 'مشاريعنا الناجحة والإبداعية',
    viewProject: 'عرض المشروع',
    viewAll: 'عرض جميع الأعمال',
  },
};

import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { getPortfolioCategoryLabel, pickLocalized } from '@/lib/i18n/localeHelpers';

export default function PortfolioPreviewSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getActiveProjects, projects: allProjects } = usePortfolioStore();
  const activeProjects = getActiveProjects();
  const projects = activeProjects.slice(0, 4).map((project) => ({
    id: project.id,
    title: pickLocalized(project as unknown as Record<string, unknown>, 'title', locale),
    category: getPortfolioCategoryLabel(project.category, locale),
    image: project.image,
    description: pickLocalized(project as unknown as Record<string, unknown>, 'description', locale),
  }));

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl aspect-square shadow-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/40 to-transparent group-hover:from-primary-900/90 transition-all" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-right w-full">
                    <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-sm font-semibold mb-2 text-gray-900">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  <Button size="sm" className="w-full">
                    {t.viewProject}
                    <ExternalLink size={16} className="mr-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link href={`/${locale}/portfolio`}>
            <Button size="lg">
              {t.viewAll}
              <ArrowLeft className="mr-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

