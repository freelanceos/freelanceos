import React from 'react';

export default function OurWorks() {
    return (
        <section id="ourworks" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
            <div className="container mx-auto px-4">
                <div className="mb-12 max-w-3xl mx-auto text-center">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold mb-3">أعمالنا الأخيرة</span>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">أحدث أعمالنا</h2>
                    <p className="text-gray-600 text-base lg:text-lg">نفتخر بتقديم حلول رقمية متكاملة لعملائنا. إليك لمحة عن أحد مشاريعنا المميزة.</p>
                </div>
                <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 gap-10 md:gap-16 max-w-5xl mx-auto">
                    <div className="w-full md:w-80 flex-shrink-0 flex justify-center">
                        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-gray-100">
                            <img
                                src="/aa.png"
                                alt="Arabic Academy Website Screenshot"
                                className="object-cover w-full h-48 md:h-64 transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="flex-1 text-right">
                        <h3 className="text-2xl font-bold text-purple-700 mb-2 flex items-center gap-2 justify-end">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                            مجمع اللغة العربية بالقاهرة
                        </h3>
                        <p className="text-gray-700 text-base mb-4 leading-relaxed">
                            منصة معرفية متكاملة تهدف إلى خدمة اللغة العربية عبر الإنترنت، وتضم معاجم لغوية، إصدارات علمية، أخبار ومقالات، وقاعدة بيانات ضخمة للباحثين والمهتمين. تم تطوير الموقع ليكون سريعاً، متجاوباً، وسهل الاستخدام لجميع الفئات.
                        </p>
                        <ul className="list-disc pr-5 text-gray-600 text-sm mb-4 space-y-1">
                            <li>تصميم عصري متجاوب مع جميع الأجهزة</li>
                            <li>محرك بحث متقدم في المعاجم والمحتوى</li>
                            <li>لوحة تحكم للإدارة وتحديث المحتوى بسهولة</li>
                            <li>دعم لغوي وتقني متكامل</li>
                        </ul>
                        <a
                            href="https://www.arabicacademy.gov.eg/ar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow hover:from-blue-700 hover:to-purple-700 transition-all text-base"
                        >
                            زيارة الموقع
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
} 