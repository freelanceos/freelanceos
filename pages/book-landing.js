import Head from 'next/head'
import LandingPage from '../components/LandingPage'

export default function BookLanding() {
  return (
    <>
      <Head>
        <title>كتاب رحلة الانتشار - دليل النجاح على تيك توك</title>
        <meta name="description" content="دليل شامل لتعلم استراتيجيات النجاح على تيك توك وتحقيق الربح. احصل على نسختك الآن بـ 200 جنيه مصري فقط!" />
        <meta name="keywords" content="تيك توك, تسويق, ربح, محتوى, فيديو, مصر" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="كتاب رحلة الانتشار - دليل النجاح على تيك توك" />
        <meta property="og:description" content="دليل شامل لتعلم استراتيجيات النجاح على تيك توك وتحقيق الربح" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://yourwebsite.com/book-landing" />
      </Head>
      <LandingPage />
    </>
  )
}