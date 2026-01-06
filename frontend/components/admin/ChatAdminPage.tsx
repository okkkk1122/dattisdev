'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, Send, User, Trash2 } from 'lucide-react';
import { useChatStore, chatEventEmitter } from '@/lib/stores/chatStore';
import { toast } from 'react-hot-toast';
import ChatMessage from '@/components/features/chat/ChatMessage';
import { formatDistanceToNow } from 'date-fns';

export default function ChatAdminPage() {
  const {
    sessions,
    activeSessionId,
    getActiveSession,
    setActiveSession,
    addMessage,
    deleteSession,
    markAsRead,
  } = useChatStore();
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSession = mounted ? getActiveSession() : null;
  const messages = activeSession?.messages || [];

  const filteredSessions = (mounted ? sessions : []).filter((session) =>
    session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  useEffect(() => {
    if (activeSessionId) {
      markAsRead(activeSessionId);
    }
  }, [activeSessionId, markAsRead]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeSession) {
      return;
    }

    addMessage(activeSession.id, {
      text: message,
      sender: 'admin',
    });

    setMessage('');
    toast.success('پیام ارسال شد');
  };

  const handleDeleteSession = (sessionId: string) => {
    if (window.confirm('آیا مطمئن هستید که می‌خواهید این گفتگو را حذف کنید؟')) {
      deleteSession(sessionId);
      toast.success('گفتگو حذف شد');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          مدیریت چت
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مدیریت و پاسخ به پیام‌های کاربران
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Chat List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="جستجو گفتگو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredSessions.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                گفتگویی یافت نشد
              </div>
            ) : (
              filteredSessions.map((session) => (
                <motion.div
                  key={session.id}
                  onClick={() => setActiveSession(session.id)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    activeSessionId === session.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-l-4 border-l-primary-600'
                      : ''
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {session.userName}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {mounted
                          ? formatDistanceToNow(
                              new Date(
                                typeof session.lastMessageTime === 'string'
                                  ? session.lastMessageTime
                                  : session.lastMessageTime
                              ),
                              { addSuffix: true }
                            )
                          : '...'}
                      </p>
                    </div>
                  </div>
                    {mounted && session.unread > 0 && (
                      <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                        {session.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {session.lastMessage}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-xs flex items-center space-x-1 space-x-reverse"
                  >
                    <Trash2 size={14} />
                    <span>حذف</span>
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          {!mounted ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>در حال بارگذاری...</p>
              </div>
            </div>
          ) : activeSession ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{activeSession.userName}</h3>
                      <p className="text-sm text-white/80">
                        {mounted ? `${activeSession.messages.length} پیام` : '...'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                {!mounted ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    در حال بارگذاری...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                    پیامی وجود ندارد
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} locale="fa" />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
                <p>گفتگویی انتخاب نشده است</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
