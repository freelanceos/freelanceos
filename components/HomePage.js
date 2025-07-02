import { useState, useEffect } from 'react'
import Image from 'next/image'
import Hero from './home/Hero'
import Services from './home/Services'
import DigitalProducts from './home/DigitalProducts'
import OurWorks from './home/OurWorks'
import Testimonials from './home/Testimonials'
import ContactCTA from './home/ContactCTA'
import WhatsAppButton from './home/WhatsAppButton'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white font-arabic" dir="rtl">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
        }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="h-16">
              <img src="/logo.png" alt="FreelanceOS" width="120" height="60" />

            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 space-x-reverse">
              <button onClick={() => scrollToSection('hero')} className="nav-link">الرئيسية</button>
              <button onClick={() => scrollToSection('services')} className="nav-link">خدماتنا</button>
              <button onClick={() => scrollToSection('products')} className="nav-link">منتجاتنا</button>
              <button onClick={() => scrollToSection('ourworks')} className="nav-link">أحدث أعمالنا</button>
              <button onClick={() => scrollToSection('contact')} className="nav-link">تواصل معنا</button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a href="https://wa.me/201002100785" target="_blank" rel="noopener noreferrer" className="btn-primary-small">
                📞 استشارة مجانية
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-3">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-right py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">الرئيسية</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-right py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">خدماتنا</button>
              <button onClick={() => scrollToSection('products')} className="block w-full text-right py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">منتجاتنا</button>
              <button onClick={() => scrollToSection('ourworks')} className="block w-full text-right py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">أحدث أعمالنا</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-right py-2 px-4 hover:bg-gray-50 rounded-lg transition-colors">تواصل معنا</button>
              <a href="https://wa.me/201002100785" target="_blank" rel="noopener noreferrer" className="block btn-primary text-center mt-4">
                📞 استشارة مجانية
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed nav */}
      <div className="pt-20">
        {/* Main Content */}
        <Hero />
        <Services />
        <DigitalProducts />
        <OurWorks />
        <Testimonials />
        <ContactCTA />
      </div>

      {/* Enhanced WhatsApp Float Button */}
      <WhatsAppButton />

      {/* Back to Top Button */}
      <button
        onClick={() => scrollToSection('hero')}
        className={`fixed bottom-20 left-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
