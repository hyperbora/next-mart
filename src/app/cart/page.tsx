"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getCartItemsByUser, deleteCartItem } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingImage from "@/components/LoadingImage";

export default function CartPage() {
  const session = useAppStore((state) => state.session);
  const { cartItems, setCartItems } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const data = await getCartItemsByUser(session.user.id);
        setCartItems(data);
      } catch (err) {
        console.error(err);
        toast.error("장바구니를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [session, setCartItems]);

  const handleRemove = async (productId: number) => {
    if (!session) return;
    try {
      await deleteCartItem(session.user.id, productId);
      setCartItems(cartItems.filter((item) => item.product_id !== productId));
      toast.success("삭제되었습니다.");
    } catch (err) {
      console.error(err);
      toast.error("삭제 중 오류가 발생했습니다.");
    }
  };

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

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">장바구니가 비어 있습니다.</p>
        <Link href="/" className="text-green-600 underline">
          쇼핑하러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">장바구니</h1>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.product_id}
            className="flex items-center gap-4 p-4 bg-white border rounded-md"
          >
            {item.product && (
              <>
                <LoadingImage
                  src={item.product?.image_url || "/file.svg"}
                  alt={item.product?.title || "상품 이미지"}
                  width={80}
                  height={80}
                  className="object-contain rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.product?.title}</p>
                  <p>₩{item.product?.price.toLocaleString()}</p>
                  <p>수량: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="text-red-500 hover:underline"
                >
                  삭제
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
