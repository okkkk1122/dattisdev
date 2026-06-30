'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useFAQStore } from '@/lib/stores/faqStore';
import ThemedCard from '@/components/common/ThemedCard';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'سوالات متداول',
    subtitle: 'پاسخ به سوالات رایج شما',
    searchPlaceholder: 'جستجو سوالات...',
    allCategories: 'همه دسته‌ها',
    services: 'خدمات',
    pricing: 'قیمت',
    technical: 'فنی',
    general: 'عمومی',
    helpful: 'مفید بود',
    notHelpful: 'مفید نبود',
    views: 'بازدید',
    noResults: 'سوالی یافت نشد',
  },
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to your common questions',
    searchPlaceholder: 'Search questions...',
    allCategories: 'All Categories',
    services: 'Services',
    pricing: 'Pricing',
    technical: 'Technical',
    general: 'General',
    helpful: 'Helpful',
    notHelpful: 'Not Helpful',
    views: 'Views',
    noResults: 'No questions found',
  },
  ar: {
    title: 'الأسئلة الشائعة',
    subtitle: 'إجابات على أسئلتك الشائعة',
    searchPlaceholder: 'البحث في الأسئلة...',
    allCategories: 'جميع الفئات',
    services: 'الخدمات',
    pricing: 'التسعير',
    technical: 'تقني',
    general: 'عام',
    helpful: 'مفيد',
    notHelpful: 'غير مفيد',
    views: 'المشاهدات',
    noResults: 'لم يتم العثور على أسئلة',
  },
};

export default function FAQPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { getFAQsByCategory, getActiveFAQs, incrementViews, markHelpful, markNotHelpful } = useFAQStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const getQuestion = (faq: { question: string; questionEn?: string; questionAr?: string }) => {
    if (locale === 'fa') return faq.question;
    if (locale === 'en') return faq.questionEn || faq.question;
    return faq.questionAr || faq.question;
  };

  const getAnswer = (faq: { answer: string; answerEn?: string; answerAr?: string }) => {
    if (locale === 'fa') return faq.answer;
    if (locale === 'en') return faq.answerEn || faq.answer;
    return faq.answerAr || faq.answer;
  };

  const allFAQs = getActiveFAQs();
  const filteredFAQs = allFAQs
    .filter((faq) => {
      const categoryMatch = activeCategory === 'all' || faq.category === activeCategory;
      const searchMatch =
        searchTerm === '' ||
        getQuestion(faq).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getAnswer(faq).toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => a.order - b.order);

  const handleToggleFAQ = (id: number) => {
    if (openFAQ === id) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(id);
      incrementViews(id);
    }
  };

  const getCategoryLabel = (category: string) => {
    if (locale === 'fa') return category;
    if (locale === 'en') {
      if (category === 'خدمات') return 'Services';
      if (category === 'قیمت') return 'Pricing';
      if (category === 'فنی') return 'Technical';
      return 'General';
    }
    if (category === 'خدمات') return 'الخدمات';
    if (category === 'قیمت') return 'التسعير';
    if (category === 'فنی') return 'تقني';
    return 'عام';
  };

  const categories = ['all', 'خدمات', 'قیمت', 'فنی', 'عمومی'];

  return (
    <section ref={ref} className="page-shell">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="page-input text-lg pr-12 pl-4 py-4"
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? 'filter-pill filter-pill-active'
                  : 'filter-pill filter-pill-inactive'
              }`}
            >
              {category === 'all' ? t.allCategories : getCategoryLabel(category)}
            </button>
          ))}
        </motion.div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <ThemedCard background="faq" className="overflow-hidden">
              <button
                onClick={() => handleToggleFAQ(faq.id)}
                className="w-full p-6 flex items-center justify-between text-right hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {getQuestion(faq)}
                  </h3>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-slate-500 dark:text-slate-400">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                      {getCategoryLabel(faq.category)}
                    </span>
                    <span className="flex items-center space-x-1 space-x-reverse">
                      <span>{t.views}:</span>
                      <span>{faq.views}</span>
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`text-slate-500 dark:text-slate-400 transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              <AnimatePresence>
                {openFAQ === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-slate-200 dark:border-slate-700">
                      <p className="text-slate-700 dark:text-slate-300 mt-4 leading-relaxed">
                        {getAnswer(faq)}
                      </p>
                      <div className="flex items-center space-x-4 space-x-reverse mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markHelpful(faq.id);
                          }}
                          className="flex items-center space-x-2 space-x-reverse text-green-600 hover:text-green-800 dark:text-green-400"
                        >
                          <ThumbsUp size={18} />
                          <span className="text-sm">{t.helpful} ({faq.helpful})</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markNotHelpful(faq.id);
                          }}
                          className="flex items-center space-x-2 space-x-reverse text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          <ThumbsDown size={18} />
                          <span className="text-sm">{t.notHelpful} ({faq.notHelpful})</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </ThemedCard>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p>{t.noResults}</p>
          </div>
        )}
      </div>
    </section>
  );
}






