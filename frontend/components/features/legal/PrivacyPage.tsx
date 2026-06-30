'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  fa: {
    title: 'حریم خصوصی',
    sections: [
      {
        heading: 'جمع‌آوری اطلاعات',
        body: 'ما اطلاعاتی مانند نام، ایمیل و شماره تماس را فقط هنگام ارسال فرم تماس یا ثبت‌نام جمع‌آوری می‌کنیم. این اطلاعات صرفاً برای پاسخگویی و ارائه خدمات استفاده می‌شود.',
      },
      {
        heading: 'استفاده از اطلاعات',
        body: 'اطلاعات شما برای ارتباط با شما، بهبود خدمات و ارسال اطلاعیه‌های مرتبط با پروژه‌هایتان استفاده می‌شود. ما اطلاعات شما را به اشخاص ثالث نمی‌فروشیم.',
      },
      {
        heading: 'امنیت داده‌ها',
        body: 'ما از پروتکل‌های امنیتی استاندارد برای محافظت از اطلاعات شما استفاده می‌کنیم. دسترسی به داده‌ها محدود به پرسنل مجاز است.',
      },
      {
        heading: 'تماس',
        body: 'برای هرگونه سؤال درباره حریم خصوصی، با info@dattisdev.com تماس بگیرید.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Information Collection',
        body: 'We collect information such as name, email, and phone number only when you submit a contact form or register. This data is used solely for responding and providing services.',
      },
      {
        heading: 'Use of Information',
        body: 'Your information is used to communicate with you, improve our services, and send project-related notifications. We do not sell your data to third parties.',
      },
      {
        heading: 'Data Security',
        body: 'We use standard security protocols to protect your information. Access to data is limited to authorized personnel only.',
      },
      {
        heading: 'Contact',
        body: 'For any privacy-related questions, contact us at info@dattisdev.com.',
      },
    ],
  },
  ar: {
    title: 'سياسة الخصوصية',
    sections: [
      {
        heading: 'جمع المعلومات',
        body: 'نجمع معلومات مثل الاسم والبريد الإلكتروني ورقم الهاتف فقط عند إرسال نموذج الاتصال أو التسجيل. تُستخدم هذه البيانات فقط للرد وتقديم الخدمات.',
      },
      {
        heading: 'استخدام المعلومات',
        body: 'تُستخدم معلوماتك للتواصل معك وتحسين خدماتنا وإرسال إشعارات متعلقة بالمشاريع. لا نبيع بياناتك لأطراف ثالثة.',
      },
      {
        heading: 'أمان البيانات',
        body: 'نستخدم بروتوكولات أمان قياسية لحماية معلوماتك. الوصول إلى البيانات محدود للموظفين المصرح لهم فقط.',
      },
      {
        heading: 'اتصل بنا',
        body: 'لأي أسئلة متعلقة بالخصوصية، تواصل معنا على info@dattisdev.com.',
      },
    ],
  },
};

export default function PrivacyPage() {
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
