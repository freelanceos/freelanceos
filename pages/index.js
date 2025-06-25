import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page by default
    router.push("/home");
  }, [router]);

  return (
    <>
      <Head>
        <title> FreelanceOS - نحن نساعدك على النجاح في العالم الرقمي</title>
        <meta
          name="description"
          content="فريق متخصص في البرمجة، التصميم، والتعليم الإلكتروني. نقدم حلولًا عملية ومبتكرة تساعد الأفراد والشركات على النمو والتوسع في السوق الرقمي."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 font-arabic"
        dir="rtl"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التوجيه للصفحة الرئيسية...</p>
        </div>
      </div>
    </>
  );
}
