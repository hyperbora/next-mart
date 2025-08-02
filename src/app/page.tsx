import CategorySidebar from "@/components/CategorySidebar";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 py-6">
      {/* 왼쪽 카테고리 */}
      <aside className="col-span-2">
        <CategorySidebar />
      </aside>

      {/* 메인 콘텐츠 */}
      <section className="col-span-8 bg-white p-4 rounded-md shadow space-y-6">
        {/* 메인 배너 */}
        <div className="bg-green-200 h-48 rounded-md flex items-center justify-center text-2xl font-bold text-white mb-6">
          메인 배너 영역
        </div>

        {/* 추천 상품 */}
        <div>
          <h2 className="text-xl font-bold mb-4">오늘의 추천상품</h2>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="border rounded-md p-2 hover:shadow transition"
              >
                <div className="bg-gray-200 h-40 rounded-md mb-2"></div>
                <p className="text-sm">상품명 {i + 1}</p>
                <p className="text-green-600 font-bold">₩10,000</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오른쪽 배너/광고 */}
      <aside className="col-span-2 space-y-4">
        <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
          광고 배너1
        </div>
        <div className="bg-gray-200 h-40 rounded-md flex items-center justify-center">
          광고 배너2
        </div>
      </aside>
    </div>
  );
}
