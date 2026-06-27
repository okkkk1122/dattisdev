# راهنمای بازگشت به بک‌آپ 1400

این فایل راهنمای بازگشت به وضعیت بک‌آپ 1400 است که قبل از اضافه کردن Testimonials، Pricing و FAQ ایجاد شده است.

## نحوه بازگشت به بک‌آپ 1400

### روش 1: استفاده از Git Tag

```bash
# مشاهده تمام tag ها
git tag -l

# بازگشت به بک‌آپ 1400
git checkout backup-1400

# یا اگر می‌خواهید یک branch جدید ایجاد کنید
git checkout -b restore-backup-1400 backup-1400
```

### روش 2: استفاده از Git Reset (اگر می‌خواهید تغییرات را حذف کنید)

⚠️ **هشدار**: این روش تمام تغییرات بعد از بک‌آپ 1400 را حذف می‌کند!

```bash
# مشاهده commit بک‌آپ 1400
git log --oneline | grep "Backup 1400"

# بازگشت به commit بک‌آپ 1400 (hard reset - تمام تغییرات حذف می‌شود)
git reset --hard backup-1400

# یا اگر می‌خواهید تغییرات را نگه دارید
git reset --soft backup-1400
```

### روش 3: ایجاد Branch جدید از بک‌آپ

```bash
# ایجاد branch جدید از بک‌آپ 1400
git checkout -b backup-1400-restore backup-1400

# حالا می‌توانید این branch را به عنوان branch اصلی استفاده کنید
git checkout master
git merge backup-1400-restore
```

## اطلاعات بک‌آپ 1400

- **تاریخ ایجاد**: قبل از اضافه کردن Testimonials, Pricing, FAQ
- **Tag**: `backup-1400`
- **Commit Message**: "Backup 1400"

## فایل‌های اضافه شده بعد از بک‌آپ 1400

اگر می‌خواهید به بک‌آپ برگردید، این فایل‌ها حذف یا تغییر خواهند کرد:

### Stores جدید:
- `frontend/lib/stores/testimonialsStore.ts`
- `frontend/lib/stores/pricingStore.ts`
- `frontend/lib/stores/faqStore.ts`

### صفحات جدید:
- `frontend/app/[locale]/pricing/page.tsx`
- `frontend/app/[locale]/faq/page.tsx`
- `frontend/app/admin/testimonials/page.tsx`
- `frontend/app/admin/pricing/page.tsx`
- `frontend/app/admin/faq/page.tsx`

### کامپوننت‌های جدید:
- `frontend/components/features/pricing/PricingPage.tsx`
- `frontend/components/features/faq/FAQPage.tsx`
- `frontend/components/admin/TestimonialsAdminPage.tsx`
- `frontend/components/admin/PricingAdminPage.tsx`
- `frontend/components/admin/FAQAdminPage.tsx`

### فایل‌های تغییر یافته:
- `frontend/components/features/home/TestimonialsSection.tsx`
- `frontend/components/admin/AdminSidebar.tsx`
- `frontend/components/layout/Header.tsx`
- `frontend/components/layout/Footer.tsx`

## نکات مهم

1. قبل از بازگشت به بک‌آپ، مطمئن شوید که تمام تغییرات مهم را commit کرده‌اید
2. اگر می‌خواهید تغییرات را نگه دارید، از `git stash` استفاده کنید
3. همیشه قبل از reset، یک backup از وضعیت فعلی بگیرید

## بازگشت به وضعیت فعلی (بعد از بک‌آپ)

اگر به بک‌آپ برگشتید و می‌خواهید دوباره به وضعیت فعلی برگردید:

```bash
# بازگشت به آخرین commit
git checkout master

# یا اگر در branch دیگری هستید
git checkout main
```






