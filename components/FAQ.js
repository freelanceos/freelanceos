import { useState } from 'react'

const faqs = [
  {
    question: 'كيف سأحصل على الكتاب بعد الدفع؟',
    answer: 'ستحصل على رابط التحميل فوراً عبر الإيميل بعد إتمام عملية الدفع بنجاح.'
  },
  {
    question: 'هل يمكنني استرداد المبلغ؟',
    answer: 'نعم، يمكنك استرداد المبلغ خلال 7 أيام من تاريخ الشراء إذا لم تكن راضياً عن المحتوى.'
  },
  {
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل جميع البطاقات الائتمانية (فيزا، ماستركارد)، المحافظ الإلكترونية، وInstaPay.'
  },
  {
    question: 'هل المحتوى مناسب للمبتدئين؟',
    answer: 'نعم، الكتاب مصمم ليناسب جميع المستويات من المبتدئين إلى المتقدمين.'
  },
  {
    question: 'كم عدد صفحات الكتاب؟',
    answer: 'الكتاب يحتوي على أكثر من 150 صفحة مليئة بالمعلومات العملية والأمثلة الواقعية.'
  },
  {
    question: 'هل يتضمن الكتاب أمثلة عملية؟',
    answer: 'نعم، يحتوي على دراسات حالة وأمثلة من قصص نجاح حقيقية على تيك توك.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
          ❓ أسئلة شائعة
        </h3>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <button
                className="w-full text-right flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <span className={`text-2xl transform transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            لديك سؤال آخر؟ لا تتردد في التواصل معنا
          </p>
          <a href="#order" className="btn-primary">
            🛒 اطلب نسختك الآن
          </a>
        </div>
      </div>
    </section>
  )
}