"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Box, ShoppingCart, Users } from "lucide-react";

const navItems = [
  { href: "/admin", label: "대시보드", icon: <Box size={20} />, exact: true },
  { href: "/admin/products", label: "상품 관리", icon: <Box size={20} /> },
  {
    href: "/admin/orders",
    label: "주문 관리",
    icon: <ShoppingCart size={20} />,
  },
  { href: "/admin/users", label: "회원 관리", icon: <Users size={20} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* 관리자 헤더 */}
      <header className="fixed top-0 left-0 w-full h-16 bg-white border-b z-50 flex items-center justify-between px-4">
        <h1 className="font-bold text-lg">관리자 페이지</h1>
        <button
          className="md:hidden p-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* 좌측 사이드바 */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-gray-800 text-white p-4
        transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="space-y-4">
          {navItems.map((item) => {
            // 정확한 active 판별
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-green-600 text-white font-semibold"
                    : "hover:bg-green-700"
                }`}
                onClick={() => setIsOpen(false)} // 모바일에서 클릭 시 닫기
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-6 md:ml-64 mt-16">{children}</main>
    </div>
  );
}
