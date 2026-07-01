import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

/** متن بدنه — ایران‌سنس (پاراگراف، توضیحات، اعداد فارسی) */
export const iranianSans = localFont({
  src: [
    {
      path: './fonts/IranianSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

/** عناوین — یکان (تیتر، عناوین بخش‌ها، حس رسمی) */
export const yekan = localFont({
  src: [
    {
      path: './fonts/Yekan-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Yekan-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-heading',
  display: 'swap',
  preload: true,
});

/** CTA و بنر — فرهنگ (دکمه‌ها، فراخوان اقدام، تاکید برند) */
export const farhang = localFont({
  src: [
    {
      path: './fonts/FarhangFaNum-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/FarhangFaNum-DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/FarhangFaNum-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-cta',
  display: 'swap',
  preload: true,
});

/** انگلیسی */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

/** @deprecated use iranianSans */
export const vazirmatn = iranianSans;

/** @deprecated use yekan */
export const iranSharp = yekan;

/** @deprecated use yekan */
export const heroLotus = yekan;

/** @deprecated use yekan */
export const heroDisplay = yekan;

/** @deprecated use iranianSans */
export const shabnam = iranianSans;
