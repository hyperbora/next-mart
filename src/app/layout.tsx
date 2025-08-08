import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import AuthListener from "@/components/AuthListener";
import { Toaster } from "react-hot-toast";
import AuthCartSync from "@/components/AuthCartSync";

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
        <Toaster />
        <AuthCartSync />

        {/* 상단 고정 헤더 */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <Header />
        </div>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 px-2 bg-gray-50 sm:px-4 md:px-6">
          {children}
        </main>

        {/* 하단 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
