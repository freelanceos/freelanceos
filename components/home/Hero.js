export default function Hero() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            نحن نساعدك على النجاح<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              في العالم الرقمي
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            فريق متخصص في البرمجة، التصميم، والتعليم الإلكتروني. نقدم حلولًا عملية ومبتكرة 
            تساعد الأفراد والشركات على النمو والتوسع في السوق الرقمي.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#contact" className="btn-primary text-lg px-8 py-4">
              🚀 ابدأ مشروعك الآن
            </a>
            <a href="#services" className="btn-secondary text-lg px-8 py-4">
              🔍 استكشف خدماتنا
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">مشروع منجز</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">5+</div>
              <div className="text-gray-600">سنوات خبرة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">دعم مستمر</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}