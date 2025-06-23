import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function PaymentSuccess() {
  const router = useRouter()
  const [paymentData, setPaymentData] = useState(null)

  useEffect(() => {
    // Get payment data from URL parameters
    const { success, amount_cents, id } = router.query
    
    if (success === 'true') {
      setPaymentData({ success: true, amount_cents, transaction_id: id })
    } else {
      setPaymentData({ success: false })
    }
  }, [router.query])

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-arabic" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>تأكيد الدفع - كتاب رحلة الانتشار</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            {paymentData.success ? (
              <div className="card">
                <div className="text-6xl mb-6">✅</div>
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                  تم الدفع بنجاح!
                </h1>
                <p className="text-gray-600 mb-6">
                  شكراً لك! تم تأكيد طلبك وستحصل على رابط التحميل عبر الإيميل خلال دقائق قليلة.
                </p>
                {paymentData.transaction_id && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-sm text-blue-800">
                      رقم المعاملة: {paymentData.transaction_id}
                    </p>
                  </div>
                )}
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/download?token=demo')}
                    className="w-full btn-primary"
                  >
                    📥 تحميل الكتاب الآن
                  </button>
                  <button
                    onClick={() => router.push('/home')}
                    className="w-full btn-secondary"
                  >
                    العودة للصفحة الرئيسية
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="text-6xl mb-6">❌</div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  فشل في الدفع
                </h1>
                <p className="text-gray-600 mb-6">
                  عذراً، حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/book-landing')}
                    className="w-full btn-primary"
                  >
                    المحاولة مرة أخرى
                  </button>
                  <button
                    onClick={() => router.push('/home')}
                    className="w-full btn-secondary"
                  >
                    العودة للصفحة الرئيسية
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}