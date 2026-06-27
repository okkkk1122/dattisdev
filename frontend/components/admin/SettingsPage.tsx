'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Mail, Bell, Shield, Server, DollarSign } from 'lucide-react';
import Button from '@/components/common/Button';
import { contentApi, emailApi } from '@/lib/api/content';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'DattisDev',
    siteDescription: 'شرکت طراحی و توسعه نرم‌افزار',
    contactEmail: 'info@dattisdev.com',
    contactPhone: '+98 21 1234 5678',
    address: 'تهران، خیابان ولیعصر',
    smtpHost: 'haraka',
    smtpPort: 25,
    smtpUser: '',
    smtpPass: '',
    smtpFrom: 'info@dattisdev.com',
    mailDomain: 'dattisdev.com',
    harakaInboundSecret: '',
    notifications: true,
    emailNotifications: true,
    maintenanceMode: false,
    usdToRialRate: 420000,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .getSettings()
      .then(({ data }) => {
        setSettings((prev) => ({
          ...prev,
          siteName: (data.siteName as string) || prev.siteName,
          contactEmail: (data.contactEmail as string) || prev.contactEmail,
          contactPhone: (data.contactPhone as string) || prev.contactPhone,
          address: (data.address as string) || prev.address,
          smtpHost: (data.smtpHost as string) || prev.smtpHost,
          smtpPort: Number(data.smtpPort) || prev.smtpPort,
          smtpUser: (data.smtpUser as string) || '',
          smtpFrom: (data.smtpFrom as string) || prev.smtpFrom,
          mailDomain: (data.mailDomain as string) || prev.mailDomain,
          harakaInboundSecret: (data.harakaInboundSecret as string) || '',
          usdToRialRate: Number(data.usdToRialRate) || prev.usdToRialRate,
        }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string | number | boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    try {
      await contentApi.updateSettings({
        siteName: settings.siteName,
        contactEmail: settings.contactEmail,
        contactPhone: settings.contactPhone,
        address: settings.address,
        smtpHost: settings.smtpHost,
        smtpPort: settings.smtpPort,
        smtpUser: settings.smtpUser,
        smtpPass: settings.smtpPass || undefined,
        smtpFrom: settings.smtpFrom,
        mailDomain: settings.mailDomain,
        harakaInboundSecret: settings.harakaInboundSecret || undefined,
        usdToRialRate: settings.usdToRialRate,
      });
      toast.success('تنظیمات با موفقیت ذخیره شد!');
    } catch {
      toast.error('خطا در ذخیره تنظیمات');
    }
  };

  const handleTestEmail = async () => {
    try {
      const { data } = await emailApi.testConnection();
      if (data.success) toast.success('اتصال SMTP موفق بود');
      else toast.error(data.message || 'SMTP پیکربندی نشده');
    } catch {
      toast.error('خطا در تست اتصال SMTP');
    }
  };

  if (loading) return <div className="p-8 text-center">در حال بارگذاری...</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          تنظیمات
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مدیریت تنظیمات سایت
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Globe className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تنظیمات عمومی
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نام سایت
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                توضیحات سایت
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleChange('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Currency Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <DollarSign className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تنظیمات واحد پول
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              قیمت‌ها در سایت فارسی به ریال و در انگلیسی/عربی به دلار آمریکا نمایش داده می‌شوند.
              نرخ تبدیل برای محاسبه خودکار قیمت دلار در مدیریت تعرفه‌ها استفاده می‌شود.
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نرخ تبدیل (۱ دلار = چند ریال)
              </label>
              <input
                type="number"
                min={1}
                value={settings.usdToRialRate}
                onChange={(e) => handleChange('usdToRialRate', Number(e.target.value) || 420000)}
                className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Mail className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              اطلاعات تماس
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                تلفن
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                آدرس
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* SMTP Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Server className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تنظیمات ایمیل (Haraka / SMTP)
            </h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            پیش‌فرض Docker: Host = <code className="text-primary-600">haraka</code> ، Port ={' '}
            <code className="text-primary-600">25</code>. پورت‌های میزبان: 2525 (SMTP) و 2587
            (Submission).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                دامنه ایمیل
              </label>
              <input
                type="text"
                value={settings.mailDomain}
                onChange={(e) => handleChange('mailDomain', e.target.value)}
                placeholder="dattisdev.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                کلید امنیتی Inbound (Haraka)
              </label>
              <input
                type="password"
                value={settings.harakaInboundSecret}
                onChange={(e) => handleChange('harakaInboundSecret', e.target.value)}
                placeholder="change-me-inbound-secret"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMTP Host</label>
              <input type="text" value={settings.smtpHost} onChange={(e) => handleChange('smtpHost', e.target.value)}
                placeholder="haraka"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMTP Port</label>
              <input type="number" value={settings.smtpPort} onChange={(e) => handleChange('smtpPort', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMTP User</label>
              <input type="text" value={settings.smtpUser} onChange={(e) => handleChange('smtpUser', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SMTP Password</label>
              <input type="password" value={settings.smtpPass} onChange={(e) => handleChange('smtpPass', e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From Email</label>
              <input type="email" value={settings.smtpFrom} onChange={(e) => handleChange('smtpFrom', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white" />
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={handleTestEmail}>تست اتصال SMTP</Button>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Bell className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تنظیمات اعلان‌ها
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">اعلان‌های سیستم</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">دریافت اعلان‌های سیستم</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">اعلان‌های ایمیل</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">دریافت اعلان‌ها از طریق ایمیل</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-3 space-x-reverse mb-6">
            <Shield className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              تنظیمات سیستم
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">حالت تعمیرات</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">غیرفعال کردن سایت برای تعمیرات</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save size={20} className="mr-2" />
          ذخیره تنظیمات
        </Button>
      </div>
    </div>
  );
}



