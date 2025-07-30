import ProductList from "@/components/feature/Product/ProductList";
import { getAllProducts } from "@/repository/productRepository";

export default async function Home() {
  const products = await getAllProducts();
  return <>{<ProductList products={products} />}</>;
}
