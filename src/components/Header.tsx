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
          className="border rounded-md px-3 py-2 w-96"
        />
        <nav className="flex space-x-4 text-gray-700">
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
          <Link href="/mypage">마이페이지</Link>
          <Link href="/cart">장바구니</Link>
        </nav>
      </div>
    </header>
  );
}
