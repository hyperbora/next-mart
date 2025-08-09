import { upsertCartItem, deleteCartItem, getCartItem } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import { useCartStore } from "@/store/useCartStore";

export function useCartSync() {
  const session = useAppStore((state) => state.session);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);

  // 장바구니에 아이템 추가 및 DB 동기화
  async function addToCart(item: { id: number; quantity: number }) {
    if (session) {
      try {
        const existing = await getCartItem(session.user.id, item.id);
        await upsertCartItem(
          session.user.id,
          item.id,
          existing ? existing.quantity + item.quantity : item.quantity
        );
        addToCartStore(item);
      } catch (error) {
        console.error("장바구니 DB 저장 실패", error);
      }
    } else {
      addToCartStore(item);
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
