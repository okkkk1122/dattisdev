'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/common/Button';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'بلاگ',
    subtitle: 'مقالات و آموزش‌های مفید',
    readMore: 'ادامه مطلب',
    categories: 'دسته‌بندی‌ها',
    tags: 'تگ‌ها',
    search: 'جستجو...',
  },
  en: {
    title: 'Blog',
    subtitle: 'Useful articles and tutorials',
    readMore: 'Read More',
    categories: 'Categories',
    tags: 'Tags',
    search: 'Search...',
  },
  ar: {
    title: 'المدونة',
    subtitle: 'مقالات ودروس مفيدة',
    readMore: 'اقرأ المزيد',
    categories: 'الفئات',
    tags: 'العلامات',
    search: 'بحث...',
  },
};

import { usePostsStore } from '@/lib/stores/postsStore';
import { blogCategoryList, pickLocalized, pickLocalizedTags } from '@/lib/i18n/localeHelpers';
import { blogCategoryImages } from '@/lib/data/sectionImages';

export default function BlogPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const store = usePostsStore();
  const { getPublishedPosts } = store;
  const posts = getPublishedPosts();
  const categories = blogCategoryList[locale as 'fa' | 'en' | 'ar'] || blogCategoryList.fa;

  return (
    <section ref={ref} className="page-shell">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => {
                const postTitle = pickLocalized(post as unknown as Record<string, unknown>, 'title', locale);
                const postAuthor = pickLocalized(post as unknown as Record<string, unknown>, 'author', locale);
                return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/${locale}/blog/${post.id}`}>
                    <div className="blog-card hover:shadow-brand transition-all h-full">
                      <div className="h-48 relative overflow-hidden">
                        <Image
                          src={post.image}
                          alt={postTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-sm font-semibold">
                            {pickLocalized(post as unknown as Record<string, unknown>, 'category', locale)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {postTitle}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                          {pickLocalized(post as unknown as Record<string, unknown>, 'excerpt', locale)}
                        </p>
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <User size={16} />
                            <span>{postAuthor}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pickLocalizedTags(post as unknown as Record<string, unknown>, locale).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="text-primary-600 dark:text-primary-400 font-semibold flex items-center">
                          {t.readMore}
                          <ArrowLeft size={16} className="mr-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="page-card p-6 shadow-lg sticky top-20">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {t.categories}
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full text-right px-4 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-3"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={blogCategoryImages[index] || blogCategoryImages[0]}
                        alt={category}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

