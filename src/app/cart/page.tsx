"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getCartItemsByUser } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import { useCartSync } from "@/lib/cartSync";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingImage from "@/components/LoadingImage";
import ConfirmModal from "@/components/ConfirmModal";

export default function CartPage() {
  const session = useAppStore((state) => state.session);
  const { cartItems, setCartItems } = useCartStore();
  const [loading, setLoading] = useState(true);
  const { removeFromCart } = useCartSync();
  const [removeTarget, setRemoveTarget] = useState<number | null>(null);

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
    setRemoveTarget(productId);
  };

  const confirmRemove = async () => {
    if (!session || removeTarget === null) return;
    try {
      await removeFromCart(removeTarget);
      toast.success("삭제되었습니다.");
    } catch (err) {
      console.error(err);
      toast.error("삭제 중 오류가 발생했습니다.");
    } finally {
      setRemoveTarget(null);
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

      {/* 모달 */}
      {removeTarget !== null && (
        <ConfirmModal
          title="장바구니 삭제"
          message="정말로 이 상품을 장바구니에서 삭제하시겠습니까?"
          confirmText="삭제"
          onConfirm={confirmRemove}
          onCancel={() => setRemoveTarget(null)}
        />
      )}

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
                  <Link
                    href={`/product/${item.product_id}`}
                    className="transition-colors cursor-pointer hover:underline hover:text-green-600"
                  >
                    <p className="font-semibold">{item.product?.title}</p>
                  </Link>
                  <p>₩{item.product?.price.toLocaleString()}</p>
                  <p>수량: {item.quantity}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.product_id)}
                  className="px-3 py-1 text-lg text-red-600 transition-colors cursor-pointer "
                >
                  ✕
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
