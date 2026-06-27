'use client';

import { useEffect } from 'react';
import { contentApi } from '@/lib/api/content';
import { usePostsStore } from '@/lib/stores/postsStore';
import { usePortfolioStore } from '@/lib/stores/portfolioStore';
import { useTestimonialsStore } from '@/lib/stores/testimonialsStore';
import { usePricingStore } from '@/lib/stores/pricingStore';
import { useFAQStore } from '@/lib/stores/faqStore';
import {
  mergePosts,
  mergeProjects,
  mergeTestimonials,
  mergePricingPlans,
  mergeFaqs,
  applyContentDefaults,
} from '@/lib/i18n/mergeDefaults';

export function useContentSync() {
  const setPosts = usePostsStore.setState;
  const setPortfolio = usePortfolioStore.setState;
  const setTestimonials = useTestimonialsStore.setState;
  const setPricing = usePricingStore.setState;
  const setFaq = useFAQStore.setState;

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      try {
        const { data } = await contentApi.getAll();
        if (cancelled) return;

        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setPosts({ posts: mergePosts(data.posts) });
        } else {
          const posts = mergePosts(usePostsStore.getState().posts);
          setPosts({ posts });
          if (posts.length > 0) await contentApi.setPosts(posts);
        }

        if (Array.isArray(data.portfolio) && data.portfolio.length > 0) {
          setPortfolio({ projects: mergeProjects(data.portfolio) });
        } else {
          const projects = mergeProjects(usePortfolioStore.getState().projects);
          setPortfolio({ projects });
          if (projects.length > 0) await contentApi.setPortfolio(projects);
        }

        if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          setTestimonials({ testimonials: mergeTestimonials(data.testimonials) });
        } else {
          const testimonials = mergeTestimonials(useTestimonialsStore.getState().testimonials);
          setTestimonials({ testimonials });
          if (testimonials.length > 0) await contentApi.setTestimonials(testimonials);
        }

        if (Array.isArray(data.pricing) && data.pricing.length > 0) {
          setPricing({ plans: mergePricingPlans(data.pricing) });
        } else {
          const plans = mergePricingPlans(usePricingStore.getState().plans);
          setPricing({ plans });
          if (plans.length > 0) await contentApi.setPricing(plans);
        }

        if (Array.isArray(data.faq) && data.faq.length > 0) {
          setFaq({ faqs: mergeFaqs(data.faq) });
        } else {
          const faqs = mergeFaqs(useFAQStore.getState().faqs);
          setFaq({ faqs });
          if (faqs.length > 0) await contentApi.setFaq(faqs);
        }

        applyContentDefaults();
      } catch {
        // Backend offline — use local Zustand data
      }
    }

    sync();
    return () => {
      cancelled = true;
    };
  }, [setPosts, setPortfolio, setTestimonials, setPricing, setFaq]);
}

export async function syncStoreToBackend(
  key: 'posts' | 'portfolio' | 'testimonials' | 'pricing' | 'faq',
  data: unknown[]
) {
  try {
    switch (key) {
      case 'posts':
        await contentApi.setPosts(mergePosts(data as Parameters<typeof mergePosts>[0]));
        break;
      case 'portfolio':
        await contentApi.setPortfolio(mergeProjects(data as Parameters<typeof mergeProjects>[0]));
        break;
      case 'testimonials':
        await contentApi.setTestimonials(
          mergeTestimonials(data as Parameters<typeof mergeTestimonials>[0])
        );
        break;
      case 'pricing':
        await contentApi.setPricing(mergePricingPlans(data as Parameters<typeof mergePricingPlans>[0]));
        break;
      case 'faq':
        await contentApi.setFaq(mergeFaqs(data as Parameters<typeof mergeFaqs>[0]));
        break;
    }
  } catch {
    // silent fail when backend offline
  }
}
