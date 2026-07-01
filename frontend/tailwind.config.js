/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* آبی سورمه‌ای — رنگ اصلی برند (اعتماد + فناوری) */
        primary: {
          50: '#eef4fb',
          100: '#d6e6f7',
          200: '#b3d0f0',
          300: '#85b3e5',
          400: '#5694d6',
          500: '#3478c4',
          600: '#2563b5',
          700: '#1e509a',
          800: '#1a437f',
          900: '#153866',
        },
        /* نیلی — هم‌خانواده با primary، نه بنفش جدا */
        secondary: {
          50: '#eef0fb',
          100: '#dfe3f7',
          200: '#c5cbf0',
          300: '#a0a9e5',
          400: '#7a85d6',
          500: '#5c67c9',
          600: '#4a54b5',
          700: '#3f469a',
          800: '#363b7f',
          900: '#2f3366',
        },
        /* طلایی ملایم — فقط برای تاکید برند */
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        /* خنثی‌های یکدست (slate) */
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          tint: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Tahoma', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Tahoma', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-body)', 'Tahoma', 'sans-serif'],
        cta: ['var(--font-cta)', 'var(--font-heading)', 'Tahoma', 'sans-serif'],
        display: ['var(--font-heading)', 'var(--font-body)', 'Tahoma', 'sans-serif'],
        hero: ['var(--font-heading)', 'var(--font-body)', 'Tahoma', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        /* legacy aliases */
        vazir: ['var(--font-body)', 'Tahoma', 'sans-serif'],
        lotus: ['var(--font-heading)', 'var(--font-body)', 'Tahoma', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        brand: '0 10px 40px -12px rgba(37, 99, 181, 0.35)',
        'brand-lg': '0 20px 50px -15px rgba(37, 99, 181, 0.4)',
      },
    },
  },
  plugins: [],
  darkMode: ['class'],
};
