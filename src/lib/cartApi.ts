import { supabase } from "./supabaseClient";

export async function getCartItemsByUser(userId: string) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
}

export async function upsertCartItem(
  userId: string,
  productId: number,
  quantity: number
) {
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
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  if (error) throw error;
}
