import { Product } from "@/types/global";
import data from '@/data.json';

export async function getAllProducts(): Promise<Product[]> {
  return data;
}

export async function getProductById(id: string): Promise< Product | undefined> {
  return getAllProducts().then(products => products.find((product) => product.id === id));
}
