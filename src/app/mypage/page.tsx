import Link from "next/link";

export default function MyPage() {
  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">마이페이지</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/mypage/orders"
            className="block p-4 bg-white border rounded-md hover:shadow-md hover:text-green-600 transition-colors"
          >
            주문 내역
          </Link>
        </li>
        <li>
          <Link
            href="/mypage/profile"
            className="block p-4 bg-white border rounded-md hover:shadow-md hover:text-green-600 transition-colors"
          >
            회원 정보
          </Link>
        </li>
        <li>
          <Link
            href="/mypage/settings"
            className="block p-4 bg-white border rounded-md hover:shadow-md hover:text-green-600 transition-colors"
          >
            설정
          </Link>
        </li>
      </ul>
    </div>
  );
}
