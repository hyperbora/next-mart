import { getProductById } from "@/data/products";
import { notFound } from "next/navigation";
import LoadingImage from "@/components/LoadingImage";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow">
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <div className="relative flex items-center justify-center h-64 mb-4 overflow-hidden bg-gray-200 rounded-md">
        {product.image_url ? (
          <LoadingImage
            src={product.image_url}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : (
          <span className="text-gray-400">이미지가 없습니다.</span>
        )}
      </div>
      <p className="mb-2 font-bold text-green-600">
        ₩{product.price?.toLocaleString()}
      </p>
      <p className="mb-6 text-gray-700">{product.description}</p>
      <button className="px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700">
        장바구니 담기
      </button>
    </div>
  );
}
