import { create } from "zustand";

interface CartItem {
  product_id: number;
  quantity: number;
  title?: string;
  price?: number;
  image_url?: string;
}

interface CartStore {
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (product_id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  setCartItems: (cartItems) => set({ cartItems }),
  addToCart: (item) => {
    const cartItems = get().cartItems;
    const existing = cartItems.find((i) => i.product_id === item.product_id);
    if (existing) {
      set({
        cartItems: cartItems.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ cartItems: [...cartItems, item] });
    }
  },
  removeFromCart: (product_id) => {
    set({
      cartItems: get().cartItems.filter((i) => i.product_id !== product_id),
    });
  },
  clearCart: () => set({ cartItems: [] }),
}));
