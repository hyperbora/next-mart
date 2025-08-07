import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import AuthListener from "@/components/AuthListener";

export const metadata = {
  title: "Next Mart",
  description: "Next.js로 만든 쇼핑몰",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen pt-20">
        {/* 로그인 세션 초기화/리스너 */}
        <AuthListener />

        {/* 상단 고정 헤더 */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 bg-gray-50 px-2 sm:px-4 md:px-6">
          {children}
        </main>

        {/* 하단 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
