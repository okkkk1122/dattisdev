'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/common/Button';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'آخرین مقالات',
    subtitle: 'مقالات و آموزش‌های مفید',
    readMore: 'ادامه مطلب',
    viewAll: 'مشاهده همه مقالات',
  },
  en: {
    title: 'Latest Articles',
    subtitle: 'Useful articles and tutorials',
    readMore: 'Read More',
    viewAll: 'View All Articles',
  },
  ar: {
    title: 'آخر المقالات',
    subtitle: 'مقالات ودروس مفيدة',
    readMore: 'اقرأ المزيد',
    viewAll: 'عرض جميع المقالات',
  },
};

import { usePostsStore } from '@/lib/stores/postsStore';
import { pickLocalized, pickLocalizedTags } from '@/lib/i18n/localeHelpers';

export default function BlogPreviewSection() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const store = usePostsStore();
  const { getPublishedPosts } = store;
  const publishedPosts = getPublishedPosts();
  const posts = publishedPosts.slice(0, 3);

  return (
    <section ref={ref} className="py-20 section-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-sm font-semibold">
                        {pickLocalized(post as unknown as Record<string, unknown>, 'category', locale)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {postTitle}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {pickLocalized(post as unknown as Record<string, unknown>, 'excerpt', locale)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <User size={16} />
                        <span>{postAuthor}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar size={16} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link href={`/${locale}/blog`}>
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

