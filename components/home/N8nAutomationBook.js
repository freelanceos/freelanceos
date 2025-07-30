export default function N8nAutomationBook() {
    return (
        <section id="n8n-book" className="py-20 bg-gradient-to-br from-cyan-50 to-teal-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                        كتاب جديد
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        تعلم أساسيات الاتمتة من الصفر مع n8n
                    </p>
                </div>

                {/* Featured Product Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 lg:p-12 border border-teal-100 shadow-xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">

                            {/* Product Image/Icon */}
                            <div className="text-center lg:text-right">
                                <div className="inline-flex items-center justify-center w-58 h-64 rounded-3xl mb-6 shadow-2xl bg-white">
                                    <div className="w-full h-full bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 flex flex-col justify-between">
                                        {/* n8n Logo */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-bold text-xl">n8n</span>
                                        </div>

                                        {/* Main Title */}
                                        <div className="text-center">
                                            <h3 className="text-white font-bold text-2xl mb-2">تعلم الاتمتة</h3>
                                            <p className="text-white font-semibold text-lg">عن طريق n8n</p>
                                            <p className="text-white text-sm mt-1">للمبتدئين</p>
                                        </div>

                                        {/* Automation Icons */}
                                        <div className="flex justify-center items-center gap-4">
                                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                </svg>
                                            </div>
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zM15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="text-center">
                                            <p className="text-white text-sm font-semibold">FreelanceOs</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">🤖</span>
                                            <p className="text-sm text-gray-700">أساسيات الاتمتة</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">⚡</span>
                                            <p className="text-sm text-gray-700">أمثلة عملية</p>
                                        </div>
                                    </div>

                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">🎯</span>
                                            <p className="text-sm text-gray-700">من الصفر للمتقدم</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Content */}
                            <div>
                                <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    🆕 جديد
                                </div>

                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    تعلم الاتمتة عن طريق n8n
                                </h3>
                                <p className="text-xl text-teal-600 font-semibold mb-6">
                                    دليل شامل للمبتدئين
                                </p>

                                {/* Product Features */}
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">٣٠ صفحة من المحتوى الشامل</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">أساسيات n8n من الصفر</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">أمثلة عملية وحالات استخدام</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">تحميل فوري بعد الدفع</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">دعم فني مجاني</span>
                                    </div>
                                </div>

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-3xl font-bold text-gray-900">250 جنيه مصري</div>
                                        <div className="text-sm text-gray-500 line-through">بدلاً من 600 جنيه</div>
                                    </div>
                                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        وفر 58%
                                    </div>
                                </div>

                                {/* Free Gift Info */}
                                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-4 text-white mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🎁</div>
                                        <h4 className="text-lg font-bold mb-1">هدية مجانية</h4>
                                        <p className="text-green-100 text-sm">
                                            كتاب "أمثلة عملية من المتقدم حتى الاحتراف"
                                        </p>
                                        <div className="bg-white/20 rounded-lg p-2 mt-2">
                                            <p className="text-xs">
                                                <span className="font-semibold">قيمة الهدية:</span> 800 جنيه
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href="/n8n-book-landing#order"
                                    className="block w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-center font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    🤖 احصل على نسختك الآن + هدية مجانية
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 