# إعداد Paymob للدفع الحقيقي

## خطوات الإعداد في لوحة تحكم Paymob

### 1. تسجيل الدخول إلى Paymob
- ادخل على [https://accept.paymob.com](https://accept.paymob.com)
- سجل دخولك أو أنشئ حساب جديد

### 2. الحصول على المفاتيح
- اذهب إلى **Settings** > **API Keys**
- انسخ المفاتيح التالية:
  - `API Key` 
  - `Secret Key` (لـ HMAC)
  - `Public Key`

### 3. إعداد Payment Integration
- اذهب إلى **Developers** > **Payment Integrations**
- اختر **Card Payment**
- انسخ `Integration ID`
- انسخ `iFrame ID`

### 4. إعداد Callback URLs
في إعدادات Payment Integration، أضف:

**Transaction Processed Callback (Server-to-Server):**
```
https://your-domain.com/api/webhook
```

**Transaction Response Callback (Browser Redirect):**
```
https://your-domain.com/payment-success
```

### 5. تحديث متغيرات البيئة
في ملف `.env.local`:

```bash
# Paymob Configuration
PAYMOB_API_KEY=your_actual_api_key_here
PAYMOB_INTEGRATION_ID=your_integration_id_here
PAYMOB_IFRAME_ID=your_iframe_id_here
PAYMOB_HMAC_SECRET=your_hmac_secret_here

# Site URL (مهم للـ callbacks)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## اختبار الدفع

### بطاقات اختبار Paymob:
- **Visa**: 4111111111111111
- **Mastercard**: 5123456789012346
- **CVV**: 123
- **Expiry**: أي تاريخ مستقبلي

### تفعيل الحساب للإنتاج:
- تواصل مع فريق Paymob لتفعيل الحساب
- قدم المستندات المطلوبة
- انتظر الموافقة قبل استقبال دفعات حقيقية

## الأمان

### HMAC Validation
- تأكد من تفعيل HMAC validation في webhook
- هذا يضمن أن الـ callbacks تأتي من Paymob فعلاً

### SSL Certificate
- تأكد من وجود SSL على موقعك
- Paymob يتطلب HTTPS للـ callbacks

## استكشاف الأخطاء

### خطأ 404 في iFrame:
- تأكد من صحة `PAYMOB_IFRAME_ID`
- تأكد من تفعيل Payment Integration

### فشل Webhook:
- تأكد من إمكانية الوصول لـ `/api/webhook`
- تحقق من HMAC validation
- راجع logs الخادم

### مشاكل التوجيه:
- تأكد من صحة `NEXT_PUBLIC_SITE_URL`
- تحقق من إعداد Callback URLs في Paymob

## الدعم
- للمساعدة: support@paymob.com
- التوثيق: https://developers.paymob.com