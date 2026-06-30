'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  fa: {
    title: 'قوانین و مقررات',
    sections: [
      {
        heading: 'پذیرش شرایط',
        body: 'با استفاده از وب‌سایت و خدمات DattisDev، شما این قوانین را می‌پذیرید. در صورت عدم موافقت، لطفاً از خدمات استفاده نکنید.',
      },
      {
        heading: 'خدمات',
        body: 'ما خدمات طراحی وب، توسعه اپلیکیشن، ربات و نرم‌افزار ارائه می‌دهیم. جزئیات هر پروژه در قرارداد جداگانه مشخص می‌شود.',
      },
      {
        heading: 'مالکیت معنوی',
        body: 'پس از تسویه کامل، مالکیت خروجی پروژه به مشتری منتقل می‌شود مگر اینکه خلاف آن توافق شده باشد.',
      },
      {
        heading: 'محدودیت مسئولیت',
        body: 'DattisDev مسئول خسارات غیرمستقیم ناشی از استفاده از خدمات نیست. مسئولیت ما محدود به مبلغ قرارداد پروژه است.',
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    sections: [
      {
        heading: 'Acceptance',
        body: 'By using DattisDev website and services, you agree to these terms. If you do not agree, please do not use our services.',
      },
      {
        heading: 'Services',
        body: 'We provide web design, app development, bot, and software services. Project details are specified in separate contracts.',
      },
      {
        heading: 'Intellectual Property',
        body: 'Upon full payment, project deliverables ownership transfers to the client unless otherwise agreed.',
      },
      {
        heading: 'Limitation of Liability',
        body: 'DattisDev is not liable for indirect damages from service use. Our liability is limited to the project contract amount.',
      },
    ],
  },
  ar: {
    title: 'شروط الخدمة',
    sections: [
      {
        heading: 'القبول',
        body: 'باستخدام موقع DattisDev وخدماته، فإنك توافق على هذه الشروط. إذا كنت لا توافق، يرجى عدم استخدام خدماتنا.',
      },
      {
        heading: 'الخدمات',
        body: 'نقدم خدمات تصميم الويب وتطوير التطبيقات والروبوتات والبرمجيات. تُحدد تفاصيل المشروع في عقود منفصلة.',
      },
      {
        heading: 'الملكية الفكرية',
        body: 'بعد السداد الكامل، تنتقل ملكية مخرجات المشروع إلى العميل ما لم يُتفق على خلاف ذلك.',
      },
      {
        heading: 'حدود المسؤولية',
        body: 'DattisDev غير مسؤولة عن الأضرار غير المباشرة الناتجة عن استخدام الخدمات. مسؤوليتنا محدودة بمبلغ عقد المشروع.',
      },
    ],
  },
};

export default function TermsPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const page = content[locale] || content.fa;

  return (
    <section className="page-shell">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title text-4xl mb-12"
        >
          {page.title}
        </motion.h1>
        <div className="space-y-8">
          {page.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="page-card p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {section.heading}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{section.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
