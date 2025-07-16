'use client'

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} props={p} />
      ))}
    </div>
  );
}
