import { useState } from 'react'

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const services = [
    'تطوير موقع إلكتروني',
    'تصميم هوية بصرية',
    'إنشاء منصة تعليمية',
    'تطوير تطبيق جوال',
    'استشارة تقنية',
    'تسويق رقمي',
    'أخرى'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    }, 2000)
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center text-white mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              لنبدأ مشروعك التالي
            </h2>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              احصل على استشارة مجانية وخطة مفصلة لتحقيق أهدافك الرقمية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-8">تواصل معنا</h3>

              <div className="space-y-6 mb-12">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center ml-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold">واتساب</div>
                    <div className="opacity-80">+201002100785</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center ml-4">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <div className="font-semibold">البريد الإلكتروني</div>
                    <div className="opacity-80">admin@freelanceos.online</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center ml-4">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <div className="font-semibold">ساعات العمل</div>
                    <div className="opacity-80">السبت - الخميس: 9 ص - 6 م</div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4">لماذا تختارنا؟</h4>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-400 ml-3">✓</span>
                    <span>استشارة مجانية لمدة 30 دقيقة</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 ml-3">✓</span>
                    <span>خطة مفصلة مع عرض سعر واضح</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 ml-3">✓</span>
                    <span>ضمان الجودة والالتزام بالمواعيد</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 ml-3">✓</span>
                    <span>دعم مستمر بعد تسليم المشروع</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    شكراً لتواصلك معنا!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    سنتواصل معك خلال 24 ساعة لمناقشة مشروعك
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="اكتب اسمك الكامل"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+201002100785"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      الخدمة المطلوبة
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">اختر الخدمة</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      تفاصيل المشروع
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="أخبرنا عن مشروعك وأهدافك..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                      } text-white shadow-lg`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري الإرسال...
                      </span>
                    ) : (
                      '🚀 احصل على استشارة مجانية'
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    بإرسال هذا النموذج، توافق على سياسة الخصوصية الخاصة بنا
                  </p>


                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}