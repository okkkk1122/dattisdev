import { mockPosts, mockProjects } from '@/lib/data/mockData';
import { defaultTestimonials } from '@/lib/stores/testimonialsStore';
import { defaultPricingPlans } from '@/lib/stores/pricingStore';
import { defaultFAQs } from '@/lib/stores/faqStore';

export type DefaultsRecord = Record<string, unknown> & { id?: number | string };

const defaultsById = new Map<string, DefaultsRecord>();

function register(items: DefaultsRecord[]) {
  for (const item of items) {
    if (item.id != null) defaultsById.set(String(item.id), item);
  }
}

register(mockPosts as unknown as DefaultsRecord[]);
register(mockProjects as unknown as DefaultsRecord[]);
register(defaultTestimonials as unknown as DefaultsRecord[]);
register(defaultPricingPlans as unknown as DefaultsRecord[]);
register(defaultFAQs as unknown as DefaultsRecord[]);

export function getDefaultById(id: number | string): DefaultsRecord | undefined {
  return defaultsById.get(String(id));
}

export function getLocalizedFromDefaults(
  id: number | string | undefined,
  field: string,
  locale: string
): string | undefined {
  if (id == null) return undefined;
  const def = getDefaultById(id);
  if (!def) return undefined;
  if (locale === 'en') {
    const v = def[`${field}En`];
    if (typeof v === 'string' && v) return v;
  }
  if (locale === 'ar') {
    const v = def[`${field}Ar`];
    if (typeof v === 'string' && v) return v;
  }
  const v = def[field];
  return typeof v === 'string' ? v : undefined;
}
