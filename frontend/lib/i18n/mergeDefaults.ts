import { mockPosts, mockProjects } from '@/lib/data/mockData';
import { defaultTestimonials } from '@/lib/stores/testimonialsStore';
import { defaultPricingPlans } from '@/lib/stores/pricingStore';
import { defaultFAQs } from '@/lib/stores/faqStore';
import type { Post } from '@/lib/stores/postsStore';
import type { Project } from '@/lib/stores/portfolioStore';
import type { Testimonial } from '@/lib/stores/testimonialsStore';
import type { PricingPlan, PricingFeature } from '@/lib/stores/pricingStore';
import type { FAQ } from '@/lib/stores/faqStore';
import { usePostsStore } from '@/lib/stores/postsStore';
import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { useTestimonialsStore } from '@/lib/stores/testimonialsStore';
import { usePricingStore } from '@/lib/stores/pricingStore';
import { useFAQStore } from '@/lib/stores/faqStore';

const I18N_STRING_FIELDS = [
  'title',
  'excerpt',
  'description',
  'content',
  'category',
  'text',
  'role',
  'project',
  'service',
  'company',
  'author',
  'name',
  'question',
  'answer',
] as const;

function fillI18nFields<T extends Record<string, unknown>>(
  item: T,
  defaults: T | undefined
): T {
  if (!defaults) return item;
  const merged: Record<string, unknown> = { ...defaults, ...item };
  for (const field of I18N_STRING_FIELDS) {
    const enKey = `${field}En`;
    const arKey = `${field}Ar`;
    if (defaults[enKey] && !merged[enKey]) merged[enKey] = defaults[enKey];
    if (defaults[arKey] && !merged[arKey]) merged[arKey] = defaults[arKey];
    if (defaults[field] && !merged[field]) merged[field] = defaults[field];
  }
  if (Array.isArray(defaults.tags) && (!merged.tags || !(merged.tags as unknown[]).length)) {
    merged.tags = defaults.tags;
  }
  if (defaults.tagsEn && !merged.tagsEn) merged.tagsEn = defaults.tagsEn;
  if (defaults.tagsAr && !merged.tagsAr) merged.tagsAr = defaults.tagsAr;
  if (defaults.image && !merged.image) merged.image = defaults.image;
  return merged as T;
}

function mergeFeatures(
  features: PricingFeature[],
  defaults: PricingFeature[]
): PricingFeature[] {
  return features.map((f, i) => {
    const def = defaults.find((d) => d.id === f.id) ?? defaults[i];
    return fillI18nFields(
      f as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as PricingFeature;
  });
}

export function mergePosts(items: Post[]): Post[] {
  return items.map((item) => {
    const def = mockPosts.find((p) => p.id === item.id) as Post | undefined;
    return fillI18nFields(
      item as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as Post;
  });
}

export function mergeProjects(items: Project[]): Project[] {
  return items.map((item) => {
    const def = mockProjects.find((p) => p.id === item.id) as Project | undefined;
    return fillI18nFields(
      item as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as Project;
  });
}

export function mergeTestimonials(items: Testimonial[]): Testimonial[] {
  return items.map((item) => {
    const def = defaultTestimonials.find((t) => t.id === item.id);
    return fillI18nFields(
      item as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as Testimonial;
  });
}

export function mergePricingPlans(items: PricingPlan[]): PricingPlan[] {
  return items.map((item) => {
    const def = defaultPricingPlans.find((p) => p.id === item.id);
    const merged = fillI18nFields(
      item as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as PricingPlan;
    if (def?.features?.length) {
      merged.features = mergeFeatures(item.features ?? [], def.features);
    }
    if (!merged.priceRial && merged.price) {
      const wasToman = !merged.currency || merged.currency.includes('تومان');
      merged.priceRial = wasToman ? merged.price * 10 : merged.price;
    }
    if (!merged.priceRial && def?.priceRial) merged.priceRial = def.priceRial;
    if (!merged.priceUsd && def?.priceUsd) merged.priceUsd = def.priceUsd;
    return merged;
  });
}

export function mergeFaqs(items: FAQ[]): FAQ[] {
  return items.map((item) => {
    const def = defaultFAQs.find((f) => f.id === item.id);
    return fillI18nFields(
      item as unknown as Record<string, unknown>,
      def as unknown as Record<string, unknown>
    ) as unknown as FAQ;
  });
}

export function applyContentDefaults() {
  usePostsStore.setState({ posts: mergePosts(usePostsStore.getState().posts) });
  usePortfolioStore.setState({ projects: mergeProjects(usePortfolioStore.getState().projects) });
  useTestimonialsStore.setState({
    testimonials: mergeTestimonials(useTestimonialsStore.getState().testimonials),
  });
  usePricingStore.setState({ plans: mergePricingPlans(usePricingStore.getState().plans) });
  useFAQStore.setState({ faqs: mergeFaqs(useFAQStore.getState().faqs) });
}
