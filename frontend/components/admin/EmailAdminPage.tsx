'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Trash2,
  RefreshCw,
  CheckCircle,
  XCircle,
  Send,
  Reply,
  PenSquare,
  Inbox,
  Info,
} from 'lucide-react';
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
  source: 'haraka' | 'contact' | 'sent';
}

interface EmailStatus {
  provider: string;
  smtpHost: string;
  smtpPort: number;
  smtpFrom: string;
  contactEmail: string;
  mailDomain: string;
  smtpOk: boolean;
  smtpMessage: string;
  inboxCount: number;
  unreadCount: number;
  harakaPorts: { smtp: number; submission: number };
  mxHint: string;
}

const sourceLabel: Record<InboxEmail['source'], string> = {
  haraka: 'دریافتی',
  contact: 'فرم تماس',
  sent: 'ارسالی',
};

export default function EmailAdminPage() {
  const [emails, setEmails] = useState<InboxEmail[]>([]);
  const [status, setStatus] = useState<EmailStatus | null>(null);
  const [selected, setSelected] = useState<InboxEmail | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'inbox' | 'compose'>('inbox');
  const [sending, setSending] = useState(false);
  const [compose, setCompose] = useState({
    to: '',
    cc: '',
    subject: '',
    body: '',
    replyTo: '',
    inReplyTo: '',
  });

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

  const openCompose = (prefill?: Partial<typeof compose>) => {
    setCompose({
      to: '',
      cc: '',
      subject: '',
      body: '',
      replyTo: '',
      inReplyTo: '',
      ...prefill,
    });
    setView('compose');
  };

  const handleReply = (email: InboxEmail) => {
    const replySubject = email.subject.startsWith('Re:')
      ? email.subject
      : `Re: ${email.subject}`;
    openCompose({
      to: email.from,
      subject: replySubject,
      body: `\n\n---\n${email.body}`,
      replyTo: status?.smtpFrom || status?.contactEmail,
      inReplyTo: email.id,
    });
  };

  const handleSend = async () => {
    if (!compose.to || !compose.subject || !compose.body.trim()) {
      toast.error('گیرنده، موضوع و متن الزامی است');
      return;
    }
    setSending(true);
    try {
      await emailApi.send({
        to: compose.to,
        cc: compose.cc || undefined,
        subject: compose.subject,
        body: compose.body,
        replyTo: compose.replyTo || undefined,
        inReplyTo: compose.inReplyTo || undefined,
      });
      toast.success('ایمیل ارسال شد');
      setView('inbox');
      await load();
    } catch {
      toast.error('ارسال ایمیل ناموفق بود — SMTP را در تنظیمات بررسی کنید');
    } finally {
      setSending(false);
    }
  };

  const handleTestSend = async () => {
    try {
      const { data } = await emailApi.sendTest(status?.contactEmail);
      toast.success(`ایمیل تست به ${data.to} ارسال شد`);
      await load();
    } catch {
      toast.error('ارسال ایمیل تست ناموفق بود');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">در حال بارگذاری صندوق ایمیل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            مدیریت ایمیل
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            دریافت، ارسال و پاسخ به ایمیل‌های دامنه {status?.mailDomain || 'dattisdev.ir'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => void load()}>
            <RefreshCw size={18} className="ml-2" />
            بروزرسانی
          </Button>
          <Button variant="outline" onClick={() => openCompose()}>
            <PenSquare size={18} className="ml-2" />
            ایمیل جدید
          </Button>
          <Button onClick={() => void handleTestSend()}>
            <Send size={18} className="ml-2" />
            ارسال تست
          </Button>
        </div>
      </div>

      {status && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Mail className="text-primary-600" size={22} />
              <span className="font-semibold text-gray-900 dark:text-white">SMTP / Haraka</span>
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
              از: {status.smtpFrom} | دامنه: {status.mailDomain}
            </span>
            <span className="text-sm text-gray-500">
              {status.unreadCount} خوانده‌نشده از {status.inboxCount} پیام
            </span>
          </div>

          <div className="rounded-lg bg-slate-50 dark:bg-slate-900/50 p-4 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-2">
              <Info size={18} className="text-primary-600 mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="font-medium text-gray-900 dark:text-white">راه‌اندازی دریافت ایمیل (کارهایی که باید خودتان انجام دهید)</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>
                    در DNS دامنه <strong>{status.mailDomain}</strong> رکورد{' '}
                    <code className="text-primary-600">MX</code> بسازید که به IP سرور اشاره کند.
                  </li>
                  <li>
                    پورت‌های <strong>25</strong> (یا {status.harakaPorts.smtp} روی میزبان) و{' '}
                    <strong>{status.harakaPorts.submission}</strong> را در فایروال سرور باز کنید.
                  </li>
                  <li>
                    رکورد <code className="text-primary-600">SPF</code> (TXT روی @):{' '}
                    <code className="text-xs">v=spf1 mx a:mail.{status.mailDomain} ip4:SERVER_IP -all</code>
                  </li>
                  <li>
                    رکورد <code className="text-primary-600">DKIM</code> (TXT روی mail._domainkey): سرور
                    امضای DKIM را خودکار اضافه می‌کند؛ مقدار TXT را از فایل{' '}
                    <code className="text-xs">docker/haraka/config/dns-records.txt</code> کپی کنید.
                  </li>
                  <li>
                    رکورد <code className="text-primary-600">DMARC</code> (TXT روی _dmarc):{' '}
                    <code className="text-xs">v=DMARC1; p=none; rua=mailto:info@{status.mailDomain}</code>
                  </li>
                  <li>
                    از هاستینگ <strong>PTR/rDNS</strong> برای IP سرور درخواست کنید:{' '}
                    <code className="text-xs">mail.{status.mailDomain}</code>
                  </li>
                  <li>
                    در تنظیمات سایت، <strong>کلید Inbound Haraka</strong> و{' '}
                    <strong>HARAKA_INBOUND_SECRET</strong> در .env سرور یکسان باشند.
                  </li>
                  <li>
                    آدرس‌هایی مثل <strong>info@{status.mailDomain}</strong> را به این سرور بفرستید؛
                    پیام‌ها در همین صندوق نمایش داده می‌شوند.
                  </li>
                </ol>
                <p className="text-xs text-gray-500">{status.mxHint}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {view === 'compose' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">نوشتن ایمیل</h2>
            <Button variant="outline" onClick={() => setView('inbox')}>
              <Inbox size={16} className="ml-2" />
              بازگشت به صندوق
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">گیرنده (To)</label>
              <input
                type="email"
                value={compose.to}
                onChange={(e) => setCompose({ ...compose, to: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
                placeholder={`user@${status?.mailDomain || 'dattisdev.ir'}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رونوشت (CC)</label>
              <input
                type="email"
                value={compose.cc}
                onChange={(e) => setCompose({ ...compose, cc: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">موضوع</label>
            <input
              type="text"
              value={compose.subject}
              onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">متن پیام</label>
            <textarea
              value={compose.body}
              onChange={(e) => setCompose({ ...compose, body: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <Button onClick={() => void handleSend()} disabled={sending}>
            <Send size={18} className="ml-2" />
            {sending ? 'در حال ارسال...' : 'ارسال ایمیل'}
          </Button>
        </div>
      ) : (
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
                    } ${!email.read && email.source !== 'sent' ? 'font-semibold' : ''}`}
                  >
                    <p className="text-sm text-gray-900 dark:text-white truncate">{email.subject}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {email.source === 'sent' ? `به: ${email.to.join(', ')}` : `از: ${email.from}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(email.receivedAt).toLocaleString('fa-IR')} ·{' '}
                      {sourceLabel[email.source]}
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selected.subject}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {selected.source === 'sent' ? `به: ${selected.to.join(', ')}` : `از: ${selected.from}`}
                    </p>
                    {selected.source !== 'sent' && (
                      <p className="text-sm text-gray-500">به: {selected.to.join(', ')}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(selected.receivedAt).toLocaleString('fa-IR')} ·{' '}
                      {sourceLabel[selected.source]}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {selected.source !== 'sent' && (
                      <Button variant="outline" onClick={() => handleReply(selected)}>
                        <Reply size={16} />
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => void handleDelete(selected.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
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
      )}
    </div>
  );
}
