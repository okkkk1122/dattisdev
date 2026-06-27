'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import { useChatStore, type ChatMessage as ChatMessageType } from '@/lib/stores/chatStore';
import {
  getChatTranslations,
  isDefaultWelcomeMessage,
} from '@/lib/i18n/chatTranslations';
import { resolveLocale } from '@/lib/i18n/localeHelpers';

interface ChatWindowProps {
  locale: string;
  onClose: () => void;
}

export default function ChatWindow({ locale, onClose }: ChatWindowProps) {
  const siteLocale = resolveLocale(locale);
  const t = getChatTranslations(siteLocale);
  const syncLocaleSession = useChatStore((state) => state.syncLocaleSession);
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const sessions = useChatStore((state) => state.sessions);
  const addMessage = useChatStore((state) => state.addMessage);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const displayMessages = useMemo((): ChatMessageType[] => {
    const stored = activeSession?.messages ?? [];
    const conversation = stored.filter(
      (m) => !(m.sender === 'ai' && isDefaultWelcomeMessage(m.text))
    );
    const welcome: ChatMessageType = {
      id: siteLocale === 'fa' ? -1 : siteLocale === 'en' ? -2 : -3,
      text: t.response,
      sender: 'ai',
      timestamp: stored[0]?.timestamp ?? new Date().toISOString(),
      chatId: activeSession?.id,
    };
    return [welcome, ...conversation];
  }, [activeSession, siteLocale, t.response]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const sync = () => syncLocaleSession(siteLocale);

    if (useChatStore.persist.hasHydrated()) {
      sync();
      return;
    }

    return useChatStore.persist.onFinishHydration(() => {
      sync();
    });
  }, [mounted, siteLocale, syncLocaleSession]);

  useEffect(() => {
    if (mounted && displayMessages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [displayMessages, mounted]);

  const handleSend = () => {
    if (!inputValue.trim() || !activeSession) return;

    addMessage(activeSession.id, {
      text: inputValue,
      sender: 'user',
    });

    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (activeSession) {
        addMessage(activeSession.id, {
          text: t.aiResponse,
          sender: 'ai',
        });
      }
    }, 1500);
  };

  return (
    <div
      className="flex flex-col h-full bg-white dark:bg-gray-900"
      dir={siteLocale === 'en' ? 'ltr' : 'rtl'}
    >
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{t.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-sm text-white/90">{t.online}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label={t.close}
          className="text-white hover:text-white/80 transition-colors p-1 rounded hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {!mounted ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">{t.loading}</div>
        ) : (
          <div className="space-y-4">
            {displayMessages.map((message) => (
              <ChatMessage key={message.id} message={message} locale={siteLocale} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm">{t.typing}</span>
            <div className="flex gap-1">
              {[0, 0.2, 0.4].map((delay) => (
                <motion.div
                  key={delay}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={siteLocale === 'fa' ? 'پیوست' : siteLocale === 'ar' ? 'مرفق' : 'Attach'}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            aria-label={siteLocale === 'fa' ? 'ارسال' : siteLocale === 'ar' ? 'إرسال' : 'Send'}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
