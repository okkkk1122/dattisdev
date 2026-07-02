'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Button from '@/components/common/Button';
import { emailApi, contentApi } from '@/lib/api/content';
import toast from 'react-hot-toast';
import Image from 'next/image';

const translations: Record<string, Record<string, any>> = {
  fa: {
    title: 'تماس با ما',
    subtitle: 'ما اینجا هستیم تا به شما کمک کنیم',
    form: {
      name: 'نام',
      email: 'ایمیل',
      phone: 'تلفن',
      subject: 'موضوع',
      message: 'پیام',
      send: 'ارسال پیام',
      sending: 'در حال ارسال...',
      success: 'پیام شما با موفقیت ارسال شد!',
      error: 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.',
    },
    info: {
      address: 'آدرس',
      phone: 'تلفن',
      email: 'ایمیل',
      hours: 'ساعات کاری',
      addressValue: 'تهران، خیابان ولیعصر، پلاک 123',
      phoneValue: '+98 21 1234 5678',
      emailValue: 'info@dattisdev.ir',
      hoursValue: 'شنبه تا پنجشنبه: 9 صبح تا 6 عصر',
    },
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We are here to help you',
    form: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Your message has been sent successfully!',
      error: 'Error sending message. Please try again.',
    },
    info: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Working Hours',
      addressValue: 'Tehran, Valiasr Street, No. 123',
      phoneValue: '+98 21 1234 5678',
      emailValue: 'info@dattisdev.ir',
      hoursValue: 'Saturday to Thursday: 9 AM to 6 PM',
    },
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'نحن هنا لمساعدتك',
    form: {
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      subject: 'الموضوع',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      success: 'تم إرسال رسالتك بنجاح!',
      error: 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
    },
    info: {
      address: 'العنوان',
      phone: 'الهاتف',
      email: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
      addressValue: 'طهران، شارع ولي العصر، رقم 123',
      phoneValue: '+98 21 1234 5678',
      emailValue: 'info@dattisdev.ir',
      hoursValue: 'السبت إلى الخميس: 9 صباحاً إلى 6 مساءً',
    },
  },
};

export default function ContactPage() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: t.info.emailValue,
    phone: t.info.phoneValue,
    address: t.info.addressValue,
  });

  useEffect(() => {
    contentApi
      .getSettings()
      .then(({ data }) => {
        setContactInfo({
          email: (data.contactEmail as string) || t.info.emailValue,
          phone: (data.contactPhone as string) || t.info.phoneValue,
          address: (data.address as string) || t.info.addressValue,
        });
      })
      .catch(() => {});
  }, [locale, t.info.addressValue, t.info.emailValue, t.info.phoneValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailApi.sendContact({ ...formData, locale });
      toast.success(t.form.success);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error(t.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} className="page-shell">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="section-subtitle">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="page-card p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <MessageSquare className="mr-2 text-primary-600" size={28} />
              {t.form.send}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="page-label">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="page-input"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="page-label">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="page-input"
                  />
                </div>
                <div>
                  <label className="page-label">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="page-input"
                  />
                </div>
              </div>
              <div>
                <label className="page-label">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="page-input"
                />
              </div>
              <div>
                <label className="page-label">
                  {t.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="page-input"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? t.form.sending : t.form.send}
                <Send className="mr-2" size={20} />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
          >
            <div className="page-card p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t.info.address}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Phone className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Mail className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Clock className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-slate-700 dark:text-slate-300">
                      {t.info.hoursValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="page-card p-4 overflow-hidden">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/images/map.jpg"
                  alt="Map"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary-900/30 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-lg flex items-center gap-2">
                    <MapPin className="text-primary-600" size={20} />
                    <span className="text-sm font-medium">{contactInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



