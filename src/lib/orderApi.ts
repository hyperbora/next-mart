import { supabase } from "@/lib/supabaseServer";

export interface Order {
  id: number;
  status: string;
  created_at: string;
  total_amount: number;
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("id, status, created_at, total_amount")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}
