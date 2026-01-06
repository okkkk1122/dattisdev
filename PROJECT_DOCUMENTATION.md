# 📋 مستندات کامل پروژه Enterprise Website

## 🎯 1. ویژگی‌های کلی سایت

### 1.1 ویژگی‌های اصلی
- ✅ سیستم چندزبانه بومی (فارسی، انگلیسی، عربی)
- ✅ چت آنلاین Real-time
- ✅ سیستم تیکتینگ پیشرفته
- ✅ پنل مدیریت کامل (Admin Panel)
- ✅ پنل کاربری (User Dashboard)
- ✅ طراحی Responsive (موبایل، تبلت، دسکتاپ)
- ✅ انیمیشن‌های جذاب و مدرن
- ✅ SEO بهینه
- ✅ امنیت بالا
- ✅ Performance بالا

### 1.2 لینک‌های اجتماعی
- واتساپ (WhatsApp)
- تلگرام (Telegram)
- اینستاگرام (Instagram)
- نمایش در دسکتاپ: Sidebar یا Footer
- نمایش در موبایل: منوی همبرگر

---

## 📄 2. ساختار صفحات و اجزای هر صفحه

### 2.1 صفحه اصلی (Home Page)
**مسیر:** `/` یا `/fa`, `/en`, `/ar`

**اجزا:**
- Hero Section (با انیمیشن parallax)
  - عنوان اصلی با انیمیشن تایپ
  - توضیحات
  - دکمه‌های CTA
  - تصویر/ویدیو پس‌زمینه
- بخش ویژگی‌ها (Features)
  - کارت‌های ویژگی با انیمیشن hover
  - آیکون‌های متحرک
- بخش آمار (Statistics)
  - شمارنده‌های متحرک
  - نمودارهای انیمیشنی
- بخش خدمات (Services)
  - کارت‌های خدمات با انیمیشن
- بخش درباره ما (About Us Preview)
  - تصویر تیم
  - توضیحات کوتاه
- بخش نظرات مشتریان (Testimonials)
  - اسلایدر کارت‌های نظرات
  - انیمیشن fade in
- بخش بلاگ (Blog Preview)
  - آخرین مقالات
  - کارت‌های مقاله
- بخش تماس (Contact Preview)
  - فرم تماس سریع
  - نقشه (اگر نیاز باشد)
- Footer
  - لینک‌های مفید
  - لینک‌های اجتماعی
  - اطلاعات تماس
  - فرم عضویت در خبرنامه

### 2.2 صفحه درباره ما (About Us)
**مسیر:** `/about` یا `/fa/about`, `/en/about`, `/ar/about`

**اجزا:**
- Hero Section
  - عنوان صفحه
  - Breadcrumb
- بخش تاریخچه (History Timeline)
  - Timeline انیمیشنی
- بخش تیم (Our Team)
  - کارت‌های اعضای تیم
  - انیمیشن hover
- بخش ارزش‌ها (Our Values)
  - کارت‌های ارزش‌ها
- بخش ماموریت و چشم‌انداز (Mission & Vision)
  - دو ستون با انیمیشن
- بخش آمار (Statistics)
  - شمارنده‌های متحرک
- بخش گواهینامه‌ها (Certifications)
  - لوگوهای گواهینامه‌ها

### 2.3 صفحه خدمات (Services)
**مسیر:** `/services` یا `/services/[slug]`

**اجزا:**
- صفحه لیست خدمات:
  - فیلتر خدمات
  - کارت‌های خدمات با انیمیشن
  - Pagination
- صفحه جزئیات خدمت:
  - Hero Section
  - توضیحات کامل
  - ویژگی‌های خدمت
  - گالری تصاویر
  - فرم درخواست خدمت
  - خدمات مرتبط

### 2.4 صفحه محصولات (Products) - اختیاری
**مسیر:** `/products` یا `/products/[slug]`

**اجزا:**
- صفحه لیست محصولات:
  - فیلتر و جستجو
  - کارت‌های محصول
  - Pagination
- صفحه جزئیات محصول:
  - گالری تصاویر
  - توضیحات
  - مشخصات فنی
  - قیمت
  - دکمه خرید/درخواست

### 2.5 صفحه بلاگ (Blog)
**مسیر:** `/blog` یا `/blog/[slug]`

**اجزا:**
- صفحه لیست مقالات:
  - فیلتر بر اساس دسته‌بندی
  - جستجو
  - کارت‌های مقاله
  - Pagination
  - Sidebar:
    - آخرین مقالات
    - دسته‌بندی‌ها
    - تگ‌های محبوب
- صفحه جزئیات مقاله:
  - تصویر شاخص
  - عنوان
  - اطلاعات نویسنده و تاریخ
  - محتوای مقاله
  - تگ‌ها
  - بخش نظرات
  - مقالات مرتبط
  - Sidebar

### 2.6 صفحه تماس با ما (Contact)
**مسیر:** `/contact`

**اجزا:**
- Hero Section
- بخش اطلاعات تماس:
  - آدرس
  - تلفن
  - ایمیل
  - ساعات کاری
  - لینک‌های اجتماعی
- فرم تماس:
  - نام
  - ایمیل
  - موضوع
  - پیام
  - فایل پیوست (اختیاری)
  - دکمه ارسال
- نقشه (Google Maps یا OpenStreetMap)
- بخش FAQ (سوالات متداول)

### 2.7 صفحه ورود/ثبت‌نام (Auth)
**مسیر:** `/login`, `/register`, `/forgot-password`, `/reset-password`

**اجزا:**
- فرم ورود:
  - ایمیل/نام کاربری
  - رمز عبور
  - چک‌باکس "مرا به خاطر بسپار"
  - لینک فراموشی رمز
  - دکمه ورود
  - لینک ثبت‌نام
- فرم ثبت‌نام:
  - نام
  - نام خانوادگی
  - ایمیل
  - رمز عبور
  - تکرار رمز عبور
  - چک‌باکس قوانین
  - دکمه ثبت‌نام
- فرم فراموشی رمز:
  - ایمیل
  - دکمه ارسال لینک بازیابی

### 2.8 پنل کاربری (User Dashboard)
**مسیر:** `/dashboard`

**اجزا:**
- Sidebar:
  - منوی ناوبری
  - اطلاعات کاربر
  - دکمه خروج
- داشبورد اصلی:
  - آمار شخصی
  - آخرین فعالیت‌ها
  - اعلان‌ها
- پروفایل:
  - ویرایش اطلاعات شخصی
  - تغییر رمز عبور
  - آپلود تصویر پروفایل
- تیکت‌های من:
  - لیست تیکت‌ها
  - ایجاد تیکت جدید
  - جزئیات تیکت
  - چت تیکت
- تنظیمات:
  - تنظیمات اعلان‌ها
  - تنظیمات حریم خصوصی

### 2.9 پنل مدیریت (Admin Panel)
**مسیر:** `/admin`

**اجزا:**
- Sidebar:
  - منوی مدیریت
  - آمار کلی
- داشبورد:
  - نمودارهای آماری
  - آمار کاربران
  - آمار تیکت‌ها
  - آمار محتوا
  - فعالیت‌های اخیر
- مدیریت کاربران:
  - لیست کاربران
  - افزودن/ویرایش/حذف
  - تغییر نقش
  - فعال/غیرفعال کردن
- مدیریت محتوا:
  - مقالات (Blog)
  - صفحات (Pages)
  - خدمات (Services)
  - محصولات (Products)
  - دسته‌بندی‌ها
- مدیریت تیکت‌ها:
  - لیست تمام تیکت‌ها
  - فیلتر بر اساس وضعیت
  - پاسخ به تیکت
  - تغییر وضعیت
- مدیریت چت:
  - لیست چت‌های فعال
  - مدیریت اپراتورها
- مدیریت تنظیمات:
  - تنظیمات عمومی سایت
  - تنظیمات SEO
  - تنظیمات ایمیل
  - مدیریت زبان‌ها و ترجمه‌ها
  - مدیریت منوها
  - مدیریت لینک‌های اجتماعی
  - مدیریت اسلایدرها
  - مدیریت گالری
- مدیریت اعلان‌ها:
  - ارسال اعلان به کاربران
  - تاریخچه اعلان‌ها

### 2.10 سیستم چت آنلاین
**اجزا:**
- ویجت چت (شناور در گوشه صفحه)
- پنل چت:
  - لیست چت‌ها
  - پنجره چت
  - ارسال پیام
  - ارسال فایل
  - تایپینگ indicator
  - وضعیت آنلاین/آفلاین
- پنل اپراتور (برای ادمین):
  - لیست چت‌های فعال
  - تخصیص به اپراتور
  - تاریخچه چت‌ها

### 2.11 سیستم تیکتینگ
**اجزا:**
- ایجاد تیکت:
  - انتخاب دسته‌بندی
  - عنوان
  - اولویت
  - توضیحات
  - فایل پیوست
- لیست تیکت‌ها:
  - فیلتر بر اساس وضعیت
  - جستجو
  - مرتب‌سازی
- جزئیات تیکت:
  - اطلاعات تیکت
  - تاریخچه پیام‌ها
  - ارسال پاسخ
  - تغییر وضعیت
  - افزودن فایل

---

## 🏗️ 3. معماری فنی

### 3.1 Frontend
**تکنولوژی‌ها:**
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS Modules
- **Animation:** Framer Motion + GSAP
- **State Management:** Zustand + React Query
- **i18n:** next-intl
- **Forms:** React Hook Form + Zod
- **UI Components:** Shadcn/ui + Radix UI
- **Icons:** Lucide React
- **Charts:** Recharts
- **Real-time:** Socket.io Client

**ساختار Frontend:**
```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Home)
│   │   ├── about/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── register/
│   │   └── dashboard/
│   ├── admin/
│   └── api/
├── components/
│   ├── common/
│   ├── layout/
│   ├── features/
│   └── admin/
├── lib/
│   ├── i18n/
│   ├── api/
│   ├── utils/
│   └── hooks/
├── public/
│   ├── images/
│   ├── icons/
│   └── locales/
├── styles/
└── types/
```

### 3.2 Backend
**تکنولوژی‌ها:**
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Cache:** Redis
- **ORM:** TypeORM
- **Authentication:** JWT + Passport
- **File Upload:** Multer + Cloud Storage (اختیاری)
- **Real-time:** Socket.io
- **Email:** Nodemailer
- **Validation:** class-validator + class-transformer
- **API Documentation:** Swagger

**ساختار Backend:**
```
backend/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/
│   ├── database/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── content/
│   │   ├── tickets/
│   │   ├── chat/
│   │   ├── notifications/
│   │   └── admin/
│   └── shared/
├── test/
└── docker/
```

### 3.3 Database Schema
**جداول اصلی:**
- users (کاربران)
- roles (نقش‌ها)
- permissions (دسترسی‌ها)
- pages (صفحات)
- posts (مقالات)
- categories (دسته‌بندی‌ها)
- tags (تگ‌ها)
- services (خدمات)
- products (محصولات)
- tickets (تیکت‌ها)
- ticket_messages (پیام‌های تیکت)
- chats (چت‌ها)
- chat_messages (پیام‌های چت)
- notifications (اعلان‌ها)
- settings (تنظیمات)
- translations (ترجمه‌ها)
- menus (منوها)
- social_links (لینک‌های اجتماعی)
- media (فایل‌ها)

### 3.4 Docker
**سرویس‌ها:**
- Frontend (Next.js)
- Backend (NestJS)
- PostgreSQL
- Redis
- Nginx (Reverse Proxy)

---

## ✅ 4. چک‌لیست نهایی امکانات

### 4.1 ویژگی‌های عمومی
- [x] سیستم چندزبانه (فارسی، انگلیسی، عربی)
- [x] طراحی Responsive
- [x] SEO بهینه
- [x] Performance بهینه
- [x] امنیت بالا
- [x] انیمیشن‌های جذاب

### 4.2 صفحات عمومی
- [x] صفحه اصلی
- [x] درباره ما
- [x] خدمات
- [x] بلاگ
- [x] تماس با ما
- [x] ورود/ثبت‌نام

### 4.3 سیستم کاربری
- [x] ثبت‌نام
- [x] ورود
- [x] بازیابی رمز عبور
- [x] پنل کاربری
- [x] پروفایل کاربر
- [x] تغییر رمز عبور

### 4.4 سیستم تیکتینگ
- [x] ایجاد تیکت
- [x] مشاهده تیکت‌ها
- [x] پاسخ به تیکت
- [x] فایل پیوست
- [x] تغییر وضعیت
- [x] اعلان‌های تیکت

### 4.5 سیستم چت آنلاین
- [x] ویجت چت
- [x] چت Real-time
- [x] ارسال فایل
- [x] تایپینگ indicator
- [x] مدیریت اپراتورها
- [x] تاریخچه چت

### 4.6 پنل مدیریت
- [x] داشبورد
- [x] مدیریت کاربران
- [x] مدیریت محتوا
- [x] مدیریت تیکت‌ها
- [x] مدیریت چت
- [x] مدیریت تنظیمات
- [x] مدیریت زبان‌ها
- [x] مدیریت منوها
- [x] مدیریت لینک‌های اجتماعی

### 4.7 لینک‌های اجتماعی
- [x] واتساپ
- [x] تلگرام
- [x] اینستاگرام
- [x] نمایش در دسکتاپ
- [x] نمایش در موبایل (منوی همبرگر)

---

## 🗺️ 5. Roadmap ساخت مرحله‌به‌مرحله

### فاز 1: راه‌اندازی پایه (Week 1)
1. ایجاد ساختار پروژه
2. راه‌اندازی Next.js + TypeScript
3. راه‌اندازی NestJS + PostgreSQL
4. راه‌اندازی Docker
5. راه‌اندازی i18n (سه زبان)
6. طراحی Layout اصلی

### فاز 2: صفحات عمومی (Week 2)
1. صفحه اصلی با تمام بخش‌ها
2. صفحه درباره ما
3. صفحه خدمات
4. صفحه بلاگ
5. صفحه تماس با ما
6. Header و Footer

### فاز 3: سیستم احراز هویت (Week 3)
1. ثبت‌نام
2. ورود
3. بازیابی رمز عبور
4. JWT Authentication
5. Role-based Access Control

### فاز 4: پنل کاربری (Week 4)
1. داشبورد کاربر
2. پروفایل
3. سیستم تیکتینگ (قسمت کاربر)
4. تنظیمات کاربر

### فاز 5: سیستم چت آنلاین (Week 5)
1. Socket.io Setup
2. ویجت چت
3. پنل چت کاربر
4. پنل مدیریت چت
5. Real-time messaging

### فاز 6: پنل مدیریت (Week 6)
1. داشبورد ادمین
2. مدیریت کاربران
3. مدیریت محتوا
4. مدیریت تیکت‌ها
5. مدیریت چت
6. مدیریت تنظیمات

### فاز 7: انیمیشن‌ها و UI/UX (Week 7)
1. انیمیشن‌های Framer Motion
2. انیمیشن‌های GSAP
3. بهبود UI/UX
4. Responsive Design کامل

### فاز 8: بهینه‌سازی و تست (Week 8)
1. بهینه‌سازی Performance
2. SEO
3. تست‌های امنیتی
4. تست‌های عملکرد
5. رفع باگ‌ها

---

## 📁 6. ساختار دقیق فایل‌ها و لینک‌ها

### 6.1 ساختار کامل Frontend
```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx                    # Layout اصلی با i18n
│   │   ├── page.tsx                      # صفحه اصلی (/)
│   │   ├── about/
│   │   │   └── page.tsx                  # درباره ما (/about)
│   │   ├── services/
│   │   │   ├── page.tsx                  # لیست خدمات (/services)
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # جزئیات خدمت (/services/[slug])
│   │   ├── products/
│   │   │   ├── page.tsx                  # لیست محصولات (/products)
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # جزئیات محصول (/products/[slug])
│   │   ├── blog/
│   │   │   ├── page.tsx                  # لیست مقالات (/blog)
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # جزئیات مقاله (/blog/[slug])
│   │   ├── contact/
│   │   │   └── page.tsx                  # تماس با ما (/contact)
│   │   ├── login/
│   │   │   └── page.tsx                  # ورود (/login)
│   │   ├── register/
│   │   │   └── page.tsx                  # ثبت‌نام (/register)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                  # فراموشی رمز (/forgot-password)
│   │   ├── reset-password/
│   │   │   └── page.tsx                  # بازیابی رمز (/reset-password)
│   │   └── dashboard/
│   │       ├── layout.tsx                # Layout داشبورد
│   │       ├── page.tsx                  # داشبورد اصلی (/dashboard)
│   │       ├── profile/
│   │       │   └── page.tsx              # پروفایل (/dashboard/profile)
│   │       ├── tickets/
│   │       │   ├── page.tsx              # لیست تیکت‌ها (/dashboard/tickets)
│   │       │   ├── new/
│   │       │   │   └── page.tsx          # تیکت جدید (/dashboard/tickets/new)
│   │       │   └── [id]/
│   │       │       └── page.tsx          # جزئیات تیکت (/dashboard/tickets/[id])
│   │       └── settings/
│   │           └── page.tsx              # تنظیمات (/dashboard/settings)
│   ├── admin/
│   │   ├── layout.tsx                    # Layout ادمین
│   │   ├── page.tsx                      # داشبورد ادمین (/admin)
│   │   ├── users/
│   │   │   ├── page.tsx                  # مدیریت کاربران (/admin/users)
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx              # ویرایش کاربر (/admin/users/[id])
│   │   │   └── new/
│   │   │       └── page.tsx              # کاربر جدید (/admin/users/new)
│   │   ├── content/
│   │   │   ├── posts/
│   │   │   │   ├── page.tsx              # مدیریت مقالات (/admin/content/posts)
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx          # مقاله جدید
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx          # ویرایش مقاله
│   │   │   ├── pages/
│   │   │   │   └── page.tsx              # مدیریت صفحات
│   │   │   ├── services/
│   │   │   │   └── page.tsx              # مدیریت خدمات
│   │   │   └── categories/
│   │   │       └── page.tsx              # مدیریت دسته‌بندی‌ها
│   │   ├── tickets/
│   │   │   ├── page.tsx                  # مدیریت تیکت‌ها (/admin/tickets)
│   │   │   └── [id]/
│   │   │       └── page.tsx              # جزئیات تیکت (/admin/tickets/[id])
│   │   ├── chat/
│   │   │   └── page.tsx                  # مدیریت چت (/admin/chat)
│   │   └── settings/
│   │       ├── page.tsx                  # تنظیمات (/admin/settings)
│   │       ├── general/
│   │       │   └── page.tsx              # تنظیمات عمومی
│   │       ├── seo/
│   │       │   └── page.tsx              # تنظیمات SEO
│   │       ├── languages/
│   │       │   └── page.tsx              # مدیریت زبان‌ها
│   │       └── social/
│   │           └── page.tsx              # لینک‌های اجتماعی
│   └── api/
│       └── auth/
│           └── route.ts                  # API Routes
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileMenu.tsx
│   │   └── SocialLinks.tsx
│   ├── features/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── StatisticsSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── BlogPreviewSection.tsx
│   │   ├── chat/
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   └── ChatMessage.tsx
│   │   ├── tickets/
│   │   │   ├── TicketList.tsx
│   │   │   ├── TicketCard.tsx
│   │   │   ├── TicketForm.tsx
│   │   │   └── TicketDetail.tsx
│   │   └── blog/
│   │       ├── PostCard.tsx
│   │       ├── PostList.tsx
│   │       └── PostDetail.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── UserTable.tsx
│       ├── ContentEditor.tsx
│       └── DashboardStats.tsx
├── lib/
│   ├── i18n/
│   │   ├── config.ts
│   │   └── messages/
│   │       ├── fa.json
│   │       ├── en.json
│   │       └── ar.json
│   ├── api/
│   │   ├── client.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── content.ts
│   │   ├── tickets.ts
│   │   └── chat.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── validation.ts
│   └── hooks/
│       ├── useAuth.ts
│       ├── useChat.ts
│       ├── useTickets.ts
│       └── useSocket.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── locales/
├── styles/
│   ├── globals.css
│   └── animations.css
├── types/
│   ├── index.ts
│   ├── user.ts
│   ├── content.ts
│   ├── ticket.ts
│   └── chat.ts
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### 6.2 ساختار کامل Backend
```
backend/
├── src/
│   ├── main.ts                           # Entry point
│   ├── app.module.ts                     # Root module
│   ├── common/
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   ├── public.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   ├── transform.interceptor.ts
│   │   │   └── logging.interceptor.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   ├── database/
│   │   ├── migrations/
│   │   └── seeds/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   └── dto/
│   │   │       ├── login.dto.ts
│   │   │       ├── register.dto.ts
│   │   │       └── reset-password.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   ├── content/
│   │   │   ├── content.module.ts
│   │   │   ├── posts/
│   │   │   │   ├── posts.controller.ts
│   │   │   │   ├── posts.service.ts
│   │   │   │   └── entities/
│   │   │   │       └── post.entity.ts
│   │   │   ├── pages/
│   │   │   │   ├── pages.controller.ts
│   │   │   │   ├── pages.service.ts
│   │   │   │   └── entities/
│   │   │   │       └── page.entity.ts
│   │   │   ├── services/
│   │   │   │   └── ...
│   │   │   └── categories/
│   │   │       └── ...
│   │   ├── tickets/
│   │   │   ├── tickets.module.ts
│   │   │   ├── tickets.controller.ts
│   │   │   ├── tickets.service.ts
│   │   │   ├── entities/
│   │   │   │   ├── ticket.entity.ts
│   │   │   │   └── ticket-message.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-ticket.dto.ts
│   │   │       └── update-ticket.dto.ts
│   │   ├── chat/
│   │   │   ├── chat.module.ts
│   │   │   ├── chat.controller.ts
│   │   │   ├── chat.service.ts
│   │   │   ├── chat.gateway.ts          # Socket.io Gateway
│   │   │   ├── entities/
│   │   │   │   ├── chat.entity.ts
│   │   │   │   └── chat-message.entity.ts
│   │   │   └── dto/
│   │   │       └── send-message.dto.ts
│   │   ├── notifications/
│   │   │   ├── notifications.module.ts
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   └── entities/
│   │   │       └── notification.entity.ts
│   │   ├── admin/
│   │   │   ├── admin.module.ts
│   │   │   ├── admin.controller.ts
│   │   │   └── admin.service.ts
│   │   └── settings/
│   │       ├── settings.module.ts
│   │       ├── settings.controller.ts
│   │       ├── settings.service.ts
│   │       └── entities/
│   │           └── setting.entity.ts
│   └── shared/
│       ├── interfaces/
│       └── types/
├── test/
├── docker/
│   └── Dockerfile
├── .env
├── .env.example
├── nest-cli.json
├── tsconfig.json
├── package.json
└── docker-compose.yml
```

### 6.3 ساختار Docker
```
docker/
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── frontend/
│   └── Dockerfile
└── backend/
    └── Dockerfile
```

---

## 🔗 7. لینک‌های صفحات (Routes)

### 7.1 صفحات عمومی
- `/` یا `/fa` - صفحه اصلی (فارسی)
- `/en` - صفحه اصلی (انگلیسی)
- `/ar` - صفحه اصلی (عربی)
- `/[locale]/about` - درباره ما
- `/[locale]/services` - لیست خدمات
- `/[locale]/services/[slug]` - جزئیات خدمت
- `/[locale]/products` - لیست محصولات
- `/[locale]/products/[slug]` - جزئیات محصول
- `/[locale]/blog` - لیست مقالات
- `/[locale]/blog/[slug]` - جزئیات مقاله
- `/[locale]/contact` - تماس با ما
- `/[locale]/login` - ورود
- `/[locale]/register` - ثبت‌نام
- `/[locale]/forgot-password` - فراموشی رمز
- `/[locale]/reset-password` - بازیابی رمز

### 7.2 صفحات کاربری
- `/[locale]/dashboard` - داشبورد کاربر
- `/[locale]/dashboard/profile` - پروفایل
- `/[locale]/dashboard/tickets` - لیست تیکت‌ها
- `/[locale]/dashboard/tickets/new` - تیکت جدید
- `/[locale]/dashboard/tickets/[id]` - جزئیات تیکت
- `/[locale]/dashboard/settings` - تنظیمات

### 7.3 صفحات مدیریت
- `/admin` - داشبورد ادمین
- `/admin/users` - مدیریت کاربران
- `/admin/users/new` - کاربر جدید
- `/admin/users/[id]` - ویرایش کاربر
- `/admin/content/posts` - مدیریت مقالات
- `/admin/content/posts/new` - مقاله جدید
- `/admin/content/posts/[id]` - ویرایش مقاله
- `/admin/content/pages` - مدیریت صفحات
- `/admin/content/services` - مدیریت خدمات
- `/admin/content/categories` - مدیریت دسته‌بندی‌ها
- `/admin/tickets` - مدیریت تیکت‌ها
- `/admin/tickets/[id]` - جزئیات تیکت
- `/admin/chat` - مدیریت چت
- `/admin/settings` - تنظیمات
- `/admin/settings/general` - تنظیمات عمومی
- `/admin/settings/seo` - تنظیمات SEO
- `/admin/settings/languages` - مدیریت زبان‌ها
- `/admin/settings/social` - لینک‌های اجتماعی

---

## 🎨 8. جزئیات طراحی و انیمیشن

### 8.1 انیمیشن‌های مورد استفاده
- **Hero Section:** Parallax scrolling, Typewriter effect
- **Cards:** Hover effects, Scale animations
- **Statistics:** Counter animations
- **Timeline:** Scroll-triggered animations
- **Forms:** Input focus animations
- **Buttons:** Ripple effects, Hover states
- **Page Transitions:** Fade in/out, Slide transitions
- **Loading:** Skeleton loaders, Spinners
- **Notifications:** Toast animations
- **Chat:** Message slide-in animations
- **Menu:** Hamburger animation, Slide menu

### 8.2 رنگ‌بندی
- Primary: آبی مدرن (#3B82F6)
- Secondary: بنفش (#8B5CF6)
- Success: سبز (#10B981)
- Warning: زرد (#F59E0B)
- Error: قرمز (#EF4444)
- Dark: خاکستری تیره (#1F2937)
- Light: خاکستری روشن (#F9FAFB)

### 8.3 Typography
- فارسی: Vazir, Tahoma
- انگلیسی: Inter, Roboto
- عربی: Cairo, Tajawal

---

این مستندات کامل است و آماده شروع پیاده‌سازی می‌باشد! 🚀



