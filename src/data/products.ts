export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl?: string;
  desc?: string;
}

const products: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `테스트 상품${i + 1}`,
  price: 10000 + i * 2000,
  imageUrl: `https://picsum.photos/seed/product${i + 1}/300/300`,
  desc: `테스트 상품 ${i + 1}의 설명입니다.`,
}));

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
