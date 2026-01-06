'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '@/lib/stores/theme';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Check authentication (you can add real auth check here)
  useEffect(() => {
    // For now, we'll allow access, but in production you should check auth
    // const token = localStorage.getItem('admin_token');
    // if (!token && pathname !== '/admin/login') {
    //   router.push('/admin/login');
    // }
  }, [pathname, router]);

  return (
    <div className="min-h-screen">
      <AdminHeader />
      <div className="flex pt-16">
        <AdminSidebar />
        <main className="flex-1 p-8 mr-64">{children}</main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

