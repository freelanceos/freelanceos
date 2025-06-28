import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Important for cookies
            })

            const data = await response.json()
            console.log('Login response:', data) // Debug log

            if (response.ok && data.success) {
                // Force a small delay to ensure cookie is set
                setTimeout(() => {
                    router.push('/admin')
                }, 100)
            } else {
                setError(data.message || 'حدث خطأ في تسجيل الدخول')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('حدث خطأ في الاتصال')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-12 px-2 sm:px-4 lg:px-8 overflow-y-auto">
            <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-8 bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-100">
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-100 rounded-full p-3 mb-2">
                        <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a6 6 0 1112 0z" />
                        </svg>
                    </div>
                    <h2 className="mt-2 text-center text-2xl font-extrabold text-gray-900">
                        تسجيل دخول المدير
                    </h2>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        أدخل بيانات الدخول للوصول إلى لوحة التحكم
                    </p>
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-xl shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                                البريد الإلكتروني
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-base text-sm transition"
                                placeholder="البريد الإلكتروني"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                                كلمة المرور
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none block w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 sm:text-base text-sm transition"
                                placeholder="كلمة المرور"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-red-50 p-3">
                            <div className="text-sm text-red-700 text-center">
                                {error}
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-base font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                    </svg>
                                    جاري تسجيل الدخول...
                                </span>
                            ) : 'تسجيل الدخول'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
