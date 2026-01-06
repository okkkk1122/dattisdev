import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Event system for real-time updates across components
class ChatEventEmitter {
  private listeners: Map<string, Set<Function>> = new Map();

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  emit(event: string, data?: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }
}

export const chatEventEmitter = new ChatEventEmitter();

// Listen to storage changes for real-time updates across tabs/windows
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'dattisdev-chat-storage') {
      chatEventEmitter.emit('storage-update', JSON.parse(e.newValue || '{}'));
    }
  });
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'admin';
  timestamp: Date | string;
  chatId?: string; // For grouping messages by user/session
}

export interface ChatSession {
  id: string;
  userId?: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: Date | string;
  unread: number;
  messages: ChatMessage[];
}

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  addMessage: (sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  createSession: (userName: string, userId?: string) => string;
  getSession: (sessionId: string) => ChatSession | undefined;
  getActiveSession: () => ChatSession | undefined;
  setActiveSession: (sessionId: string) => void;
  markAsRead: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  getOrCreateDefaultSession: () => string;
}

const getDefaultSession = (): ChatSession => ({
  id: 'default',
  userName: 'کاربر عمومی',
  lastMessage: 'سلام! من دستیار هوشمند داتیس‌دِو هستم. چطور می‌تونم کمکتون کنم؟',
  lastMessageTime: new Date().toISOString(),
  unread: 0,
  messages: [
    {
      id: 1,
      text: 'سلام! من دستیار هوشمند داتیس‌دِو هستم. چطور می‌تونم کمکتون کنم؟',
      sender: 'ai',
      timestamp: new Date().toISOString(),
      chatId: 'default',
    },
  ],
});

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [getDefaultSession()],
      activeSessionId: 'default',
      addMessage: (sessionId, message) => {
        const { sessions, activeSessionId } = get();
        const session = sessions.find((s) => s.id === sessionId);
        if (!session) return;

        // Generate unique ID with timestamp and random number to avoid collisions
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now() + Math.random(),
          timestamp: new Date().toISOString(),
          chatId: sessionId,
        };

        const updatedSessions = sessions.map((s) =>
          s.id === sessionId
            ? {
                ...s,
                messages: [...s.messages, newMessage],
                lastMessage: message.text,
                lastMessageTime: new Date().toISOString(),
                unread: s.id === activeSessionId ? 0 : s.unread + 1,
              }
            : s
        );

        set({ sessions: updatedSessions });

        // Emit event for real-time updates across components
        chatEventEmitter.emit('message-added', {
          sessionId,
          message: newMessage,
        });

        // Note: Zustand persist middleware automatically saves to localStorage
        // and Zustand will automatically trigger re-renders in subscribed components
      },
      createSession: (userName, userId) => {
        const sessionId = userId || `session-${Date.now()}`;
        const newSession: ChatSession = {
          id: sessionId,
          userId,
          userName,
          lastMessage: '',
          lastMessageTime: new Date().toISOString(),
          unread: 0,
          messages: [],
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
          activeSessionId: sessionId,
        }));

        return sessionId;
      },
      getSession: (sessionId) => {
        return get().sessions.find((s) => s.id === sessionId);
      },
      getActiveSession: () => {
        const { activeSessionId, sessions } = get();
        return sessions.find((s) => s.id === activeSessionId);
      },
      setActiveSession: (sessionId) => {
        set({ activeSessionId: sessionId });
        // Mark as read when opening
        get().markAsRead(sessionId);
      },
      markAsRead: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, unread: 0 } : s
          ),
        }));
      },
      deleteSession: (sessionId) => {
        const { sessions, activeSessionId } = get();
        const remainingSessions = sessions.filter((s) => s.id !== sessionId);
        const newActiveSessionId =
          activeSessionId === sessionId
            ? remainingSessions.length > 0
              ? remainingSessions[0].id
              : 'default'
            : activeSessionId;
        
        set({
          sessions: remainingSessions,
          activeSessionId: newActiveSessionId,
        });
      },
      getOrCreateDefaultSession: () => {
        const { sessions } = get();
        const defaultSession = sessions.find((s) => s.id === 'default');
        if (defaultSession) return 'default';

        const session = getDefaultSession();
        set((state) => ({
          sessions: [session, ...state.sessions],
          activeSessionId: 'default',
        }));
        return 'default';
      },
    }),
    {
      name: 'dattisdev-chat-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
      skipHydration: false,
    }
  )
);

