'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Button from '@/components/common/Button';

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
      emailValue: 'info@dattisdev.com',
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
      emailValue: 'info@dattisdev.com',
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
      emailValue: 'info@dattisdev.com',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(t.form.success);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <MessageSquare className="mr-2 text-primary-600" size={28} />
              {t.form.send}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.name}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.subject}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.info.address}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t.info.addressValue}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Phone className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t.info.phoneValue}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Mail className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t.info.emailValue}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Clock className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t.info.hoursValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
              <div className="h-64 bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-900 dark:to-secondary-900 rounded-lg flex items-center justify-center">
                <MapPin className="text-primary-600" size={64} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



