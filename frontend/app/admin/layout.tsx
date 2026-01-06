import type { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';
import '../globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Panel - DattisDev',
  description: 'DattisDev Admin Panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="ltr" suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-900" suppressHydrationWarning>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
