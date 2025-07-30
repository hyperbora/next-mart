import { getProductById } from "@/repository/productRepository";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function Product({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}
