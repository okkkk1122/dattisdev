'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { emailApi } from '@/lib/api/content';
import toast from 'react-hot-toast';

interface InboxEmail {
  id: string;
  from: string;
  to: string[];
  subject: string;
  body: string;
  receivedAt: string;
  read: boolean;
  source: 'haraka' | 'contact';
}

interface EmailStatus {
  provider: string;
  smtpHost: string;
  smtpPort: number;
  mailDomain: string;
  smtpOk: boolean;
  smtpMessage: string;
  inboxCount: number;
  harakaPorts: { smtp: number; submission: number };
}

export default function EmailAdminPage() {
  const [emails, setEmails] = useState<InboxEmail[]>([]);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [selected, setSelected] = useState<InboxEmail | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [inboxRes, statusRes] = await Promise.all([
        emailApi.getInbox(),
        emailApi.getStatus(),
      ]);
      setEmails(inboxRes.data as InboxEmail[]);
      setStatus(statusRes.data as EmailStatus);
    } catch {
      toast.error('خطا در بارگذاری ایمیل‌ها');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleMarkRead = async (id: string, read: boolean) => {
    await emailApi.markRead(id, read);
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, read } : e)));
    if (selected?.id === id) setSelected({ ...selected, read });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('حذف این ایمیل؟')) return;
    await emailApi.deleteInboxItem(id);
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success('ایمیل حذف شد');
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">در حال بارگذاری صندوق ایمیل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">صندوق ایمیل (Haraka)</h1>
          <p className="text-gray-600 dark:text-gray-400">
            دریافت و مدیریت ایمیل‌های دامنه سایت از طریق سرور Haraka
          </p>
        </div>
        <Button variant="outline" onClick={() => void load()}>
          <RefreshCw size={18} className="ml-2" />
          بروزرسانی
        </Button>
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="text-primary-600" size={22} />
              <span className="font-semibold text-gray-900 dark:text-white">Haraka SMTP</span>
            </div>
            {status.smtpOk ? (
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <CheckCircle size={16} /> {status.smtpMessage}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-500 text-sm">
                <XCircle size={16} /> {status.smtpMessage}
              </span>
            )}
            <span className="text-sm text-gray-500">
              دامنه: {status.mailDomain} | پورت‌ها: {status.harakaPorts.smtp} /{' '}
              {status.harakaPorts.submission}
            </span>
            <span className="text-sm text-gray-500">{status.inboxCount} پیام در صندوق</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold">
            پیام‌ها
          </div>
          <div className="max-h-[32rem] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
            {emails.length === 0 ? (
              <p className="p-6 text-center text-gray-500 text-sm">صندوق خالی است</p>
            ) : (
              emails.map((email) => (
                <button
                  key={email.id}
                  type="button"
                  onClick={() => {
                    setSelected(email);
                    if (!email.read) void handleMarkRead(email.id, true);
                  }}
                  className={`w-full text-right p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selected?.id === email.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                  } ${!email.read ? 'font-semibold' : ''}`}
                >
                  <p className="text-sm text-gray-900 dark:text-white truncate">{email.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{email.from}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(email.receivedAt).toLocaleString('fa-IR')} · {email.source}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[20rem]">
          {selected ? (
            <>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selected.subject}</h2>
                  <p className="text-sm text-gray-500 mt-1">از: {selected.from}</p>
                  <p className="text-sm text-gray-500">به: {selected.to.join(', ')}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(selected.receivedAt).toLocaleString('fa-IR')}
                  </p>
                </div>
                <Button variant="outline" onClick={() => void handleDelete(selected.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                {selected.body}
              </pre>
            </>
          ) : (
            <p className="text-center text-gray-500 mt-16">یک ایمیل را برای مشاهده انتخاب کنید</p>
          )}
        </div>
      </div>
    </div>
  );
}
