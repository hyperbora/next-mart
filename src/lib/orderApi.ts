import { supabase } from "@/lib/supabaseServer";

export interface Order {
  id: number;
  status: string;
  created_at: string;
  total_amount: number;
}

export interface OrderWithItems {
  id: number;
  status: string;
  created_at: string;
  order_items: {
    quantity: number;
    product: {
      title: string;
      price: number;
      image_url: string;
    };
  }[];
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

export async function getOrderById(id: number): Promise<OrderWithItems> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      created_at,
      order_items (
        quantity,
        products (
          title,
          price,
          image_url
        )
      )
    `
    )
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  const { order_items, ...rest } = data;
  const newOrderItems = Array.isArray(order_items)
    ? order_items.map((item) => ({
        quantity: item.quantity,
        product: Array.isArray(item.products)
          ? item.products[0]
          : item.products,
      }))
    : [];

  const newData = {
    ...rest,
    order_items: newOrderItems,
  };
  return newData as OrderWithItems;
}
