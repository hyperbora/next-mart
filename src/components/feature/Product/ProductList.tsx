import ProductCard from "./ProductCard";
import products from "@/data.json"; 

export default function ProductList() {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} props={p} />
      ))}
    </div>
  );
}
