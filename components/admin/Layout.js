import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminLayout({ children }) {
    const [loading, setLoading] = useState(true)
    const [admin, setAdmin] = useState(null)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/admin/profile')
            const data = await response.json()

            if (data.success) {
                setAdmin(data.admin)
            } else {
                router.push('/admin/login')
            }
        } catch (error) {
            console.error('Auth check error:', error)
            router.push('/admin/login')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth/logout', {
                method: 'POST'
            })
            router.push('/admin/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">جاري التحميل...</div>
            </div>
        )
    }

    if (!admin) {
        return null // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600 ml-4">{admin.email}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            تسجيل الخروج
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar and Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-white shadow rounded-lg p-4">
                        <nav className="space-y-2">
                            <a
                                href="/admin"
                                className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-900"
                            >
                                لوحة المعلومات
                            </a>
                            {/* Add more navigation items as needed */}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white shadow rounded-lg p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
