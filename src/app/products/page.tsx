"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getErrorMessage } from "@/utils";
import { type Product } from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchResultProduct from "@/components/SearchResultProduct";
import SortButtons from "@/components/SortButtons";

export default function ProductsPageWithSuspense() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsPage />
    </Suspense>
  );
}

function ProductsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "inserted_at";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products/search?query=${encodeURIComponent(
            query
          )}&sort=${encodeURIComponent(sort)}`
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
      <SortButtons />
      <h1 className="mb-4 text-xl font-bold">
        {loading
          ? "검색 중..."
          : `검색 결과: “${query}” / 전체 ${products.length}개의 상품이 검색 되었습니다.`}
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
            <SearchResultProduct key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
