import { upsertCartItem, deleteCartItem } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import { useCartStore } from "@/store/useCartStore";

export function useCartSync() {
  const session = useAppStore((state) => state.session);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);

  // 장바구니에 아이템 추가 및 DB 동기화
  async function addToCart(item: { id: number; quantity: number }) {
    addToCartStore(item);
    if (session) {
      try {
        await upsertCartItem(session.user.id, item.id, item.quantity);
      } catch (error) {
        console.error("장바구니 DB 저장 실패", error);
      }
    }
  }

  // 장바구니 아이템 제거 및 DB 동기화
  async function removeFromCart(id: number) {
    removeFromCartStore(id);
    if (session) {
      try {
        await deleteCartItem(session.user.id, id);
      } catch (error) {
        console.error("장바구니 DB 삭제 실패", error);
      }
    }
  }

  return { addToCart, removeFromCart };
}
