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
            // Fetch orders from Supabase
            const ordersResponse = await fetch('/api/admin/orders')
            const ordersData = await ordersResponse.json()

            if (ordersData.success) {
                setOrders(ordersData.orders)
            } else {
                setError('حدث خطأ في تحميل الطلبات')
            }

            // Fetch contacts (will be implemented later)
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
            const response = await fetch('/api/admin/orders/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId,
                    status: newStatus
                })
            })

            const data = await response.json()

            if (data.success) {
                // Update local state
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, payment: newStatus } : order
                ))
            } else {
                setError('حدث خطأ في تحديث حالة الطلب')
            }
        } catch (error) {
            setError('حدث خطأ في تحديث حالة الطلب')
        }
    }

    const sendEmailToCustomer = async (order) => {
        try {
            setLoading(true)
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: order.email,
                    name: order.name,
                    phone: order.phone,
                    order_id: order.id,
                    fromAdmin: true
                })
            })

            const data = await response.json()

            if (response.ok) {
                alert('🎉 تم إرسال الإيميل المخصص بنجاح للعميل من إدارة FreelanceOS')
            } else {
                setError('حدث خطأ في إرسال الإيميل')
            }
        } catch (error) {
            setError('حدث خطأ في إرسال الإيميل')
        } finally {
            setLoading(false)
        }
    }

    const sendWhatsAppToCustomer = (order) => {
        const downloadLink = `${window.location.origin}/download?token=${order.id}`
        const message = `مرحباً ${order.name}،

تم تأكيد طلبك لكتاب "رحلة الانتشار - دليل النجاح على تيك توك"

يمكنك تحميل الكتاب من الرابط التالي:
${downloadLink}

رقم الطلب: ${order.id.substring(0, 8)}

نتمنى لك قراءة ممتعة ونجاحاً باهراً على تيك توك!

فريق FreelanceOS`

        const phoneNumber = order.phone.replace(/[^0-9]/g, '')
        const whatsappNumber = phoneNumber.startsWith('01') ? `2${phoneNumber}` : phoneNumber
        const encodedMessage = encodeURIComponent(message)
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

        window.open(whatsappUrl, '_blank')
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'waiting': return 'bg-yellow-100 text-yellow-800'
            case 'completed': return 'bg-green-100 text-green-800'
            case 'failed': return 'bg-red-100 text-red-800'
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
        const matchesStatus = statusFilter === 'all' || order.payment === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = {
        totalOrders: orders.length,
        waitingOrders: orders.filter(o => o.payment === 'waiting').length,
        completedOrders: orders.filter(o => o.payment === 'completed').length,
        failedOrders: orders.filter(o => o.payment === 'failed').length,
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
        <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto" dir="rtl">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-2 sm:py-0 gap-2">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <span className="text-xs sm:text-sm text-gray-600">
                                مرحباً {admin?.email} - إدارة الطلبات ورسائل العملاء
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-700 transition duration-200 flex items-center space-x-2 space-x-reverse"
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

            <div className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
                {/* Navigation Tabs */}
                <div className="mb-4 sm:mb-8 overflow-x-auto">
                    <nav className="flex space-x-2 sm:space-x-8 space-x-reverse whitespace-nowrap">
                        <button
                            onClick={() => setSelectedTab('dashboard')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors ${selectedTab === 'dashboard'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            📊 تحديث البيانات
                        </button>
                        <button
                            onClick={() => setSelectedTab('orders')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors ${selectedTab === 'orders'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            🔄 تحديث البيانات
                        </button>
                        <button
                            onClick={() => setSelectedTab('settings')}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors ${selectedTab === 'settings'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            ⚙️ التحديث التلقائي معطل
                        </button>
                    </nav>
                </div>

                {/* Dynamic Tab Content */}
                {selectedTab === 'dashboard' && (
                    <>
                        {/* New: Latest Work Section */}
                        <div className="mb-8">
                            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex-shrink-0 w-full sm:w-48">
                                    <img src="/logo/book.png" alt="Arabic Academy Website Screenshot" className="rounded-lg shadow-md w-full object-cover" style={{ maxHeight: '120px' }} />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold text-gray-900 mb-1">أحدث أعمالنا</h2>
                                    <p className="text-gray-700 text-sm mb-2">
                                        <span className="font-semibold text-blue-700">مجمع اللغة العربية بالقاهرة</span> هو منصة معرفية متكاملة تهدف إلى خدمة اللغة العربية عبر الإنترنت، وتضم معاجم لغوية، إصدارات علمية، أخبار ومقالات، وقاعدة بيانات ضخمة للباحثين والمهتمين. تم تطوير الموقع ليكون سريعاً، متجاوباً، وسهل الاستخدام لجميع الفئات.
                                    </p>
                                    <ul className="list-disc pr-5 text-gray-600 text-xs mb-2">
                                        <li>تصميم عصري متجاوب مع جميع الأجهزة</li>
                                        <li>محرك بحث متقدم في المعاجم والمحتوى</li>
                                        <li>لوحة تحكم للإدارة وتحديث المحتوى بسهولة</li>
                                        <li>دعم لغوي وتقني متكامل</li>
                                    </ul>
                                    <a href="https://www.arabicacademy.gov.eg/ar" target="_blank" rel="noopener noreferrer" className="inline-block mt-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition">زيارة الموقع</a>
                                </div>
                            </div>
                        </div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                                        <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">طلبات في الانتظار</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.waitingOrders}</p>
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
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">🛒</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Orders and Messages Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                            {/* Recent Orders */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                                            <span className="ml-2">🛒</span>
                                            الطلبات ({stats.totalOrders})
                                        </h3>
                                        <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-700">
                                            تصدير CSV
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    {/* Search and Filters */}
                                    <div className="mb-3 sm:mb-4 space-y-2 sm:space-y-3">
                                        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 sm:space-x-reverse">
                                            <input
                                                type="text"
                                                placeholder="البحث في الطلبات..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="all">جميع الحالات</option>
                                                <option value="waiting">في الانتظار</option>
                                                <option value="completed">مكتمل</option>
                                                <option value="failed">فشل</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:space-x-reverse">
                                            <input
                                                type="text"
                                                placeholder="جمع الحالات"
                                                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="جمع التواريخ"
                                                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="مسح الفلاتر"
                                                className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md text-xs sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Orders List */}
                                    <div className="space-y-3 sm:space-y-4 min-w-[320px]">
                                        {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                            <div key={order.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 gap-2">
                                                    <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                                                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <span className="text-xs sm:text-sm font-medium">👤</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium text-gray-900 text-sm sm:text-base">{order.name}</h4>
                                                            <p className="text-xs sm:text-sm text-gray-500">{order.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
                                                        <select
                                                            value={order.payment}
                                                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm border-0 ${getStatusColor(order.payment)}`}
                                                        >
                                                            <option value="waiting">waiting</option>
                                                            <option value="completed">completed</option>
                                                            <option value="failed">failed</option>
                                                        </select>
                                                        {(order.payment === 'waiting' || order.payment === 'completed') && (
                                                            <div className="flex space-x-0.5 sm:space-x-1 space-x-reverse">
                                                                <button
                                                                    onClick={() => sendEmailToCustomer(order)}
                                                                    className="px-1.5 sm:px-2 py-0.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 flex items-center"
                                                                    title="إرسال عبر الإيميل"
                                                                >
                                                                    📧
                                                                </button>
                                                                <button
                                                                    onClick={() => sendWhatsAppToCustomer(order)}
                                                                    className="px-1.5 sm:px-2 py-0.5 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center"
                                                                    title="إرسال عبر واتساب"
                                                                >
                                                                    💬
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-xs sm:text-sm text-gray-600 space-y-0.5 sm:space-y-1">
                                                    <p>📧 {order.email}</p>
                                                    <p>📱 {order.phone}</p>
                                                    <p>💳 {order.payment}</p>
                                                    <p>📅 {new Date(order.timestamp).toLocaleDateString('ar-EG')}</p>
                                                    <p><strong>معرف الطلب:</strong> {order.id.substring(0, 8)}...</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="text-center py-6 sm:py-8 text-gray-500">
                                                <p>لا توجد طلبات</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Messages */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 lg:mt-0">
                                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center">
                                        <span className="ml-2">💬</span>
                                        رسائل الاتصال (1)
                                    </h3>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <div className="text-center py-6 sm:py-8 text-gray-500">
                                        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <span className="text-xl sm:text-2xl">📭</span>
                                        </div>
                                        <p className="text-base sm:text-lg font-medium mb-1 sm:mb-2">لا توجد رسائل جديدة</p>
                                        <p className="text-xs sm:text-sm">الرسائل والاستفسارات ستظهر هنا</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {selectedTab === 'orders' && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <button
                            onClick={fetchData}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all text-lg flex items-center gap-2"
                        >
                            <span>🔄</span> تحديث الطلبات والبيانات الآن
                        </button>
                        {loading && <div className="mt-6 text-blue-600">جاري التحديث...</div>}
                        {!loading && (
                            <div className="mt-8 text-gray-600 text-center">
                                <p>تم تحميل آخر البيانات بنجاح.</p>
                                <p className="text-xs mt-2">يمكنك العودة للتبويب الرئيسي لرؤية الطلبات.</p>
                            </div>
                        )}
                    </div>
                )}
                {selectedTab === 'settings' && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm text-yellow-800 text-center max-w-md">
                            <div className="text-3xl mb-2">⚙️</div>
                            <div className="font-bold mb-1">التحديث التلقائي معطل</div>
                            <div className="text-sm mb-2">يمكنك تفعيل التحديث التلقائي لاحقاً من الإعدادات المتقدمة.</div>
                            <button className="mt-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg font-bold transition">إعدادات قادمة قريباً</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
