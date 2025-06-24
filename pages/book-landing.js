import Head from 'next/head'
import LandingPage from '../components/LandingPage'

export default function BookLanding() {
    return (
        <>
            <Head>
                <title>رحلة الانتشار - دليل النجاح على تيك توك | النجاح الرقمي</title>
                <meta name="description" content="دليل شامل يحتوي على استراتيجيات مؤكدة لبناء جمهور كبير وتحقيق الربح من تيك توك. اكتشف أسرار النجاح مع خبرات عملية من خبراء المجال." />
                <meta name="keywords" content="تيك توك, نجاح, محتوى, ربح من تيك توك, استراتيجيات التسويق, صناعة المحتوى" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="رحلة الانتشار - دليل النجاح على تيك توك" />
                <meta property="og:description" content="دليل شامل يحتوي على استراتيجيات مؤكدة لبناء جمهور كبير وتحقيق الربح من تيك توك" />
                <meta property="og:type" content="product" />
                <meta property="og:locale" content="ar_EG" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="فريق النجاح الرقمي" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingPage />
        </>
    )
}
