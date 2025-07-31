"use client";

import "./globals.css";

import React from "react";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeSidebar = () => setOpen(false);
  return (
    <html lang="ko">
      <body className={`antialiased bg-white text-gray-800`}>
        {/* SSR로 기본 레이아웃 렌더링 */}
        <header className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow z-50">
          <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto">
            {/* 좌측: 햄버거 + 로고 */}
            <div className="flex items-center space-x-4">
              {/* 햄버거 버튼 - CSR 상태로 토글 */}
              <button
                onClick={() => setOpen((open) => !open)}
                className="md:hidden"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/" className="font-bold text-lg">
                Next Mart
              </Link>
            </div>

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex space-x-6">
              <Link href="/">홈</Link>
              <Link href="/about">소개</Link>
              <Link href="/contact">문의</Link>
            </div>
          </div>
        </header>

        {/* 사이드바 (CSR로 토글 제어) */}
        {open && (
          <div className="fixed !pt-16 inset-0 z-40 flex">
            {/* 배경 오버레이 */}
            <div
              className="fixed inset-0 bg-black opacity-30"
              onClick={() => setOpen((open) => !open)}
            />

            {/* 왼쪽 슬라이딩 메뉴 */}
            <div className="w-64 bg-white dark:bg-gray-800 shadow-md p-4 z-50 transition-transform transform translate-x-0">
              <nav className="flex flex-col mt-8 space-y-4">
                <Link href="/" onClick={closeSidebar}>
                  홈
                </Link>
                <Link href="/about" onClick={closeSidebar}>
                  소개
                </Link>
                <Link href="/contact" onClick={closeSidebar}>
                  문의
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* 페이지 콘텐츠 */}
        <main className="!pt-16 px-4">{children}</main>
      </body>
    </html>
  );
}
