const services = [
  {
    icon: '💻',
    title: 'البرمجة',
    description: 'تطوير مواقع مخصصة، لوحات تحكم، تكامل مع أنظمة دفع، واستخدام أحدث تقنيات الويب (React, Next.js, Supabase).',
    features: [
      'مواقع ويب احترافية',
      'لوحات تحكم مخصصة',
      'تكامل أنظمة الدفع',
      'تطبيقات متجاوبة',
      'حلول السحابة'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '🎨',
    title: 'التصميم',
    description: 'هويات بصرية، تصميم واجهات (UI/UX)، شعارات احترافية، وصفحات هبوط عالية التحويل.',
    features: [
      'هوية بصرية متكاملة',
      'تصميم UI/UX احترافي',
      'شعارات وعلامات تجارية',
      'صفحات هبوط عالية التحويل',
      'تصميم منشورات السوشيال ميديا'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: '📚',
    title: 'التعليم الرقمي',
    description: 'إنشاء كورسات رقمية، أنظمة إدارة تعلم (LMS)، محتوى تدريبي احترافي، دورات على Notion وTeachable.',
    features: [
      'منصات تعليمية LMS',
      'محتوى تدريبي احترافي',
      'كورسات تفاعلية',
      'شهادات معتمدة',
      'تحليلات تقدم الطلاب'
    ],
    color: 'from-green-500 to-green-600'
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            نقدم حلولًا شاملة ومتطورة تلبي احتياجاتك الرقمية وتساعدك على تحقيق أهدافك
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 hover:border-gray-200">
                {/* Icon & Title */}
                <div className="flex items-center mb-6">
                  <div className="text-4xl ml-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-gradient-to-r rounded-full ml-3 flex-shrink-0" 
                           style={{backgroundImage: `linear-gradient(to right, ${service.color.split(' ')[1]}, ${service.color.split(' ')[3]})`}}></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 bg-gradient-to-r ${service.color} hover:shadow-lg transform hover:scale-105`}>
                  اطلب الخدمة الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            هل تحتاج لحل مخصص؟ دعنا نناقش مشروعك
          </p>
          <a href="#contact" className="btn-primary text-lg px-8 py-4">
            💬 تحدث معنا الآن
          </a>
        </div>
      </div>
    </section>
  )
}