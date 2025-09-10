"use client";

import Link from "next/link";
import { Box, ShoppingCart, Users } from "lucide-react";

const dashboardItems = [
  {
    href: "/admin/products/create",
    label: "상품 등록",
    icon: <Box size={24} />,
    bg: "bg-green-600 hover:bg-green-700",
  },
  {
    href: "/admin/products",
    label: "상품 목록",
    icon: <Box size={24} />,
    bg: "bg-green-500 hover:bg-green-600",
  },
  {
    href: "/admin/orders",
    label: "주문 관리",
    icon: <ShoppingCart size={24} />,
    bg: "bg-blue-600 hover:bg-blue-700",
  },
  {
    href: "/admin/users",
    label: "회원 관리",
    icon: <Users size={24} />,
    bg: "bg-gray-600 hover:bg-gray-700",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>
      <p className="mb-6 text-gray-600">
        좌측 메뉴 또는 아래 카드 버튼을 통해 관리 기능으로 이동할 수 있습니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${item.bg} text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-md transition-transform transform hover:scale-105`}
          >
            {item.icon}
            <span className="mt-2 font-semibold">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
