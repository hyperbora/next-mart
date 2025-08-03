import CategorySidebar from "@/components/CategorySidebar";
import ProductItem from "@/components/ProductItem";
import { getAllProducts } from "@/data/products";

export default function HomePage() {
  const products = getAllProducts();
  return (
    <div className="grid grid-cols-12 gap-4 py-6 mx-auto max-w-7xl">
      {/* 왼쪽 카테고리 */}
      <aside className="col-span-2">
        <CategorySidebar />
      </aside>

      {/* 메인 콘텐츠 */}
      <section className="col-span-8 p-4 space-y-6 bg-white rounded-md shadow">
        {/* 메인 배너 */}
        <div className="flex items-center justify-center h-48 mb-6 text-2xl font-bold text-white bg-green-200 rounded-md">
          메인 배너 영역
        </div>

        {/* 추천 상품 */}
        <div>
          <h2 className="mb-4 text-xl font-bold">오늘의 추천상품</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {products.map((p) => (
              <ProductItem key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* 오른쪽 배너/광고 */}
      <aside className="col-span-2 space-y-4">
        <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md">
          광고 배너1
        </div>
        <div className="flex items-center justify-center h-40 bg-gray-200 rounded-md">
          광고 배너2
        </div>
      </aside>
    </div>
  );
}
