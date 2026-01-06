'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

const mockTickets = [
  { id: 1, title: 'مشکل در ثبت نام', user: 'علی احمدی', status: 'باز', priority: 'بالا', date: '2024-01-15', messages: 3 },
  { id: 2, title: 'سوال درباره خدمات', user: 'Sarah Johnson', status: 'در حال بررسی', priority: 'متوسط', date: '2024-01-14', messages: 5 },
  { id: 3, title: 'درخواست پشتیبانی', user: 'محمد الخالدی', status: 'بسته', priority: 'پایین', date: '2024-01-13', messages: 2 },
  { id: 4, title: 'مشکل فنی', user: 'رضا محمدی', status: 'باز', priority: 'بالا', date: '2024-01-12', messages: 4 },
];

export default function TicketsPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('همه');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'همه' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'باز':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'در حال بررسی':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'بسته':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'بالا':
        return 'bg-red-500';
      case 'متوسط':
        return 'bg-yellow-500';
      case 'پایین':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          مدیریت تیکت‌ها
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مدیریت و پاسخگویی به تیکت‌های کاربران
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجو تیکت..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
        >
          <option>همه</option>
          <option>باز</option>
          <option>در حال بررسی</option>
          <option>بسته</option>
        </select>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 space-x-reverse mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {ticket.title}
                  </h3>
                  <span className={`w-3 h-3 rounded-full ${getPriorityColor(ticket.priority)}`} />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  کاربر: {ticket.user}
                </p>
                <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                  <span>{ticket.date}</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <MessageSquare size={16} />
                    <span>{ticket.messages} پیام</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <button className="p-2 text-primary-600 hover:text-primary-900 dark:text-primary-400">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



