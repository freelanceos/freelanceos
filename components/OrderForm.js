import { useState } from 'react'

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    payment_method: 'card'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'الإيميل مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'الإيميل غير صحيح'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^(\+201|01)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح (يجب أن يبدأ بـ 01 أو +201)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Step 1: Save user data to our database first
      const response = await fetch('/api/save-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount_cents: 20000 // 200 EGP in cents
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Step 2: Redirect to the static Paymob payment link
        const staticPaymentLink = "https://accept.paymobsolutions.com/standalone?ref=p_LRR2SDNyNGF5enluVDdYVURQdVh5NEdJZz09X1o3d053eGlGMlhCbVBpSytZSVBDS2c9PQ";
        console.log("Redirecting to static payment link:", staticPaymentLink);
        window.location.href = staticPaymentLink;
      } else {
        alert(data.message || 'حدث خطأ في حفظ الطلب. يرجى المحاولة مرة أخرى.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
            placeholder="أدخل اسمك الكامل"
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            placeholder="example@email.com"
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            رقم الهاتف *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="01xxxxxxxxx"
            disabled={loading}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-2">
            طريقة الدفع
          </label>
          <select
            id="payment_method"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
          >
            <option value="card">بطاقة ائتمان / فيزا / ماستركارد</option>
            <option value="wallet">محفظة إلكترونية</option>
            <option value="instapay">InstaPay</option>
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>المجموع:</span>
            <span className="text-blue-600">200 جنيه مصري</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-primary text-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري المعالجة...
            </span>
          ) : (
            '🔒 الدفع الآمن - احجز نسختك الآن'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          🔒 معاملة آمنة ومشفرة بواسطة Paymob • ستحصل على رابط التحميل فوراً بعد الدفع
        </p>
      </form>
    </div>
  )
}