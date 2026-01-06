'use client';

import { motion } from 'framer-motion';
import { Users, FileText, Briefcase, Ticket, TrendingUp, DollarSign, Eye, MessageSquare } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stats = [
  { icon: Users, label: 'کاربران', value: '1,234', change: '+12%', color: 'bg-blue-500' },
  { icon: FileText, label: 'مقالات', value: '456', change: '+8%', color: 'bg-green-500' },
  { icon: Briefcase, label: 'پروژه‌ها', value: '89', change: '+15%', color: 'bg-purple-500' },
  { icon: Ticket, label: 'تیکت‌ها', value: '234', change: '-5%', color: 'bg-orange-500' },
  { icon: Eye, label: 'بازدید', value: '12.5K', change: '+23%', color: 'bg-indigo-500' },
  { icon: DollarSign, label: 'درآمد', value: '$45K', change: '+18%', color: 'bg-emerald-500' },
  { icon: MessageSquare, label: 'پیام‌ها', value: '567', change: '+10%', color: 'bg-pink-500' },
  { icon: TrendingUp, label: 'رشد', value: '34%', change: '+5%', color: 'bg-cyan-500' },
];

const chartData = [
  { name: 'فروردین', بازدید: 4000, کاربر: 2400, درآمد: 2400 },
  { name: 'اردیبهشت', بازدید: 3000, کاربر: 1398, درآمد: 2210 },
  { name: 'خرداد', بازدید: 2000, کاربر: 9800, درآمد: 2290 },
  { name: 'تیر', بازدید: 2780, کاربر: 3908, درآمد: 2000 },
  { name: 'مرداد', بازدید: 1890, کاربر: 4800, درآمد: 2181 },
  { name: 'شهریور', بازدید: 2390, کاربر: 3800, درآمد: 2500 },
];

const pieData = [
  { name: 'وب‌سایت', value: 35, color: '#3b82f6' },
  { name: 'اپلیکیشن', value: 30, color: '#8b5cf6' },
  { name: 'ربات', value: 20, color: '#10b981' },
  { name: 'نرم‌افزار', value: 15, color: '#f59e0b' },
];

const recentActivities = [
  { id: 1, type: 'user', message: 'کاربر جدید ثبت نام کرد', time: '5 دقیقه پیش', icon: Users },
  { id: 2, type: 'post', message: 'مقاله جدید منتشر شد', time: '15 دقیقه پیش', icon: FileText },
  { id: 3, type: 'ticket', message: 'تیکت جدید ایجاد شد', time: '30 دقیقه پیش', icon: Ticket },
  { id: 4, type: 'project', message: 'پروژه جدید اضافه شد', time: '1 ساعت پیش', icon: Briefcase },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          داشبورد مدیریت
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          خوش آمدید به پنل مدیریت DattisDev
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <span className={`text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            آمار بازدید و کاربران
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="بازدید" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="کاربر" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            درآمد ماهانه
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="درآمد" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Pie Chart and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            توزیع پروژه‌ها
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            فعالیت‌های اخیر
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Icon className="text-primary-600 dark:text-primary-400" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {activity.message}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
