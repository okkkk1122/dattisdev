'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Eye, DollarSign, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { month: 'فروردین', بازدید: 4000, کاربر: 2400, درآمد: 2400, تبدیل: 24 },
  { month: 'اردیبهشت', بازدید: 3000, کاربر: 1398, درآمد: 2210, تبدیل: 18 },
  { month: 'خرداد', بازدید: 2000, کاربر: 9800, درآمد: 2290, تبدیل: 22 },
  { month: 'تیر', بازدید: 2780, کاربر: 3908, درآمد: 2000, تبدیل: 20 },
  { month: 'مرداد', بازدید: 1890, کاربر: 4800, درآمد: 2181, تبدیل: 19 },
  { month: 'شهریور', بازدید: 2390, کاربر: 3800, درآمد: 2500, تبدیل: 25 },
];

const topPages = [
  { page: '/', views: 12340, bounce: '32%' },
  { page: '/services', views: 8900, bounce: '28%' },
  { page: '/portfolio', views: 6700, bounce: '35%' },
  { page: '/about', views: 4500, bounce: '30%' },
  { page: '/blog', views: 3200, bounce: '40%' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          آمار و گزارش‌ها
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          تحلیل و بررسی عملکرد سایت
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Eye, label: 'بازدید کل', value: '125.5K', change: '+23%', color: 'bg-blue-500' },
          { icon: Users, label: 'کاربران جدید', value: '2.3K', change: '+15%', color: 'bg-green-500' },
          { icon: DollarSign, label: 'درآمد', value: '$45K', change: '+18%', color: 'bg-purple-500' },
          { icon: TrendingUp, label: 'نرخ تبدیل', value: '3.2%', change: '+5%', color: 'bg-orange-500' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${metric.color} rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className="text-green-600 text-sm font-semibold">{metric.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            روند بازدید و کاربران
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="بازدید" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
              <Area type="monotone" dataKey="کاربر" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            نرخ تبدیل
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="تبدیل" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          صفحات پربازدید
        </h3>
        <div className="space-y-4">
          {topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">{page.page}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {page.views.toLocaleString()} بازدید • Bounce Rate: {page.bounce}
                </p>
              </div>
              <BarChart3 className="text-primary-600" size={24} />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}



