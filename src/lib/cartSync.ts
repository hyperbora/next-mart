import { upsertCartItem, deleteCartItem, getCartItem } from "@/lib/cartApi";
import { useAppStore } from "@/store/useAppStore";
import { useCartStore } from "@/store/useCartStore";
import { type Product, type CartItem } from "@/store/useCartStore";

export function useCartSync() {
  const session = useAppStore((state) => state.session);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCartStore = useCartStore((state) => state.removeFromCart);
  const updateCartQuantityStore = useCartStore(
    (state) => state.updateCartQuantity
  );

  // 장바구니에 아이템 추가 및 DB 동기화
  async function addToCart(item: {
    product_id: number;
    quantity: number;
    product: Product;
  }) {
    addToCartStore(item);
    if (session) {
      try {
        const existing = await getCartItem(session.user.id, item.product_id);
        await upsertCartItem(
          session.user.id,
          item.product_id,
          existing ? existing.quantity + item.quantity : item.quantity
        );
      } catch (error) {
        console.error("장바구니 DB 저장 실패", error);
      }
    }
  }

  // 장바구니 아이템 제거 및 DB 동기화
  async function removeFromCart(product_id: number) {
    removeFromCartStore(product_id);
    if (session) {
      try {
        await deleteCartItem(session.user.id, product_id);
      } catch (error) {
        console.error("장바구니 DB 삭제 실패", error);
      }
    }
  }

  async function updateCartQuantity(item: CartItem) {
    const newItem = { ...item, quantity: Math.max(item.quantity, 1) };
    updateCartQuantityStore(newItem);
    if (!session) {
      return;
    }
    await upsertCartItem(session.user.id, newItem.product_id, newItem.quantity);
  }

  return { addToCart, removeFromCart, updateCartQuantity };
}
