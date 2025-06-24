# إعداد Resend لإرسال الإيميلات

## الخطوات المطلوبة:

### 1. إنشاء حساب Resend
- اذهب إلى [resend.com](https://resend.com)
- أنشئ حساب جديد أو سجل دخول

### 2. إضافة النطاق (Domain)
- في لوحة تحكم Resend، اذهب إلى "Domains"
- أضف النطاق: `freelanceos.online`
- اتبع التعليمات لإضافة DNS records المطلوبة

### 3. الحصول على API Key
- اذهب إلى "API Keys" في لوحة التحكم
- أنشئ API key جديد
- انسخ المفتاح

### 4. إعداد متغيرات البيئة
أضف المتغيرات التالية إلى ملف `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=admin@freelanceos.online
NEXT_PUBLIC_SITE_URL=http://localhost:3002
```

### 5. التحقق من الإعداد
بعد إكمال الخطوات أعلاه:
- أعد تشغيل الخادم: `npm run dev`
- اختبر إرسال الإيميل من خلال نموذج الطلب

## ملاحظات:
- تأكد من أن النطاق `freelanceos.online` مُفعل في Resend
- في حالة التطوير، يمكن استخدام sandbox mode
- للإنتاج، تأكد من إعداد SPF و DKIM records بشكل صحيح

## الإيميلات المُرسلة:
1. **للعميل**: إيميل تأكيد مع رابط تحميل الكتاب
2. **للإدارة**: إشعار بطلب جديد مع تفاصيل العميل (الاسم، الإيميل، رقم الهاتف)
