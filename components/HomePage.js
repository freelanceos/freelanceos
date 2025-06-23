import { useState } from 'react'
import Hero from './home/Hero'
import Services from './home/Services'
import DigitalProducts from './home/DigitalProducts'
import Testimonials from './home/Testimonials'
import ContactCTA from './home/ContactCTA'
import WhatsAppButton from './home/WhatsAppButton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">
              🚀 النجاح الرقمي
            </div>
            <div className="hidden md:flex space-x-8 space-x-reverse">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">خدماتنا</a>
              <a href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">منتجاتنا</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">آراء العملاء</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">تواصل معنا</a>
            </div>
            <button className="btn-primary-small hidden md:block">
              استشارة مجانية
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <Hero />
      <Services />
      <DigitalProducts />
      <Testimonials />
      <ContactCTA />
      
      {/* WhatsApp Float Button */}
      <WhatsAppButton />
    </div>
  )
}