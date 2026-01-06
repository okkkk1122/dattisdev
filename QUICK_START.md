# ⚡ راهنمای شروع سریع

## 🚀 راه‌اندازی در 3 مرحله

### 1️⃣ نصب وابستگی‌ها

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2️⃣ تنظیم متغیرهای محیطی

```bash
# در ریشه پروژه
cp .env.example .env

# ویرایش فایل .env و تنظیم:
# - DB_USER
# - DB_PASSWORD
# - DB_NAME
# - JWT_SECRET
```

### 3️⃣ راه‌اندازی

#### با Docker (پیشنهادی):
```bash
docker-compose up -d
```

#### بدون Docker:
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## 🌐 دسترسی

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001/api
- **API Docs:** http://localhost:3001/api/docs

## 🌍 زبان‌ها

- فارسی: http://localhost:3000/fa
- انگلیسی: http://localhost:3000/en
- عربی: http://localhost:3000/ar

## ✅ بررسی نصب

1. Frontend باید در http://localhost:3000 باز شود
2. Backend باید در http://localhost:3001/api/docs قابل دسترسی باشد
3. چت ویجت باید در گوشه پایین سمت چپ نمایش داده شود
4. Language Switcher باید در Header کار کند

## 🐛 رفع مشکلات

### پورت در حال استفاده
```bash
# تغییر پورت در docker-compose.yml یا
# استفاده از پورت‌های دیگر
```

### مشکل اتصال به دیتابیس
```bash
# بررسی اجرای PostgreSQL
# بررسی اطلاعات .env
```

### مشکل CORS
```bash
# بررسی FRONTEND_URL در backend/.env
```

---

**برای اطلاعات بیشتر:** `SETUP_GUIDE.md` را مطالعه کنید.



