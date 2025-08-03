import { getProductById } from "@/data/products";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = getProductById(productId);

  if (!product) {
    return notFound(); // 없는 상품이면 404 처리
  }

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow">
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <div className="flex items-center justify-center h-64 mb-4 bg-gray-200 rounded-md">
        상품 이미지 영역
      </div>
      <p className="mb-2 font-bold text-green-600">
        ₩{product.price.toLocaleString()}
      </p>
      <p className="mb-6 text-gray-700">{product.desc}</p>
      <button className="px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700">
        장바구니 담기
      </button>
    </div>
  );
}
