
import { useState } from 'react'

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: '💻',
      title: 'تطوير المواقع والتطبيقات',
      description: 'تطوير مواقع ويب وتطبيقات جوال حديثة ومتجاوبة',
      features: [
        'مواقع إلكترونية متجاوبة',
        'متاجر إلكترونية',
        'تطبيقات الويب التفاعلية',
        'تطبيقات الجوال',
        'أنظمة إدارة المحتوى',
        'ربط أنظمة الدفع'
      ],
      price: 'من 1500 جنيه',
      duration: '1-4 أسابيع'
    },
    {
      icon: '🎨',
      title: 'التصميم والهوية البصرية',
      description: 'تصميم شعارات وهويات بصرية احترافية تميز علامتك التجارية',
      features: [
        'تصميم الشعارات',
        'الهوية البصرية الكاملة',
        'تصميم المطبوعات',
        'تصميم واجهات المستخدم',
        'تصميم وسائل التواصل الاجتماعي',
        'تصميم العروض التقديمية'
      ],
      price: 'من 800 جنيه',
      duration: '3-7 أيام'
    },
    {
      icon: '📚',
      title: 'التعليم الإلكتروني',
      description: 'إنشاء منصات تعليمية ومحتوى تعليمي رقمي متميز',
      features: [
        'منصات التعليم الإلكتروني',
        'إنتاج الكورسات الرقمية',
        'أنظمة إدارة التعلم (LMS)',
        'محتوى تفاعلي',
        'اختبارات وتقييمات',
        'شهادات إلكترونية'
      ],
      price: 'من 2000 جنيه',
      duration: '1-3 أسابيع'
    },
    {
      icon: '📱',
      title: 'التسويق الرقمي',
      description: 'استراتيجيات تسويق رقمي فعالة لنمو أعمالك',
      features: [
        'إدارة وسائل التواصل الاجتماعي',
        'حملات إعلانية مدفوعة',
        'تحسين محركات البحث (SEO)',
        'التسويق بالمحتوى',
        'تحليل البيانات والإحصائيات',
        'استراتيجيات النمو'
      ],
      price: 'من 1200 جنيه/شهر',
      duration: 'خدمة شهرية'
    }
  ]

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            خدماتنا المتميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم حلولاً شاملة ومتكاملة تساعدك على النجاح في العالم الرقمي
            من التصميم والتطوير إلى التسويق والتعليم الإلكتروني
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services List */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${activeService === index
                    ? 'bg-blue-600 text-white shadow-xl scale-105'
                    : 'bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl'
                  }`}
                onClick={() => setActiveService(index)}
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="text-4xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className={`text-sm ${activeService === index ? 'text-blue-100' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                  </div>
                  <div className={`transform transition-transform duration-300 ${activeService === index ? 'rotate-90' : ''
                    }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 h-fit sticky top-24">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{services[activeService].icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {services[activeService].title}
              </h3>
              <p className="text-gray-600">
                {services[activeService].description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">ما يشمله:</h4>
              <div className="grid grid-cols-1 gap-2">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">السعر</div>
                <div className="text-lg font-bold text-blue-600">{services[activeService].price}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">المدة</div>
                <div className="text-lg font-bold text-green-600">{services[activeService].duration}</div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://wa.me/201002100785"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center"
            >
              طلب الخدمة الآن 🚀
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
