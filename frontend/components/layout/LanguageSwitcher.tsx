'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const currentLanguage = languages.find((lang) => lang.code === locale);

  const switchLanguage = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    document.cookie = `GEO_LOCALE_SET=1;path=/;max-age=${60 * 60 * 24 * 30}`;
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Globe size={18} />
        <span className="hidden md:inline">{currentLanguage?.flag}</span>
        <span className="hidden lg:inline">{currentLanguage?.name}</span>
      </button>

      <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => switchLanguage(lang.code)}
            className={`w-full text-right px-4 py-2 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors flex items-center space-x-2 space-x-reverse ${
              locale === lang.code ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : ''
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
