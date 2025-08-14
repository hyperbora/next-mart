import { createClient } from "@/lib/supabaseServer";
import { getCartItemsByUser } from "./cartApi";

export interface Order {
  id: number;
  status: string;
  created_at: string;
  total_amount: number;
}

export interface OrderItem {
  quantity: number;
  product: {
    title: string;
    price: number;
    image_url: string;
  };
}

export interface OrderWithItems {
  id: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

export interface OrderError extends Error {
  readonly status: number;
}

export abstract class OrderBaseError extends Error implements OrderError {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class OrderMissingUserIdError extends OrderBaseError {
  constructor() {
    super("user_id가 필요합니다.", 400);
  }
}

export class OrderEmptyCartError extends OrderBaseError {
  constructor() {
    super("장바구니가 비어 있습니다.", 400);
  }
}

export function isOrderError(error: unknown): error is OrderError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as OrderError).status === "number"
  );
}

export async function getAllOrders(user_id: string): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, status, created_at, total_amount")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getOrderById(id: number): Promise<OrderWithItems> {
  const supabase = await createClient();
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

export async function createOrder(user_id: string): Promise<number> {
  if (!user_id) {
    throw new OrderMissingUserIdError();
  }
  const cartItems = await getCartItemsByUser(user_id);
  if (!cartItems || cartItems.length === 0) {
    throw new OrderEmptyCartError();
  }
  const totalAmount = cartItems.reduce((sum: number, item: OrderItem) => {
    return sum + item.quantity * item.product.price;
  }, 0);
  const supabase = await createClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([{ user_id, total_amount: totalAmount }])
    .select()
    .single();
  if (orderError) {
    throw orderError;
  }
  const orderItems = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw itemsError;
  }
  const { error: clearError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user_id);

  if (clearError) {
    throw clearError;
  }
  return order.id as number;
}
