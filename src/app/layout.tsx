import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next Mart",
  description: "Next.js로 만든 쇼핑몰",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 w-full z-50">
          <Header />
        </div>
        <main className="flex-1 bg-gray-50 !mt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
