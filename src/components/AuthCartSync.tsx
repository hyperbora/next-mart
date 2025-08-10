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
      getCartItemsByUser(session.user.id).then((items) => {
        setCartItems(
          items.map((i) => ({ product_id: i.product_id, quantity: i.quantity }))
        );
      });
    } else {
      setCartItems([]);
    }
  }, [session, setCartItems]);

  return null;
}
