import { useState } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "الاسم يجب أن يكون أكثر من حرفين";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (
      !/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      newErrors.phone = "يرجى إدخال رقم هاتف مصري صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "" });

        // Send email notification
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              orderId: data.order_id,
            }),
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      } else {
        setError(data.message || "حدث خطأ في إرسال الطلب");
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          تم تأكيد طلبك بنجاح!
        </h3>
        <p className="text-green-700 mb-6">
          سنرسل لك رابط تحميل الكتاب على البريد الإلكتروني وعبر الواتساب خلال 5 دقائق.
          <br />
          تأكد من مراجعة صندوق الرسائل غير المرغوب فيها أيضاً.
        </p>
        <div className="bg-white p-4 rounded-lg shadow-inner">
          <p className="text-sm text-gray-600">
            📧 البريد المرسل إليه: <strong>{formData.email}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          املأ بياناتك للحصول على الكتاب نفس بيانات الدفع
        </h3>
        <p className="text-blue-100 text-sm">
          سيتم إرسال رابط التحميل على بريدك الإلكتروني فوراً
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الكامل *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-input w-full ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="مثال: أحمد محمود"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-input w-full ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="مثال: ahmed@gmail.com"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              رقم الهاتف (مصر) *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-input w-full ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
              placeholder="مثال: 01012345678"
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>جاري الإرسال...</span>
              </div>
            ) : (
              "📨     شكرا لك سوف يتم ارسال رابط التحميل  "
            )}
          </button>
        </form>

        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-6 space-x-reverse text-sm text-gray-600">
            <div className="flex items-center space-x-2 space-x-reverse">
              <span>🔒</span>
              <span>آمن ومحمي</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span>⚡</span>
              <span>تحميل فوري</span>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span>💯</span>
              <span>ضمان الجودة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
