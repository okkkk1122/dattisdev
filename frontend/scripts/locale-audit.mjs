/**
 * Locale audit — run: node scripts/locale-audit.mjs
 * Requires: npx playwright install chromium (one-time)
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:3001';
const routes = [
  '',
  '/about',
  '/services',
  '/portfolio',
  '/blog',
  '/blog/1',
  '/pricing',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
];
const locales = ['en', 'ar', 'fa'];

const persianLeakWords = [
  'پروژه',
  'طراحی',
  'نمونه کار',
  'مدیر عامل',
  'تومان',
  'ریال',
  'ربات',
  'اپلیکیشن',
  'پلتفرم',
  'سیستم',
  'نرم‌افزار',
  'خدمات ما',
  'خوش آمدید',
  'آخرین مقالات',
  'نمونه کارهای',
  'درباره داتیس',
  'چرا داتیس',
  'نظرات مشتری',
  'تماس با ما',
  'سوالات متداول',
  'تعرفه',
  'بلاگ',
  'مقاله',
  'مشتریان',
  'داتیس‌دِو',
];

const englishLeakWords = [
  'Our Portfolio',
  'Latest Articles',
  'Client Testimonials',
  'Welcome to DattisDev',
  'Why Choose DattisDev',
  'Our Services',
  'Pricing Plans',
  'Frequently Asked',
  'About DattisDev',
  'Get Started',
  'View Project',
  'Contact us and get',
];

const faOnlyOnAr = ['پروژه', 'داتیس‌دِو', 'نمونه کار', 'چرا داتیس', 'درباره داتیس'];

function audit(text, loc) {
  const leaks = [];
  if (loc === 'en') {
    for (const w of persianLeakWords) {
      if (text.includes(w)) leaks.push(`persian:${w}`);
    }
  }
  if (loc === 'fa') {
    for (const w of englishLeakWords) {
      if (text.includes(w)) leaks.push(`english:${w}`);
    }
  }
  if (loc === 'ar') {
    for (const w of faOnlyOnAr) {
      if (text.includes(w)) leaks.push(`persian:${w}`);
    }
  }
  return leaks;
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const results = [];

for (const loc of locales) {
  for (const route of routes) {
    const url = `${BASE}/${loc}${route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(3200);
      const h1 = await page.locator('main h1').first().innerText().catch(() => '');
      const text = await page.locator('main').innerText().catch(() => '');
      const leaks = audit(text, loc);
      results.push({ url, locale: loc, h1, leaks, ok: leaks.length === 0 });
    } catch (err) {
      results.push({ url, locale: loc, error: String(err), ok: false });
    }
  }
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(JSON.stringify({ total: results.length, passed: results.length - failed.length, failed }, null, 2));

if (failed.length > 0) process.exit(1);
