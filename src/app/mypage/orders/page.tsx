"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import toast from "react-hot-toast";
import { OrderStatus, OrderStatusLabel } from "@/constants/orderStatus";
import { getErrorMessage } from "@/utils";

interface Order {
  id: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const session = useAppStore((state) => state.session);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/orders/list", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          throw new Error(data.error);
        }
      } catch (err) {
        console.error(getErrorMessage(err));
        toast.error("주문 내역을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  if (!session) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">로그인이 필요합니다.</p>
        <Link href="/login" className="text-green-600 underline">
          로그인 하러가기
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">불러오는 중...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">주문 내역이 없습니다.</p>
        <Link href="/" className="text-green-600 underline">
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">주문 내역</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="flex items-center justify-between p-4 bg-white border rounded-md hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">주문번호: {order.id}</p>
              <p className="text-sm text-gray-500">
                주문일자: {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-sm">
                상태: {OrderStatusLabel[order.status as OrderStatus]}
              </p>
            </div>
            <Link
              href={`/orders/${order.id}`}
              className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
            >
              상세보기
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
