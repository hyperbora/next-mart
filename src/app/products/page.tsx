"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingImage from "@/components/LoadingImage";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getErrorMessage } from "@/utils";
import { type Product } from "@/types";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        } else {
          throw new Error(data.error || "상품을 불러오지 못했습니다.");
        }
      } catch (err) {
        toast.error(getErrorMessage(err));
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-4 text-xl font-bold">
        검색 결과: &ldquo;{query}&rdquo;
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-2 border rounded">
              {product.image_url && (
                <LoadingImage
                  src={product.image_url}
                  alt={product.title}
                  className="object-cover w-full h-32"
                  width={300}
                  height={300}
                />
              )}
              <p className="mt-2 text-sm line-clamp-2">{product.title}</p>
              <p className="font-bold text-green-600">
                ₩{product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
