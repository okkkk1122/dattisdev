'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  MessageSquare,
  Settings,
  Ticket,
  BarChart3,
  Star,
  DollarSign,
  HelpCircle,
  Mail,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'داشبورد', href: '/admin' },
  { icon: Users, label: 'کاربران', href: '/admin/users' },
  { icon: FileText, label: 'مقالات', href: '/admin/posts' },
  { icon: Briefcase, label: 'نمونه کارها', href: '/admin/portfolio' },
  { icon: Star, label: 'نظرات', href: '/admin/testimonials' },
  { icon: DollarSign, label: 'تعرفه‌ها', href: '/admin/pricing' },
  { icon: HelpCircle, label: 'سوالات متداول', href: '/admin/faq' },
  { icon: Ticket, label: 'تیکت‌ها', href: '/admin/tickets' },
  { icon: Mail, label: 'ایمیل (Haraka)', href: '/admin/email' },
  { icon: MessageSquare, label: 'چت', href: '/admin/chat' },
  { icon: BarChart3, label: 'آمار', href: '/admin/analytics' },
  { icon: Settings, label: 'تنظیمات', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen fixed right-0 top-16">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-3 space-x-reverse p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  whileHover={{ x: -5 }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}



