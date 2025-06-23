const testimonials = [
  {
    name: 'أحمد محمود',
    role: 'مؤسس شركة تكنولوجيا',
    image: '👨‍💼',
    content: 'فريق محترف جداً، ساعدوني في تطوير موقع شركتي وربطه بأنظمة الدفع. النتيجة فاقت توقعاتي بكثير!',
    rating: 5,
    project: 'تطوير موقع إلكتروني'
  },
  {
    name: 'سارة أحمد',
    role: 'مدربة أونلاين',
    image: '👩‍🏫',
    content: 'أنشأوا لي منصة تعليمية رائعة وساعدوني في إنشاء كورساتي الرقمية. زاد دخلي 300% في 6 أشهر!',
    rating: 5,
    project: 'منصة تعليمية'
  },
  {
    name: 'محمد علي',
    role: 'صاحب متجر إلكتروني',
    image: '👨‍💻',
    content: 'تصميم الهوية البصرية وموقع المتجر كان احترافي جداً. معدل التحويل زاد بشكل ملحوظ بعد إطلاق الموقع الجديد.',
    rating: 5,
    project: 'هوية بصرية + متجر إلكتروني'
  },
  {
    name: 'ليلى حسن',
    role: 'مؤثرة على تيك توك',
    image: '👩‍🎤',
    content: 'كتاب "رحلة الانتشار" غير حياتي تماماً! اتبعت الاستراتيجيات وزاد عدد متابعيني من 10 آلاف إلى 500 ألف في 4 أشهر.',
    rating: 5,
    project: 'كتاب رحلة الانتشار'
  },
  {
    name: 'عمر فاروق',
    role: 'رائد أعمال',
    image: '👨‍🚀',
    content: 'الاستشارة المجانية كانت قيمة حقيقية. وضحوا لي الخطة كاملة قبل البدء وسلموا المشروع في الوقت المحدد.',
    rating: 5,
    project: 'استشارة + تطوير تطبيق'
  },
  {
    name: 'نور الدين',
    role: 'مصمم جرافيك',
    image: '👨‍🎨',
    content: 'تعلمت من كورساتهم تقنيات جديدة في التصميم والبرمجة. الآن أقدر أقدم خدمات أفضل لعملائي وزاد دخلي.',
    rating: 5,
    project: 'كورس التصميم والبرمجة'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            آراء حقيقية من عملاء وطلاب استفادوا من خدماتنا ومنتجاتنا الرقمية
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              {/* Stars Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="text-center">
                <div className="text-4xl mb-2">{testimonial.image}</div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500 mb-2">{testimonial.role}</div>
                <div className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {testimonial.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-20 bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">رضا العملاء</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">2000+</div>
              <div className="text-gray-600">كتاب مباع</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">طالب مدرب</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">التزام بالمواعيد</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            هل تريد أن تكون التالي؟
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            انضم إلى مئات العملاء الذين حققوا نجاحات باهرة معنا
          </p>
          <a href="#contact" className="btn-primary text-lg px-8 py-4">
            🚀 ابدأ قصة نجاحك الآن
          </a>
        </div>
      </div>
    </section>
  )
}