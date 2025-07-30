import { Product } from "@/types/global";
import ProductCard from "./ProductCard";

export default function ProductList(prop: { products: Product[] }) {
  const { products } = prop;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} props={p} />
      ))}
    </div>
  );
}
