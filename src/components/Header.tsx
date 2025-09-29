"use client";

import { createClient } from "@/utils/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { getErrorMessage } from "@/utils";
import MainSearchForm from "./MainSearchForm";

export default function Header() {
  const session = useAppStore((state) => state.session);
  const isAdmin = useAppStore((state) => state.isAdmin);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const router = useRouter();

  const cartItems = useCartStore((state) => state.cartItems);
  const totalCount = cartItems.length;
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (isSidebarOpen) {
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
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("로그아웃 되었습니다. 홈으로 이동합니다.");
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLogoutModalOpen(false);
    }
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
          {
            type: "button",
            label: "로그아웃",
            onClick: () => {
              setLogoutModalOpen(true);
            },
          },
          { type: "divider" },
          { type: "link", href: "/mypage", label: "마이페이지" },
          { type: "divider" },
          {
            type: "link",
            href: "/cart",
            label: (
              <>
                장바구니
                {totalCount > 0 && (
                  <span className="ml-1 inline-block min-w-[18px] px-1 text-xs font-bold text-white bg-red-600 rounded-full text-center align-middle">
                    {totalCount}
                  </span>
                )}
              </>
            ),
          },
          ...(isAdmin
            ? [
                { type: "divider" },
                { type: "link", href: "/admin", label: "관리자" },
              ]
            : []),
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
      <span key={idx} className="flex items-center">
        {item.type === "link" && (
          <Link
            href={item.href!}
            onClick={() => isSidebarOpen && toggleSidebar()}
            className={commonClass}
          >
            {item.label}
          </Link>
        )}
        {item.type === "button" && (
          <button
            onClick={() => {
              item.onClick?.();
              if (isSidebarOpen) {
                toggleSidebar();
              }
            }}
            className={commonClass}
          >
            {item.label}
          </button>
        )}
        {item.type === "text" && <span>{item.label}</span>}
        {item.type === "divider" && !isSidebarOpen && (
          <span className="text-gray-300">|</span>
        )}
      </span>
    ));
  }, [session, isAdmin, isSidebarOpen, toggleSidebar, totalCount]);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="text-2xl font-bold text-green-600">
          <Link href="/">NMart</Link>
        </div>
        <MainSearchForm />
        <nav className="items-center hidden space-x-4 text-gray-700 md:flex">
          {menus}
        </nav>
        {logoutModalOpen && (
          <ConfirmModal
            title="로그아웃"
            message="로그아웃 하시겠습니까?"
            onConfirm={() => {
              handleLogout();
            }}
            onCancel={() => {
              setLogoutModalOpen(false);
            }}
          />
        )}
        <button
          className="p-2 rounded md:hidden hover:bg-gray-100"
          onClick={() => toggleSidebar()}
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
      <div
        className={`fixed inset-0 bg-gray-300 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleSidebar()}
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6 space-y-4 transform transition-opacity duration-300 ease-in-out ${
          isSidebarOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <button
          className="mb-4 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={() => toggleSidebar()}
        >
          닫기 ✕
        </button>
        <nav className="flex flex-col justify-center space-y-1 text-gray-700">
          {menus}
        </nav>
      </div>
    </header>
  );
}
