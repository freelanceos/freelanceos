import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Download() {
  const router = useRouter()
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { token } = router.query

    if (token) {
      // For demo purposes, all tokens are valid
      // In production, you would validate this against your database
      setIsValid(true)
      setLoading(false)
    }
  }, [router.query])

  const handleDownload = () => {
    // For demo purposes, we'll just show an alert
    // In production, you would serve the actual PDF file
    alert('في الإنتاج، سيتم تحميل الكتاب هنا. هذا مجرد عرض توضيحي.')

    // Example of how you would trigger a download:
    // const link = document.createElement('a')
    // link.href = '/path-to-your-book.pdf'
    // link.download = 'كتاب-رحلة-الانتشار.pdf'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-arabic" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الرابط...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>تحميل الكتاب - رحلة الانتشار</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gray-50 font-arabic" dir="rtl">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            {isValid ? (
              <div className="card">
                <div className="text-6xl mb-6">📚</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  مرحباً بك!
                </h1>
                <p className="text-gray-600 mb-6">
                  يمكنك الآن تحميل كتاب "رحلة الانتشار - دليل النجاح على تيك توك"
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">محتويات الكتاب:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>📝 استراتيجيات المحتوى</li>
                    <li>👥 بناء الجمهور</li>
                    <li>💰 طرق تحقيق الربح</li>
                    <li>📊 تحليل الأداء</li>
                    <li>🎬 إنتاج الفيديوهات</li>
                    <li>🔥 اصطياد الترندات</li>
                  </ul>
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full btn-primary mb-4"
                >
                  📥 تحميل الكتاب (PDF)
                </button>

                <div className="text-xs text-gray-500 mb-6">
                  <p>الملف بصيغة PDF • حجم الملف: 15 MB</p>
                  <p>٢٧ صفحة من المحتوى القيم</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-4">
                    💡 نصيحة: احفظ هذا الرابط للعودة إليه لاحقاً
                  </p>
                  <button
                    onClick={() => router.push('/home')}
                    className="btn-secondary text-sm w-full"
                  >
                    العودة للصفحة الرئيسية
                  </button>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="text-6xl mb-6">🚫</div>
                <h1 className="text-2xl font-bold text-red-600 mb-4">
                  رابط غير صالح
                </h1>
                <p className="text-gray-600 mb-6">
                  الرابط المستخدم غير صحيح أو منتهي الصلاحية.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/book-landing')}
                    className="w-full btn-primary"
                  >
                    شراء الكتاب
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