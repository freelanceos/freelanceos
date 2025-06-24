import { useState } from 'react'

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب'
    if (!formData.email.trim()) {
      newErrors.email = 'الإيميل مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'الإيميل غير صحيح'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب'
    } else if (!/^(\+201|01)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف المصري غير صحيح'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      // Step 1: Save user data to our database
      const response = await fetch('/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Step 2: Send emails
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              order_id: data.order_id
            }),
          })
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
          // Continue with the process even if email fails
        }

        setSubmitted(true)

        // Step 3: Open WhatsApp
        const adminPhone = "+201002100785"; // Replace with your WhatsApp number
        const message = `مرحباًفريق فري لانس او اس، لقد قمت بشراء كتاب "رحلة الانتشار".\nالاسم: ${formData.name}\nالإيميل: ${formData.email}\nرقم الهاتف: ${formData.phone}`;
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

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
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  if (submitted) {
    return (
      <div className="text-center bg-green-50 p-6 rounded-lg">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">تم إرسال بياناتك بنجاح!</h3>
        <p className="text-green-700">
          شكراً لك. سيتم إرسال الكتاب إلى بريدك الإلكتروني خلال دقائق. تم فتح محادثة واتساب لتأكيد أسرع.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="sr-only">الاسم الكامل</label>
        <input
          type="text" id="name" name="name" value={formData.name} onChange={handleChange}
          className={`form-input ${errors.name ? 'border-red-500' : ''}`}
          placeholder="الاسم الكامل *" disabled={loading}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
        <input
          type="email" id="email" name="email" value={formData.email} onChange={handleChange}
          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
          placeholder="البريد الإلكتروني *" disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="sr-only">رقم الهاتف</label>
        <input
          type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
          className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="رقم الهاتف *" disabled={loading}
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading ? 'جاري الإرسال...' : '✅ تأكيد الطلب وإرسال الكتاب'}
      </button>
    </form>
  )
}