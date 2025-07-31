import { Product } from "@/types/global";
import Link from "next/link";

export default function ProductCard({ props }: { props: Product }) {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold">{props.name}</h2>
      <p className="text-gray-600">가격: {props.price.toLocaleString()}원</p>
      <Link
        href={`/products/${props.id}`}
        className="text-red-500 hover:underline"
      >
        자세히 보기
      </Link>
    </div>
  );
}
