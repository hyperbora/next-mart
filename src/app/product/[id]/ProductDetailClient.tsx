"use client";

import { useCartStore } from "@/store/useCartStore";
import LoadingImage from "@/components/LoadingImage";
import toast from "react-hot-toast";

interface ProductDetailClientProps {
  product: {
    id: number;
    title: string;
    price: number;
    image_url?: string;
    description?: string;
  };
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      quantity: 1,
    });
    toast.success("장바구니에 담겼습니다!");
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded shadow">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded w-80 h-80">
          <LoadingImage
            src={product.image_url ?? "/file.svg"}
            alt={product.title}
            className="object-contain w-full h-full"
            width={320}
            height={320}
          />
        </div>
      </div>
      <h1 className="mb-2 text-2xl font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700">
        {product.description || "설명이 없습니다."}
      </p>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-semibold text-green-700">
          {product.price.toLocaleString()}원
        </span>
        <button
          className="px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
          onClick={handleAddToCart}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
