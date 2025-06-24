export default function DigitalProducts() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            منتجاتنا الرقمية
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            منتجات رقمية مصممة بعناية لمساعدتك على النجاح والتميز في مجالك
          </p>
        </div>

        {/* Featured Product Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-purple-100 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Product Image/Icon */}
              <div className="text-center lg:text-right">
                <div className="inline-flex items-center justify-center w-58 h-64 rounded-3xl mb-6 shadow-2xl bg-white">
                  <img src="/book.png" alt="Book" className="w-full h-full object-contain rounded-3xl" />
                </div>
                <div className="space-y-2">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <p className="text-sm text-gray-700">استراتيجيات مؤكدة</p>
                    </div>
                  </div>



                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      <p className="text-sm text-gray-700">أمثلة عملية</p>
                    </div>
                  </div>


                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📈</span>
                      <p className="text-sm text-gray-700">نتائج مضمونة</p>
                    </div>
                  </div>
                </div>
              </div>




              {/* Product Content */}
              <div>
                <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  🔥 الأكثر مبيعاً
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  رحلة الانتشار
                </h3>
                <p className="text-xl text-purple-600 font-semibold mb-6">
                  دليل النجاح على تيك توك
                </p>

                {/* Product Features */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">٢٧ صفحة من المحتوى القيم</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">استراتيجيات مؤكدة من خبراء المجال</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">أمثلة وحالات دراسة واقعية</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">تحميل فوري بعد الدفع</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">200 جنيه مصري</div>
                    <div className="text-sm text-gray-500 line-through">بدلاً من 500 جنيه</div>
                  </div>
                  <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    وفر 60%
                  </div>
                </div>

                <a
                  href="/book-landing"
                  className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  📚 احصل على نسختك الآن
                </a>


              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Products */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            منتجات قريباً
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">كورس التسويق الرقمي</h4>
              <p className="text-sm text-gray-500">قريباً</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-4">💼</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">دليل ريادة الأعمال</h4>
              <p className="text-sm text-gray-500">قريباً</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">أدوات الإنتاجية</h4>
              <p className="text-sm text-gray-500">قريباً</p>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}