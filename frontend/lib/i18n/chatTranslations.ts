import { resolveLocale, type SiteLocale } from './localeHelpers';

export const chatTranslations: Record<
  SiteLocale,
  {
    title: string;
    online: string;
    placeholder: string;
    noMessages: string;
    loading: string;
    typing: string;
    response: string;
    aiResponse: string;
    close: string;
    buttonLabel: string;
    userName: string;
  }
> = {
  fa: {
    title: 'چت آنلاین',
    online: 'آنلاین',
    placeholder: 'پیام خود را بنویسید...',
    noMessages: 'پیامی وجود ندارد',
    loading: 'در حال بارگذاری...',
    typing: 'در حال تایپ...',
    response: 'سلام! من دستیار هوشمند داتیس‌دِو هستم. چطور می‌تونم کمکتون کنم؟',
    aiResponse:
      'ممنون از پیام شما. تیم ما به زودی با شما تماس خواهد گرفت. در صورت نیاز می‌تونید از سیستم تیکتینگ هم استفاده کنید.',
    close: 'بستن',
    buttonLabel: 'چت آنلاین',
    userName: 'کاربر',
  },
  en: {
    title: 'Online Chat',
    online: 'Online',
    placeholder: 'Type your message...',
    noMessages: 'No messages',
    loading: 'Loading...',
    typing: 'Typing...',
    response: "Hello! I'm DattisDev's AI assistant. How can I help you?",
    aiResponse:
      'Thank you for your message. Our team will contact you soon. You can also use our ticketing system if needed.',
    close: 'Close',
    buttonLabel: 'Online Chat',
    userName: 'User',
  },
  ar: {
    title: 'الدردشة عبر الإنترنت',
    online: 'متصل',
    placeholder: 'اكتب رسالتك...',
    noMessages: 'لا توجد رسائل',
    loading: 'جاري التحميل...',
    typing: 'يكتب...',
    response: 'مرحباً! أنا مساعد داتيس ديف الذكي. كيف يمكنني مساعدتك؟',
    aiResponse:
      'شكراً لرسالتك. سيتصل فريقنا بك قريباً. يمكنك أيضاً استخدام نظام التذاكر إذا لزم الأمر.',
    close: 'إغلاق',
    buttonLabel: 'دردشة مباشرة',
    userName: 'مستخدم',
  },
};

export function getChatTranslations(locale: string) {
  return chatTranslations[resolveLocale(locale)];
}

export function getDefaultSessionId(locale: string): string {
  return `default-${resolveLocale(locale)}`;
}

export const ALL_DEFAULT_WELCOMES = new Set(
  (Object.keys(chatTranslations) as SiteLocale[]).map((loc) => chatTranslations[loc].response)
);

export function isDefaultWelcomeMessage(text: string): boolean {
  return ALL_DEFAULT_WELCOMES.has(text);
}
