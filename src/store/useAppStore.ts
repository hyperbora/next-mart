import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface AppState {
  // 로그인 세션
  session: Session | null;
  setSession: (session: Session | null) => void;

  // 장바구니
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;

  // UI 상태
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // 세션
  session: null,
  setSession: (session) => set({ session }),

  // 장바구니
  cart: [],
  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  clearCart: () => set({ cart: [] }),

  // UI 상태
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
