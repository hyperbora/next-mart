"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { useCartStore } from "@/store/useCartStore";
import { getCartItemsByUser } from "@/lib/cartApi";

export default function AuthCartSync() {
  const session = useAppStore((state) => state.session);
  const setCartItems = useCartStore((state) => state.setCartItems);

  useEffect(() => {
    if (session) {
      getCartItemsByUser(session.user.id).then(setCartItems);
    } else {
      setCartItems([]);
    }
  }, [session, setCartItems]);

  return null;
}
