import { useState } from 'react'
import OrderForm from './OrderForm'
import FAQ from './FAQ'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-arabic" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <a href="/home" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
              ← العودة للصفحة الرئيسية
            </a>
            <h1 className="text-xl md:text-2xl font-bold text-center text-gray-800">
              📚 كتاب رحلة الانتشار - دليل النجاح على تيك توك
            </h1>
            <div className="w-32"></div> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            🚀 اكتشف أسرار النجاح<br />على تيك توك
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            دليل شامل يحتوي على استراتيجيات مؤكدة لبناء جمهور كبير وتحقيق الربح من تيك توك
            <br />مع خبرات عملية من خبراء المجال
          </p>

          {/* Price Highlight */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl mb-8 max-w-md mx-auto shadow-lg">
            <p className="text-2xl lg:text-3xl font-bold text-gray-900">💰 السعر: 200 جنيه مصري فقط</p>
            <p className="text-sm text-gray-700 mt-2">بدلاً من 500 جنيه - عرض محدود!</p>
          </div>

          <a href="#order" className="btn-primary inline-block text-xl">
            🛒 احصل علي نسختك الآن
          </a>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            🎯 ماذا ستتعلم في هذا الكتاب؟
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card">
              <div className="text-4xl mb-4">📝</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">استراتيجيات المحتوى</h4>
              <p className="text-gray-600">تعلم كيفية إنشاء محتوى جذاب يحصل على ملايين المشاهدات ويجذب المتابعين</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">👥</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">بناء الجمهور</h4>
              <p className="text-gray-600">أسرار زيادة المتابعين والتفاعل مع المحتوى الخاص بك بطرق طبيعية</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">💎</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">تحقيق الربح</h4>
              <p className="text-gray-600">طرق مختلفة لتحويل شهرتك على تيك توك إلى دخل مالي ثابت</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">تحليل الأداء</h4>
              <p className="text-gray-600">فهم الإحصائيات وتحليل أداء المحتوى لتحسين النتائج</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🎬</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">إنتاج الفيديوهات</h4>
              <p className="text-gray-600">تقنيات التصوير والمونتاج البسيطة لإنتاج محتوى احترافي</p>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🔥</div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">الترندات والتوقيت</h4>
              <p className="text-gray-600">كيفية اصطياد الترندات والنشر في الأوقات المناسبة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            🎯 هذا الكتاب مناسب لك إذا كنت
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-2xl">✅</div>
              <p className="text-lg">مبتدئ في عالم تيك توك وتريد البدء بالطريقة الصحيحة</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-2xl">✅</div>
              <p className="text-lg">لديك حساب ولكن لا تحصل على النتائج المرجوة</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-2xl">✅</div>
              <p className="text-lg">تريد تحويل هوايتك إلى مصدر دخل</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-2xl">✅</div>
              <p className="text-lg">صاحب مشروع وتريد التسويق عبر تيك توك</p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section - New Layout */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50" id="order">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              احصل على نسختك الآن بخطوتين فقط
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              عملية الشراء سريعة وآمنة. اتبع الخطوات أدناه لتحصل على الكتاب فوراً.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Step 1: Payment */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl ml-4">1</div>
                <h4 className="text-2xl font-bold text-gray-900">إتمام عملية الدفع</h4>
              </div>
              <p className="text-gray-600 mb-6">
                اضغط على الزر أدناه لإتمام عملية الدفع الآمنة عبر Paymob. سيتم فتح صفحة الدفع في نافذة جديدة.
              </p>
              <a
                href="https://accept.paymobsolutions.com/standalone?ref=p_LRR2SDNyNGF5enluVDdYVURQdVh5NEdJZz09X1o3d053eGlGMlhCbVBpSytZSVBDS2c9PQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center btn-primary text-lg mb-4"
              >
                💳 ادفع 200 جنيه الآن
              </a>
              <p className="text-sm text-gray-500">
                بعد إتمام الدفع، لا تغلق هذه الصفحة وعد لإكمال الخطوة الثانية.
              </p>
            </div>

            {/* Step 2: Confirmation Form */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl ml-4">2</div>
                <h4 className="text-2xl font-bold text-gray-900">تأكيد طلبك</h4>
              </div>
              <p className="text-gray-600 mb-6">
                بعد الدفع، املأ النموذج أدناه وسنرسل لك الكتاب فوراً على بريدك الإلكتروني.
              </p>
              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">كتاب رحلة الانتشار</h4>
          <p className="text-gray-400 mb-6">دليلك الشامل للنجاح على تيك توك</p>
          <div className="flex justify-center space-x-6 space-x-reverse mb-6">
            <a href="/home" className="text-gray-400 hover:text-white transition-colors">الصفحة الرئيسية</a>
            <a href="/home#services" className="text-gray-400 hover:text-white transition-colors">خدماتنا</a>
            <a href="/home#contact" className="text-gray-400 hover:text-white transition-colors">تواصل معنا</a>
          </div>
          <p className="text-sm text-gray-500">جميع الحقوق محفوظة © 2024 - فريق النجاح الرقمي</p>
        </div>
      </footer>
    </div>
  )
}