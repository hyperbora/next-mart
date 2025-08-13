"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getCartItemsByUser } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";

export default async function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const session = useAppStore((state) => state.session);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const paymentSuccess = await mockPaymentRequest();

      if (paymentSuccess) {
        toast.success("결제가 완료되었습니다.");

        const res = await fetch("/api/orders", {
          method: "POST",
        });

        if (!res.ok) throw new Error("주문 생성 실패");

        const order = await res.json();

        toast.success(`주문이 완료되었습니다. 주문번호: ${order.order_id}`);
        router.push(`/orders/${order.id}`);
      } else {
        toast.error("결제에 실패했습니다. 결제 수단 또는 정보를 확인해주세요.");
      }
    } catch (error) {
      console.error(error);
      toast.error("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const mockPaymentRequest = () =>
    new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
        resolve(success);
      }, 1000);
    });

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

  const cartItems = await getCartItemsByUser(session.user.id);
  const total_amount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">결제하기</h1>
      <p className="mb-6">총 결제 금액: {total_amount.toLocaleString()}원</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={isProcessing}
        onClick={handlePayment}
      >
        {isProcessing ? "결제 처리 중..." : "결제하기"}
      </button>
    </div>
  );
}
