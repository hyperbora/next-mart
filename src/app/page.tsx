import ProductList from "@/components/feature/Product/ProductList";
import data from "@/data.json";

export default function Home() {
  return <>{<ProductList products={data} />}</>;
}
