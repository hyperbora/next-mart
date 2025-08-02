import Link from "next/link";

export default function Header() {
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
        <nav className="hidden md:flex space-x-4 text-gray-700">
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
          <Link href="/mypage">마이페이지</Link>
          <Link href="/cart">장바구니</Link>
        </nav>
        <button className="md:hidden p-2 rounded hover:bg-gray-100">
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
    </header>
  );
}
