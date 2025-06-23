import { useState } from 'react'
import Head from 'next/head'

export default function TestPayment() {
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testPaymentFlow = async () => {
    setLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'أحمد محمد (اختبار)',
          email: 'test@example.com',
          phone: '01234567890',
          payment_method: 'card',
          amount_cents: 20000
        }),
      })
      
      const data = await response.json()
      setTestResult(data)
      
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>اختبار عملية الدفع</title>
      </Head>
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                🧪 اختبار عملية الدفع
              </h1>
              <p className="text-gray-600">
                صفحة اختبار للتحقق من سير عملية الدفع والنظام
              </p>
            </div>

            {/* Test Button */}
            <div className="card text-center mb-8">
              <h2 className="text-xl font-bold mb-4">اختبار API الدفع</h2>
              <button
                onClick={testPaymentFlow}
                disabled={loading}
                className={`btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'جاري الاختبار...' : '🚀 اختبار عملية الدفع'}
              </button>
            </div>

            {/* Test Result */}
            {testResult && (
              <div className="card">
                <h3 className="text-lg font-bold mb-4">نتيجة الاختبار:</h3>
                <div className={`p-4 rounded-lg ${testResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <pre className="text-sm overflow-auto" style={{ direction: 'ltr' }}>
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
                
                {testResult.success && testResult.payment_url && (
                  <div className="mt-4">
                    <a
                      href={testResult.payment_url}
                      className="btn-primary block text-center"
                    >
                      🔗 الذهاب لرابط الدفع
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* System Status */}
            <div className="card">
              <h3 className="text-lg font-bold mb-4">حالة النظام:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Supabase Database:</span>
                  <span className="text-orange-600">🟡 وضع التطوير (Mock)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Paymob Payment:</span>
                  <span className="text-orange-600">🟡 وضع التطوير (Mock)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Email Service:</span>
                  <span className="text-orange-600">🟡 وضع التطوير (Mock)</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center mt-8 space-y-4">
              <div className="flex gap-4 justify-center">
                <a href="/home" className="btn-secondary">
                  🏠 الصفحة الرئيسية
                </a>
                <a href="/book-landing" className="btn-secondary">
                  📚 صفحة الكتاب
                </a>
              </div>
              
              <div className="text-sm text-gray-500">
                <p>للانتقال إلى الإنتاج، يجب تكوين:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>متغيرات بيئة Supabase</li>
                  <li>مفاتيح Paymob API</li>
                  <li>مفتاح Resend للإيميل</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}