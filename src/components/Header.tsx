"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";

export default function Header() {
  const session = useAppStore((state) => state.session);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    // 메뉴 오픈 시 body overflow hidden 및 blur 효과
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      timeoutId = setTimeout(() => {
        document.body.style.overflow = "";
        document.body.classList.remove("menu-open");
      }, 300);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const menus = useMemo(() => {
    const commonClass = "hover:text-green-600 transition-colors cursor-pointer";

    const items = session
      ? [
          {
            type: "text",
            label: `${session.user.user_metadata.full_name} 님`,
          },
          { type: "divider" },
          { type: "button", label: "로그아웃", onClick: handleLogout },
          { type: "divider" },
          { type: "link", href: "/mypage", label: "마이페이지" },
          { type: "divider" },
          { type: "link", href: "/cart", label: "장바구니" },
        ]
      : [
          { type: "link", href: "/login", label: "로그인" },
          { type: "divider" },
          { type: "link", href: "/signup", label: "회원가입" },
          { type: "divider" },
          { type: "link", href: "/mypage", label: "마이페이지" },
          { type: "divider" },
          { type: "link", href: "/cart", label: "장바구니" },
        ];

    return items.map((item, idx) => (
      <span
        key={idx}
        className="flex items-center w-auto"
        onClick={() => setIsOpen(false)}
      >
        {item.type === "link" && (
          <Link href={item.href!} className={commonClass}>
            {item.label}
          </Link>
        )}
        {item.type === "button" && (
          <button onClick={item.onClick} className={commonClass}>
            {item.label}
          </button>
        )}
        {item.type === "text" && <span>{item.label}</span>}
        {item.type === "divider" && !isOpen && (
          <span className="text-gray-300">|</span>
        )}
      </span>
    ));
  }, [session, isOpen]);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-green-600">
          <Link href="/">NMart</Link>
        </div>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="border rounded-md px-3 py-2 w-40 sm:w-64 md:w-96"
        />
        <nav className="hidden md:flex space-x-4 text-gray-700 items-center">
          {menus}
        </nav>
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
            />
          </svg>
        </button>
      </div>
      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-gray-300 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 space-y-4 transform transition-opacity duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <button
          className="mb-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          닫기 ✕
        </button>
        <nav className="flex flex-col space-y-1 text-gray-700 justify-center">
          {menus}
        </nav>
      </div>
    </header>
  );
}
