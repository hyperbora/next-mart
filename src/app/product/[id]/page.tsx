import { getProductById } from "@/lib/productApi";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

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

  return <ProductDetailClient product={product} />;
}
