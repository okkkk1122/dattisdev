'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ChatMessage from './ChatMessage';
import { useChatStore, chatEventEmitter } from '@/lib/stores/chatStore';

const translations: Record<string, Record<string, string>> = {
  fa: {
    title: 'چت آنلاین',
    online: 'آنلاین',
    placeholder: 'پیام خود را بنویسید...',
    noMessages: 'پیامی وجود ندارد',
    typing: 'در حال تایپ...',
    response: 'سلام! من دستیار هوشمند داتیس‌دِو هستم. چطور می‌تونم کمکتون کنم؟',
    aiResponse: 'ممنون از پیام شما. تیم ما به زودی با شما تماس خواهد گرفت. در صورت نیاز می‌تونید از سیستم تیکتینگ هم استفاده کنید.',
  },
  en: {
    title: 'Online Chat',
    online: 'Online',
    placeholder: 'Type your message...',
    noMessages: 'No messages',
    typing: 'Typing...',
    response: 'Hello! I am DattisDev\'s AI assistant. How can I help you?',
    aiResponse: 'Thank you for your message. Our team will contact you soon. You can also use our ticketing system if needed.',
  },
  ar: {
    title: 'الدردشة عبر الإنترنت',
    online: 'متصل',
    placeholder: 'اكتب رسالتك...',
    noMessages: 'لا توجد رسائل',
    typing: 'يكتب...',
    response: 'مرحباً! أنا مساعد داتيس ديف الذكي. كيف يمكنني مساعدتك؟',
    aiResponse: 'شكراً لرسالتك. سيتصل فريقنا بك قريباً. يمكنك أيضاً استخدام نظام التذاكر إذا لزم الأمر.',
  },
};

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'fa';
  const t = translations[locale] || translations.fa;
  const { getOrCreateDefaultSession, getActiveSession, addMessage, setActiveSession } = useChatStore();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const sessionId = getOrCreateDefaultSession();
    setActiveSession(sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subscribe to store for real-time updates
  const sessions = useChatStore((state) => state.sessions);
  const activeSessionId = useChatStore((state) => state.activeSessionId);
  const activeSession = mounted ? getActiveSession() : null;
  const messages = activeSession?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (mounted && messages.length > 0) {
      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages, mounted]);

  const handleSend = () => {
    if (!inputValue.trim() || !activeSession) return;

    // Add user message
    addMessage(activeSession.id, {
      text: inputValue,
      sender: 'user',
    });

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      addMessage(activeSession.id, {
        text: t.aiResponse,
        sender: 'ai',
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-lg">{t.title}</h3>
          <div className="flex items-center space-x-2 space-x-reverse mt-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-sm text-white/90">{t.online}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-white/80 transition-colors p-1 rounded hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
        {!mounted ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            در حال بارگذاری...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {t.noMessages}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} locale={locale} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 space-x-reverse text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm">{t.typing}</span>
            <div className="flex space-x-1 space-x-reverse">
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 space-x-reverse">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
