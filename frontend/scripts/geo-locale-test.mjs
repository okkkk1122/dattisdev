#!/usr/bin/env node
/**
 * Quick checks for IP → locale mapping (no network).
 * Run: node scripts/geo-locale-test.mjs
 */

const ARABIC = new Set([
  'SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'YE', 'IQ', 'SY', 'JO', 'LB', 'PS',
  'EG', 'LY', 'TN', 'DZ', 'MA', 'SD', 'MR', 'SO', 'DJ', 'KM',
]);

function localeFromCountryCode(code) {
  const c = (code || '').toUpperCase();
  if (!c || c === 'XX') return 'en';
  if (c === 'IR') return 'fa';
  if (ARABIC.has(c)) return 'ar';
  return 'en';
}

const assert = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

assert(localeFromCountryCode('IR') === 'fa', 'Iran → fa');
assert(localeFromCountryCode('SA') === 'ar', 'Saudi → ar');
assert(localeFromCountryCode('AE') === 'ar', 'UAE → ar');
assert(localeFromCountryCode('EG') === 'ar', 'Egypt → ar');
assert(localeFromCountryCode('US') === 'en', 'US → en');
assert(localeFromCountryCode('DE') === 'en', 'Germany → en');
assert(localeFromCountryCode('AF') === 'en', 'Afghanistan → en');
assert(localeFromCountryCode(null) === 'en', 'unknown → en');

console.log('geo-locale-test: all passed');
