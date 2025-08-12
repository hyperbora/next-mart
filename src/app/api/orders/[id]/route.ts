import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
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
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
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

  return NextResponse.json({ order: newData });
}
