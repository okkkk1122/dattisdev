'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { usePostsStore } from '@/lib/stores/postsStore';
import Button from '@/components/common/Button';
import { pickLocalized, pickLocalizedTags } from '@/lib/i18n/localeHelpers';

const contentTemplates: Record<string, Record<string, string>> = {
  fa: {
    back: 'بازگشت به بلاگ',
    by: 'نویسنده',
    category: 'دسته‌بندی',
    tags: 'برچسب‌ها',
    notFound: 'مقاله یافت نشد',
    views: 'بازدید',
  },
  en: {
    back: 'Back to Blog',
    by: 'Author',
    category: 'Category',
    tags: 'Tags',
    notFound: 'Post not found',
    views: 'Views',
  },
  ar: {
    back: 'العودة إلى المدونة',
    by: 'الكاتب',
    category: 'الفئة',
    tags: 'العلامات',
    notFound: 'المقال غير موجود',
    views: 'المشاهدات',
  },
};

export default function BlogDetailPage({ postId }: { postId: string }) {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = contentTemplates[locale] || contentTemplates.fa;
  const isRtl = locale === 'fa' || locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const post = usePostsStore((s) => s.getPost(Number(postId)));

  if (!post) {
    return (
      <section className="py-32 text-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
        <Link href={`/${locale}/blog`}>
          <Button>{t.back}</Button>
        </Link>
      </section>
    );
  }

  const postRecord = post as unknown as Record<string, unknown>;
  const title = pickLocalized(postRecord, 'title', locale);
  const excerpt = pickLocalized(postRecord, 'excerpt', locale);
  const content = pickLocalized(postRecord, 'content', locale) || excerpt;
  const category = pickLocalized(postRecord, 'category', locale);
  const author = pickLocalized(postRecord, 'author', locale);
  const tags = pickLocalizedTags(postRecord, locale);

  return (
    <article className="page-shell-tight">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <BackIcon size={18} />
          {t.back}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-xl">
            <Image src={post.image} alt={title} fill className="object-cover" priority />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              {t.by}: {author}
            </span>
            <span className="flex items-center gap-1">
              <Tag size={16} />
              {t.category}: {category}
            </span>
            <span>{t.views}: {post.views}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {excerpt}
          </p>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {content}
          </div>

          {tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-500 mb-3">{t.tags}:</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </article>
  );
}
