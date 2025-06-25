
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
    const [orders, setOrders] = useState([])
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [authLoading, setAuthLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [admin, setAdmin] = useState(null)
    const [error, setError] = useState('')
    const [selectedTab, setSelectedTab] = useState('dashboard')
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            fetchData()
        }
    }, [isAuthenticated])

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/admin/profile')
            const data = await response.json()

            if (data.success) {
                setAdmin(data.admin)
                setIsAuthenticated(true)
            } else {
                router.push('/admin/login')
            }
        } catch (error) {
            router.push('/admin/login')
        } finally {
            setAuthLoading(false)
        }
    }

    const fetchData = async () => {
        try {
            // Fetch orders (simulate API call for now)
            setOrders([
                {
                    id: 'ORD001',
                    name: 'yasser',
                    email: 'yasserarafa35@gmail.com',
                    phone: '01010101010101',
                    payment_method: 'wallet',
                    transfer_number: '01010101010101',
                    status: 'confirmed',
                    created_at: new Date().toISOString(),
                    order_number: '14'
                }
            ])

            // Fetch contacts
            setContacts([])
        } catch (error) {
            setError('حدث خطأ في تحميل البيانات')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth/logout', { method: 'POST' })
            router.push('/admin/login')
        } catch (error) {
            console.error('Logout error:', error)
            router.push('/admin/login')
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // Update order status logic here
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ))
        } catch (error) {
            setError('حدث خطأ في تحديث حالة الطلب')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800'
            case 'confirmed': return 'bg-green-100 text-green-800'
            case 'completed': return 'bg-blue-100 text-blue-800'
            case 'canceled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return '⏱️'
            case 'confirmed': return '✅'
            case 'completed': return '✅'
            case 'canceled': return '❌'
            default: return '📋'
        }
    }

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.phone.includes(searchTerm)
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        confirmedOrders: orders.filter(o => o.status === 'confirmed').length,
        completedOrders: orders.filter(o => o.status === 'completed').length,
        newMessages: contacts.length
    }

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <h1 className="text-xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <span className="text-sm text-gray-600">
                                مرحباً {admin?.email} - إدارة الطلبات ورسائل العملاء
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition duration-200 flex items-center space-x-2 space-x-reverse"
                            >
                                <span>تسجيل الخروج</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="mb-8">
                    <nav className="flex space-x-8 space-x-reverse">
                        <button
                            onClick={() => setSelectedTab('dashboard')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedTab === 'dashboard' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            📊 تحديث البيانات
                        </button>
                        <button
                            onClick={() => setSelectedTab('orders')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedTab === 'orders' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            🔄 تحديث البيانات
                        </button>
                        <button
                            onClick={() => setSelectedTab('settings')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedTab === 'settings' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                            }`}
                        >
                            ⚙️ التحديث التلقائي معطل
                        </button>
                    </nav>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">رسائل جديدة</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📧</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">إجمالي الرسائل</p>
                                <p className="text-2xl font-bold text-gray-900">1</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📬</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">طلبات مكتملة</p>
                                <p className="text-2xl font-bold text-gray-900">2</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">طلبات معلقة</p>
                                <p className="text-2xl font-bold text-gray-900">0</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⏰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                                <p className="text-2xl font-bold text-gray-900">3</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🛒</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders and Messages Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <span className="ml-2">🛒</span>
                                    الطلبات (3)
                                </h3>
                                <button className="text-sm text-blue-600 hover:text-blue-700">
                                    تصدير CSV
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Search and Filters */}
                            <div className="mb-4 space-y-3">
                                <div className="flex space-x-3 space-x-reverse">
                                    <input
                                        type="text"
                                        placeholder="البحث في الطلبات..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">جميع الحالات</option>
                                        <option value="pending">في الانتظار</option>
                                        <option value="confirmed">مؤكد</option>
                                        <option value="completed">مكتمل</option>
                                        <option value="canceled">ملغي</option>
                                    </select>
                                </div>
                                <div className="flex space-x-2 space-x-reverse">
                                    <input
                                        type="text"
                                        placeholder="جمع الحالات"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="جمع التواريخ"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="مسح الفلاتر"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3 space-x-reverse">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium">👤</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{order.name}</h4>
                                                    <p className="text-sm text-gray-500">{order.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                <span className="text-sm text-gray-500">عرض الإيصال</span>
                                                <button className="text-blue-600 hover:text-blue-700">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </button>
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-sm border-0 ${getStatusColor(order.status)}`}
                                                >
                                                    <option value="confirmed">confirmed</option>
                                                    <option value="pending">pending</option>
                                                    <option value="completed">completed</option>
                                                    <option value="canceled">canceled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>📧 {order.email}</p>
                                            <p>📱 {order.phone}</p>
                                            <p>💳 {order.payment_method}</p>
                                            <p>📅 {new Date(order.created_at).toLocaleDateString('ar-EG')}</p>
                                            <p><strong>رقم التحويل:</strong> {order.transfer_number}</p>
                                            <p><strong>رقم الطلب:</strong> 5</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                                <span className="ml-2">💬</span>
                                رسائل الاتصال (1)
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="text-center py-8 text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">📭</span>
                                </div>
                                <p className="text-lg font-medium mb-2">لا توجد رسائل جديدة</p>
                                <p className="text-sm">الرسائل والاستفسارات ستظهر هنا</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
