'use client';

import { usePathname } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Eye, Award, Users, Code, Zap, Heart, Shield } from 'lucide-react';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'درباره داتیس‌دِو',
    subtitle: 'تیم حرفه‌ای ما',
    mission: {
      title: 'ماموریت ما',
      description: 'ارائه بهترین راهکارهای دیجیتال با استفاده از جدیدترین تکنولوژی‌ها و استانداردهای صنعتی. ما متعهد به ارائه کیفیت بالا و رضایت کامل مشتریان هستیم.',
    },
    vision: {
      title: 'چشم‌انداز',
      description: 'تبدیل شدن به برترین شرکت توسعه نرم‌افزار در منطقه و ارائه راهکارهای نوآورانه که به رشد و موفقیت کسب‌وکارهای مشتریان کمک می‌کند.',
    },
    values: {
      title: 'ارزش‌های ما',
      quality: { title: 'کیفیت', description: 'تعهد به ارائه بهترین کیفیت در تمام پروژه‌ها' },
      innovation: { title: 'نوآوری', description: 'استفاده از جدیدترین تکنولوژی‌ها و روش‌ها' },
      customerFocus: { title: 'تمرکز بر مشتری', description: 'مشتری در مرکز تمام تصمیم‌گیری‌های ماست' },
      excellence: { title: 'تعالی', description: 'تلاش مداوم برای بهبود و تعالی' },
    },
    timeline: {
      title: 'تاریخچه ما',
      items: [
        { year: '2019', title: 'تأسیس', description: 'شروع فعالیت با تیم کوچک' },
        { year: '2020', title: 'رشد', description: 'افزایش تعداد پروژه‌ها و مشتریان' },
        { year: '2021', title: 'توسعه', description: 'افزودن خدمات جدید و تیم بزرگ‌تر' },
        { year: '2022', title: 'نوآوری', description: 'استفاده از AI و تکنولوژی‌های جدید' },
        { year: '2023', title: 'تعالی', description: 'رسیدن به 150+ پروژه موفق' },
        { year: '2024', title: 'آینده', description: 'ادامه رشد و نوآوری' },
      ],
    },
    team: {
      title: 'تیم ما',
      members: [
        { name: 'علی احمدی', role: 'مدیر فنی', image: '/images/team1.jpg' },
        { name: 'Sarah Johnson', role: 'طراح UI/UX', image: '/images/team2.jpg' },
        { name: 'محمد الخالدی', role: 'توسعه‌دهنده Backend', image: '/images/team3.jpg' },
        { name: 'رضا محمدی', role: 'توسعه‌دهنده Frontend', image: '/images/team4.jpg' },
      ],
    },
  },
  en: {
    title: 'About DattisDev',
    subtitle: 'Our professional team',
    mission: {
      title: 'Our Mission',
      description: 'Providing the best digital solutions using the latest technologies and industry standards. We are committed to delivering high quality and complete customer satisfaction.',
    },
    vision: {
      title: 'Vision',
      description: 'Becoming the leading software development company in the region and providing innovative solutions that help grow and succeed our clients\' businesses.',
    },
    values: {
      title: 'Our Values',
      quality: { title: 'Quality', description: 'Commitment to delivering the best quality in all projects' },
      innovation: { title: 'Innovation', description: 'Using the latest technologies and methods' },
      customerFocus: { title: 'Customer Focus', description: 'Customer is at the center of all our decisions' },
      excellence: { title: 'Excellence', description: 'Continuous effort for improvement and excellence' },
    },
    timeline: {
      title: 'Our History',
      items: [
        { year: '2019', title: 'Foundation', description: 'Starting with a small team' },
        { year: '2020', title: 'Growth', description: 'Increasing projects and clients' },
        { year: '2021', title: 'Expansion', description: 'Adding new services and larger team' },
        { year: '2022', title: 'Innovation', description: 'Using AI and new technologies' },
        { year: '2023', title: 'Excellence', description: 'Reaching 150+ successful projects' },
        { year: '2024', title: 'Future', description: 'Continuing growth and innovation' },
      ],
    },
    team: {
      title: 'Our Team',
      members: [
        { name: 'Ali Ahmadi', role: 'Technical Director', image: '/images/team1.jpg' },
        { name: 'Sarah Johnson', role: 'UI/UX Designer', image: '/images/team2.jpg' },
        { name: 'Mohammed Al-Khalidi', role: 'Backend Developer', image: '/images/team3.jpg' },
        { name: 'Reza Mohammadi', role: 'Frontend Developer', image: '/images/team4.jpg' },
      ],
    },
  },
  ar: {
    title: 'حول داتيس ديف',
    subtitle: 'فريقنا المحترف',
    mission: {
      title: 'مهمتنا',
      description: 'تقديم أفضل الحلول الرقمية باستخدام أحدث التقنيات والمعايير الصناعية. نحن ملتزمون بتقديم جودة عالية ورضا كامل للعملاء.',
    },
    vision: {
      title: 'الرؤية',
      description: 'أن نصبح الشركة الرائدة في تطوير البرمجيات في المنطقة وتقديم حلول مبتكرة تساعد في نمو ونجاح أعمال عملائنا.',
    },
    values: {
      title: 'قيمنا',
      quality: { title: 'الجودة', description: 'الالتزام بتقديم أفضل جودة في جميع المشاريع' },
      innovation: { title: 'الابتكار', description: 'استخدام أحدث التقنيات والطرق' },
      customerFocus: { title: 'التركيز على العميل', description: 'العميل في مركز جميع قراراتنا' },
      excellence: { title: 'التميز', description: 'الجهد المستمر للتحسين والتميز' },
    },
    timeline: {
      title: 'تاريخنا',
      items: [
        { year: '2019', title: 'التأسيس', description: 'البدء بفريق صغير' },
        { year: '2020', title: 'النمو', description: 'زيادة المشاريع والعملاء' },
        { year: '2021', title: 'التوسع', description: 'إضافة خدمات جديدة وفريق أكبر' },
        { year: '2022', title: 'الابتكار', description: 'استخدام الذكاء الاصطناعي والتقنيات الجديدة' },
        { year: '2023', title: 'التميز', description: 'الوصول إلى 150+ مشروع ناجح' },
        { year: '2024', title: 'المستقبل', description: 'مواصلة النمو والابتكار' },
      ],
    },
    team: {
      title: 'فريقنا',
      members: [
        { name: 'علي أحمدي', role: 'المدير التقني', image: '/images/team1.jpg' },
        { name: 'Sarah Johnson', role: 'مصمم UI/UX', image: '/images/team2.jpg' },
        { name: 'محمد الخالدي', role: 'مطور Backend', image: '/images/team3.jpg' },
        { name: 'رضا محمدي', role: 'مطور Frontend', image: '/images/team4.jpg' },
      ],
    },
  },
};

const valueIcons = [Target, Eye, Award, Users, Code, Zap, Heart, Shield];

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen section-surface-muted">
      <section className="page-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="page-hero-title">{t.title}</h1>
          <p className="page-hero-subtitle">{t.subtitle}</p>
        </div>
      </section>

      <section ref={ref} className="py-20 section-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="p-8 page-card-soft"
            >
              <Target className="text-primary-600 mb-4" size={48} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {t.mission.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {t.mission.description}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="p-8 page-card-soft"
            >
              <Eye className="text-secondary-600 mb-4" size={48} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {t.vision.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {t.vision.description}
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div>
            <h2 className="section-title text-center mb-12">
              {t.values.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(t.values).map(([key, value]: [string, any], index) => {
                if (key === 'title') return null;
                const Icon = valueIcons[index % valueIcons.length];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 page-card text-center"
                  >
                    <Icon className="text-primary-600 mx-auto mb-4" size={40} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 section-surface-muted">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">
            {t.timeline.title}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 dark:bg-primary-800 hidden md:block" />
            <div className="space-y-12">
              {t.timeline.items.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="page-card p-6">
                      <div className="text-primary-600 font-bold text-2xl mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-slate-800 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 section-surface">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">
            {t.team.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.team.members.map((member: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center text-white text-4xl font-bold shadow-brand">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



