import { useState } from 'react'
import Head from 'next/head'
import OrderForm from '../components/OrderForm'

export default function N8nBookLanding() {

    return (
        <>
            <Head>
                <title>تعلم الاتمتة عن طريق n8n للمبتدئين - FreelanceOs</title>
                <meta name="description" content="دليل شامل لتعلم أساسيات الاتمتة من الصفر مع n8n للمبتدئين" />
                <meta name="keywords" content="n8n, اتمتة, workflow, تعلم, مبتدئين, FreelanceOs" />
                <meta property="og:title" content="تعلم الاتمتة عن طريق n8n للمبتدئين" />
                <meta property="og:description" content="دليل شامل لتعلم أساسيات الاتمتة من الصفر مع n8n للمبتدئين" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://freelanceos.online/n8n-book-landing" />
                <meta property="og:image" content="https://freelanceos.online/n8n-book-cover.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="تعلم الاتمتة عن طريق n8n للمبتدئين" />
                <meta name="twitter:description" content="دليل شامل لتعلم أساسيات الاتمتة من الصفر مع n8n للمبتدئين" />
                <meta name="twitter:image" content="https://freelanceos.online/n8n-book-cover.png" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50" dir="rtl">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">F</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">FreelanceOs</span>
                            </div>
                            <a
                                href="/"
                                className="text-teal-600 hover:text-teal-700 font-semibold transition-colors"
                            >
                                العودة للرئيسية
                            </a>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">

                                {/* Book Preview */}
                                <div className="text-center lg:text-right" dir="rtl">
                                    <div className="inline-flex items-center justify-center w-80 h-96 rounded-3xl mb-8 shadow-2xl bg-white">
                                        <img
                                            src="/n8n-basic-book.png"
                                            alt="كتاب تعلم الاتمتة عن طريق n8n للمبتدئين"
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    </div>

                                    {/* Book Features */}
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">🤖</span>
                                                <p className="text-gray-700 font-semibold">أساسيات الاتمتة</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">⚡</span>
                                                <p className="text-gray-700 font-semibold">أمثلة عملية</p>
                                            </div>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">🎯</span>
                                                <p className="text-gray-700 font-semibold">من الصفر للمتقدم</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div dir="rtl">
                                    <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                        🆕 جديد - متوفر الآن
                                    </div>

                                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                        تعلم الاتمتة عن طريق n8n
                                    </h1>
                                    <p className="text-2xl text-teal-600 font-semibold mb-8">
                                        دليل شامل للمبتدئين
                                    </p>

                                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                        اكتشف عالم الاتمتة مع n8n من خلال هذا الدليل الشامل المصمم خصيصاً للمبتدئين.
                                        تعلم كيفية إنشاء workflows احترافية وأتمتة المهام اليومية بسهولة.
                                    </p>

                                    {/* What You'll Learn */}
                                    <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg" dir="rtl">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">ماذا ستتعلم:</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">أساسيات n8n والواجهة</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">إنشاء workflows بسيطة ومعقدة</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">أتمتة المهام اليومية</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">التكامل مع التطبيقات المختلفة</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-3">
                                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700">أمثلة عملية وحالات استخدام</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price and CTA */}
                                    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-4xl font-bold">250 جنيه مصري</div>
                                                <div className="text-lg opacity-90 line-through">بدلاً من 600 جنيه</div>
                                            </div>
                                            <div className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-semibold">
                                                وفر 58%
                                            </div>
                                        </div>
                                        <a
                                            href="#order"
                                            className="w-full bg-white text-teal-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg block text-center"
                                        >
                                            🤖 احصل على نسختك الآن
                                        </a>
                                    </div>

                                    {/* Free Gift Banner */}
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8">
                                        <div className="text-center">
                                            <div className="text-3xl mb-3">🎁</div>
                                            <h4 className="text-xl font-bold mb-2">هدية مجانية مع الطلب</h4>
                                            <p className="text-green-100 mb-3">
                                                احصل على كتاب "أمثلة عملية من المتقدم حتى الاحتراف" مجاناً
                                            </p>
                                            <div className="bg-white/20 rounded-lg p-3">
                                                <p className="text-sm">
                                                    <span className="font-semibold">قيمة الهدية:</span> 800 جنيه مصري
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guarantee */}
                                    <div className="text-center" dir="rtl">
                                        <p className="text-gray-600">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Book Details */}
                <section className="py-20 bg-white" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                                تفاصيل الكتاب
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-50 rounded-2xl p-6" dir="rtl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">📊 المحتوى</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• 36 صفحة من المحتوى الشامل</li>
                                        <li>• 5 فصول رئيسية</li>
                                        <li>• امثلة عملية</li>
                                        <li>•  workflow جاهز للاستخدام</li>
                                        <li>• شروحات مفصلة بالصور</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6" dir="rtl">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 المستهدفون</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• المبتدئون في مجال الاتمتة</li>
                                        <li>• مطورو البرمجيات</li>
                                        <li>• مديرو المشاريع</li>
                                        <li>• رواد الأعمال</li>
                                        <li>• المهتمون بتوفير الوقت والجهد</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Gift Details */}
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200" dir="rtl">
                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-3">🎁</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">الهدية المجانية</h3>
                                    <p className="text-gray-600">كتاب "أمثلة عملية من المتقدم حتى الاحتراف"</p>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {/* Gift Book Image */}
                                    <div className="flex justify-center">
                                        <div className="inline-flex items-center justify-center w-48 h-56 rounded-2xl shadow-lg bg-white">
                                            <img
                                                src="/n8n-advanced-book.png"
                                                alt="كتاب أمثلة عملية من المتقدم حتى الاحتراف - هدية مجانية"
                                                className="w-full h-full object-cover rounded-2xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-sm" dir="rtl">
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">📚 محتوى الهدية</h4>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• 40 صفحة من المحتوى المتقدم</li>
                                            <li>• workflows معقدة ومتقدمة</li>
                                            <li>• أمثلة واقعية من المشاريع</li>
                                            <li>• تقنيات متقدمة في n8n</li>
                                            <li>• حلول للمشاكل المعقدة</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-xl p-6 shadow-sm" dir="rtl">
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">💎 قيمة الهدية</h4>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600 mb-2">800 جنيه</div>
                                            <p className="text-gray-600 text-sm">قيمة الكتاب المتقدم</p>
                                            <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                                                مجاناً مع الطلب
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Order Section - Two Steps */}
                <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50" id="order" dir="rtl">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                احصل على نسختك الآن بخطوتين فقط
                            </h3>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                عملية الشراء سريعة وآمنة. اتبع الخطوات أدناه لتحصل على الكتاب والهدية فوراً.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Step 1: Payment */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-full text-right">
                                <div className="flex items-center justify-end mb-4">
                                    <h4 className="text-2xl font-bold text-gray-900">
                                        إتمام عملية الدفع
                                    </h4>
                                    <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                                        1
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 text-right">
                                    اضغط على الزر أدناه لإتمام عملية الدفع الآمنة عبر Paymob. سيتم
                                    فتح صفحة الدفع في نافذة جديدة.
                                </p>
                                <a
                                    href="https://accept.paymobsolutions.com/standalone?ref=p_LRR2dUc0eU4zZ1dSMk9ENllBNDNFZEZWUT09XzRkZGkzeVh4THNCcmN1NTZNZUJPdGc9PQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full block text-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg mb-4"
                                >
                                    💳 رابط دفع امن ١٠٠٪
                                </a>
                                <p className="text-sm text-gray-500 text-right">
                                    بعد إتمام الدفع، لا تغلق هذه الصفحة وعد لإكمال الخطوة الثانية.
                                </p>
                            </div>

                            {/* Step 2: Confirmation Form */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 h-full text-right">
                                <div className="flex items-center justify-end mb-4">
                                    <h4 className="text-2xl font-bold text-gray-900">تأكيد طلبك</h4>
                                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                                        2
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-6 text-right">
                                    بعد الدفع، املأ النموذج أدناه وسنرسل لك الكتاب والهدية فوراً على بريدك
                                    الإلكتروني.
                                </p>
                                <OrderForm
                                    productName="تعلم الاتمتة عن طريق n8n للمبتدئين + هدية مجانية"
                                    productPrice="250"
                                    productType="n8n-book-with-gift"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
} 