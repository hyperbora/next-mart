import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: { id: string };
}

const products = [
  {
    id: 1,
    title: "테스트 상품1",
    price: 10000,
    desc: "테스트 상품 1의 설명입니다.",
  },
  {
    id: 2,
    title: "테스트 상품2",
    price: 12000,
    desc: "테스트 상품 2의 설명입니다.",
  },
];

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

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
