import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message || 'فشل تسجيل الدخول')
                setLoading(false)
                return
            }
            // نجاح الدخول
            router.push('/admin') // Changed from /admin/dashboard
        } catch (err) {
            setError('حدث خطأ غير متوقع')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6" dir="rtl">
                <h2 className="text-2xl font-bold text-center mb-4">تسجيل دخول الأدمن</h2>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                    <input type="email" className="form-input w-full" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">كلمة السر</label>
                    <input type="password" className="form-input w-full" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} />
                </div>
                {error && <div className="text-red-600 text-center text-sm">{error}</div>}
                <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'جاري التحقق...' : 'دخول'}</button>
            </form>
        </div>
    )
}
