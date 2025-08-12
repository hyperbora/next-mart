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

  return NextResponse.json({ order: data });
}
