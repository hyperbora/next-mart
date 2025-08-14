import { QueryData } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/client";

export async function getCartItemsByUser(userId: string) {
  const supabase = createClient();
  const cartItemsWithProductQuery = supabase
    .from("cart_items")
    .select("product_id, quantity, products(title, price, image_url)")
    .eq("user_id", userId);

  type CartItemsWithProduct = QueryData<typeof cartItemsWithProductQuery>;
  const { data, error } = await cartItemsWithProductQuery;
  if (error) throw error;

  const cartItemsWithProduct: CartItemsWithProduct = data;
  return cartItemsWithProduct.map((item) => {
    const { products, ...rest } = item;
    const newItem = {
      ...rest,
      product: Array.isArray(products) ? products[0] : products,
    };
    return newItem;
  });
}

export async function upsertCartItem(
  userId: string,
  productId: number,
  quantity: number
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .upsert(
      { user_id: userId, product_id: productId, quantity },
      { onConflict: "user_id,product_id" }
    );
  if (error) throw error;
  return data;
}

export async function deleteCartItem(userId: string, productId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) throw error;
}

export async function getCartItem(userId: string, productId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}
