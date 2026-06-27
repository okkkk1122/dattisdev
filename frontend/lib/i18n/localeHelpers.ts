import { getDefaultById, getLocalizedFromDefaults } from './contentRegistry';

export type SiteLocale = 'fa' | 'en' | 'ar';

export function resolveLocale(locale: string): SiteLocale {
  if (locale === 'en' || locale === 'ar') return locale;
  return 'fa';
}

export function pickLocalized(
  item: Record<string, unknown>,
  field: string,
  locale: string
): string {
  const loc = resolveLocale(locale);
  const enKey = `${field}En`;
  const arKey = `${field}Ar`;

  if (loc === 'en') {
    const v = item[enKey];
    if (typeof v === 'string' && v) return v;
    const fromDefault = getLocalizedFromDefaults(item.id as number | string, field, 'en');
    if (fromDefault) return fromDefault;
  }
  if (loc === 'ar') {
    const v = item[arKey];
    if (typeof v === 'string' && v) return v;
    const fromDefault = getLocalizedFromDefaults(item.id as number | string, field, 'ar');
    if (fromDefault) return fromDefault;
  }
  const v = item[field];
  return typeof v === 'string' ? v : '';
}

const portfolioCategoryLabels: Record<SiteLocale, Record<string, string>> = {
  fa: { web: 'وب‌سایت', app: 'اپلیکیشن', bot: 'ربات', software: 'نرم‌افزار' },
  en: { web: 'Website', app: 'Mobile App', bot: 'Bot', software: 'Software' },
  ar: { web: 'موقع ويب', app: 'تطبيق جوال', bot: 'روبوت', software: 'برمجيات' },
};

export function getPortfolioCategoryLabel(category: string, locale: string): string {
  const loc = resolveLocale(locale);
  return portfolioCategoryLabels[loc][category] || category;
}

export const blogCategoryList: Record<SiteLocale, string[]> = {
  fa: ['همه', 'طراحی', 'توسعه', 'ربات', 'بهینه‌سازی', 'امنیت'],
  en: ['All', 'Design', 'Development', 'Bot', 'Optimization', 'Security'],
  ar: ['الكل', 'التصميم', 'التطوير', 'الروبوت', 'التحسين', 'الأمان'],
};

export function formatPrice(price: number, locale: string): string {
  const loc = resolveLocale(locale);
  const intlLocale = loc === 'en' ? 'en-US' : loc === 'ar' ? 'ar-SA' : 'fa-IR';
  return new Intl.NumberFormat(intlLocale).format(price);
}

export function getCurrencyLabel(locale: string): string {
  if (resolveLocale(locale) === 'fa') return 'ریال';
  return 'USD';
}

export type PriceFields = {
  priceRial?: number;
  priceUsd?: number;
  price?: number;
  currency?: string;
};

export function getPlanPriceValue(plan: PriceFields, locale: string): number {
  const loc = resolveLocale(locale);
  if (loc === 'fa') {
    if (plan.priceRial != null && plan.priceRial > 0) return plan.priceRial;
    if (plan.price != null && plan.price > 0) {
      const wasToman = !plan.currency || plan.currency.includes('تومان');
      return wasToman ? plan.price * 10 : plan.price;
    }
    return 0;
  }
  if (plan.priceUsd != null && plan.priceUsd > 0) return plan.priceUsd;
  return 0;
}

export function formatPlanPriceDisplay(plan: PriceFields, locale: string): string {
  const loc = resolveLocale(locale);
  const value = getPlanPriceValue(plan, locale);
  if (loc === 'fa') return formatPrice(value, 'fa');
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUsdFromRial(priceRial: number, usdToRialRate: number): number {
  if (!usdToRialRate || usdToRialRate <= 0) return 0;
  return Math.max(1, Math.round(priceRial / usdToRialRate));
}

const fromPriceLabels: Record<SiteLocale, string> = {
  fa: 'از',
  en: 'From',
  ar: 'من',
};

export function formatStartingPrice(
  plans: PriceFields[],
  locale: string,
  projectBasedLabel: string
): string {
  if (!plans.length) return projectBasedLabel;
  const loc = resolveLocale(locale);
  const from = fromPriceLabels[loc];
  if (loc === 'fa') {
    const minRial = Math.min(...plans.map((p) => getPlanPriceValue(p, 'fa')));
    return `${from} ${formatPrice(minRial, 'fa')} ${getCurrencyLabel('fa')}`;
  }
  const minUsd = Math.min(...plans.map((p) => getPlanPriceValue(p, 'en')));
  return `${from} $${formatPlanPriceDisplay({ priceUsd: minUsd }, 'en')}`;
}

export function getLoadingText(locale: string): string {
  const texts: Record<SiteLocale, string> = {
    fa: 'در حال بارگذاری تجربه شما...',
    en: 'Loading your experience...',
    ar: 'جاري تحميل تجربتك...',
  };
  return texts[resolveLocale(locale)];
}

export function pickLocalizedTags(
  item: Record<string, unknown>,
  locale: string
): string[] {
  const loc = resolveLocale(locale);
  if (loc === 'en') {
    if (Array.isArray(item.tagsEn) && item.tagsEn.length) return item.tagsEn as string[];
    const def = item.id != null ? getDefaultById(item.id as number | string) : undefined;
    if (def && Array.isArray(def.tagsEn)) return def.tagsEn as string[];
  }
  if (loc === 'ar') {
    if (Array.isArray(item.tagsAr) && item.tagsAr.length) return item.tagsAr as string[];
    const def = item.id != null ? getDefaultById(item.id as number | string) : undefined;
    if (def && Array.isArray(def.tagsAr)) return def.tagsAr as string[];
  }
  return Array.isArray(item.tags) ? (item.tags as string[]) : [];
}
