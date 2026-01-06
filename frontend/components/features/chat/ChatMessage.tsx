'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { enUS, Locale } from 'date-fns/locale';

const locales: Record<string, Locale> = { 
  fa: enUS, // Fallback to English for Persian
  en: enUS, 
  ar: enUS, // Fallback to English for Arabic
};

interface ChatMessageProps {
  message: {
    id: number;
    text: string;
    sender: 'user' | 'ai' | 'admin';
    timestamp: Date | string;
  };
  locale?: string;
}

export default function ChatMessage({ message, locale = 'fa' }: ChatMessageProps) {
  const [mounted, setMounted] = useState(false);
  const isUser = message.sender === 'user';
  const dateLocale = locales[locale as keyof typeof locales] || locales.fa;

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedTime = mounted
    ? format(
        message.timestamp instanceof Date ? message.timestamp : new Date(message.timestamp),
        'HH:mm',
        { locale: dateLocale }
      )
    : '--:--';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      layout={false}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-primary-600 text-white rounded-tr-none'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            isUser ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {formattedTime}
        </p>
      </div>
    </motion.div>
  );
}
