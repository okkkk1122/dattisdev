import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

/** متن فارسی — وزیرمتن با اعداد فارسی */
export const vazirmatn = localFont({
  src: [
    {
      path: './fonts/Vazirmatn-FD-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Vazirmatn-FD-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Vazirmatn-FD-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Vazirmatn-FD-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Vazirmatn-FD-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-vazirmatn',
  display: 'swap',
  preload: true,
});

/** عناوین فارسی — ایران‌شارپ */
export const iranSharp = localFont({
  src: [
    {
      path: './fonts/IRANSharp-FaNum-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IRANSharp-FaNum-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iran-sharp',
  display: 'swap',
  preload: true,
});

/** تیتر Hero — لوتوس (فونت کلاسیک و متمایز) */
export const heroLotus = localFont({
  src: [
    {
      path: './fonts/IRLotus-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lotus',
  display: 'swap',
  preload: true,
});

/** @deprecated use heroLotus */
export const heroDisplay = heroLotus;

/** فونت جایگزین — شبنم */
export const shabnam = localFont({
  src: [
    {
      path: './fonts/Shabnam-FD.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Shabnam-Bold-FD.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-shabnam',
  display: 'swap',
  preload: false,
});

/** انگلیسی */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
