'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { getChatTranslations } from '@/lib/i18n/chatTranslations';
import { resolveLocale } from '@/lib/i18n/localeHelpers';

interface ChatWidgetProps {
  locale: string;
}

export default function ChatWidget({ locale }: ChatWidgetProps) {
  const siteLocale = resolveLocale(locale);
  const t = getChatTranslations(siteLocale);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((open) => !open)}
        initial={false}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-3 rounded-full shadow-brand-lg hover:from-primary-700 hover:to-secondary-700 transition-all flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t.buttonLabel}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-sm font-medium hidden sm:inline">{t.buttonLabel}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-40 w-[min(24rem,calc(100vw-3rem))] h-[500px] page-card overflow-hidden shadow-brand-lg"
          >
            <ChatWindow key={siteLocale} locale={siteLocale} onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
