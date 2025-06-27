import Head from "next/head";
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <>
      <Head>
        <title> FreelanceOS - خدمات البرمجة والتصميم والتعليم الإلكتروني</title>
        <meta
          name="description"
          content="فريق متخصص في البرمجة، التصميم، والتعليم الإلكتروني. نقدم حلولًا عملية ومبتكرة تساعد الأفراد والشركات على النمو والتوسع في السوق الرقمي."
        />
        <meta
          name="keywords"
          content="برمجة, تصميم, تعليم إلكتروني, مواقع ويب, تطبيقات, هوية بصرية, تيك توك, مصر"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="النجاح الرقمي - خدمات البرمجة والتصميم والتعليم الإلكتروني"
        />
        <meta
          property="og:description"
          content="فريق متخصص في البرمجة، التصميم، والتعليم الإلكتروني. نقدم حلولًا عملية ومبتكرة تساعد الأفراد والشركات على النمو والتوسع في السوق الرقمي."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_EG" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="FreelanceOS" />
        <link rel="icon" href="/favicon.ico" />
<link rel="canonical" href="https://freelanceos.online" />
      </Head>
      <HomePage />
    </>
  );
}
