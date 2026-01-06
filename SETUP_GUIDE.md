# 🚀 راهنمای راه‌اندازی پروژه

## پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn
- Docker و Docker Compose (برای راه‌اندازی با Docker)
- PostgreSQL (برای راه‌اندازی دستی)
- Redis (برای راه‌اندازی دستی)

## روش 1: راه‌اندازی با Docker (پیشنهادی)

### 1. کلون کردن پروژه
```bash
git clone <repository-url>
cd dattisdev
```

### 2. ایجاد فایل‌های محیطی
```bash
# در ریشه پروژه
cp .env.example .env

# در پوشه frontend
cd frontend
cp .env.example .env.local

# در پوشه backend
cd ../backend
cp .env.example .env
```

### 3. تنظیم متغیرهای محیطی
فایل `.env` در ریشه پروژه را ویرایش کنید:
```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=enterprise_db
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### 4. راه‌اندازی با Docker
```bash
docker-compose up -d
```

این دستور تمام سرویس‌ها را راه‌اندازی می‌کند:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 5. اجرای Migration ها
```bash
docker exec -it enterprise_backend npm run migration:run
```

## روش 2: راه‌اندازی دستی

### 1. نصب وابستگی‌های Frontend
```bash
cd frontend
npm install
```

### 2. نصب وابستگی‌های Backend
```bash
cd ../backend
npm install
```

### 3. راه‌اندازی PostgreSQL و Redis
PostgreSQL و Redis باید در حال اجرا باشند.

### 4. تنظیم فایل‌های محیطی
فایل‌های `.env` را در frontend و backend تنظیم کنید.

### 5. اجرای Migration ها
```bash
cd backend
npm run migration:run
```

### 6. راه‌اندازی Backend
```bash
cd backend
npm run start:dev
```

### 7. راه‌اندازی Frontend
```bash
cd frontend
npm run dev
```

## دسترسی به سایت

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- API Documentation: http://localhost:3001/api/docs

## زبان‌های پشتیبانی شده

- فارسی: http://localhost:3000/fa
- انگلیسی: http://localhost:3000/en
- عربی: http://localhost:3000/ar

## دستورات مفید

### Docker
```bash
# مشاهده لاگ‌ها
docker-compose logs -f

# توقف سرویس‌ها
docker-compose down

# راه‌اندازی مجدد
docker-compose restart

# مشاهده وضعیت
docker-compose ps
```

### Development
```bash
# Frontend
cd frontend
npm run dev          # توسعه
npm run build        # ساخت
npm run start        # تولید

# Backend
cd backend
npm run start:dev    # توسعه
npm run build        # ساخت
npm run start:prod   # تولید
```

## مشکلات رایج

### مشکل اتصال به دیتابیس
- بررسی کنید PostgreSQL در حال اجرا باشد
- بررسی کنید اطلاعات اتصال در `.env` صحیح باشد

### مشکل پورت در حال استفاده
- پورت 3000، 3001، 5432، 6379 را بررسی کنید
- یا پورت‌ها را در `docker-compose.yml` تغییر دهید

### مشکل CORS
- بررسی کنید `FRONTEND_URL` در backend صحیح باشد

## نکات مهم

1. در محیط Development، TypeORM به صورت خودکار جداول را ایجاد می‌کند
2. در محیط Production، حتماً Migration ها را اجرا کنید
3. فایل `.env` را هرگز commit نکنید
4. برای تولید، حتماً `NODE_ENV=production` تنظیم کنید



