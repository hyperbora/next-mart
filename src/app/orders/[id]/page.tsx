"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LoadingImage from "@/components/LoadingImage";
import { OrderStatus, OrderStatusLabel } from "@/constants/orderStatus";

type OrderItem = {
  product: {
    title: string;
    price: number;
    image_url: string;
  };
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
};

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/orders/${params.id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "주문 조회 실패");
        }
        setOrder(data.order);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [params.id]);

  if (loading) return <div className="p-6 text-center">불러오는 중...</div>;
  if (errorMsg)
    return <div className="p-6 text-center text-red-600">{errorMsg}</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">주문 상세</h1>
      <p className="mb-4 text-gray-500">
        주문번호: {order?.id} | 주문일:{" "}
        {new Date(order?.created_at!).toLocaleString()} | 상태:{" "}
        <span className="font-semibold">
          {OrderStatusLabel[order?.status as OrderStatus]}
        </span>
      </p>
      <ul className="space-y-4">
        {order?.order_items.map((item: OrderItem, idx: number) => (
          <li
            key={idx}
            className="flex items-center gap-4 p-4 bg-white border rounded-md"
          >
            <LoadingImage
              src={item.product.image_url || "/file.svg"}
              alt={item.product.title || "상품 이미지"}
              width={80}
              height={80}
              className="object-contain rounded-md"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.product.title}</p>
              <p>₩{item.product.price.toLocaleString()}</p>
              <p>수량: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
