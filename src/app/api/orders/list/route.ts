import { supabase } from "@/lib/supabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("orders")
    .select("id, status, created_at, total_amount")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data });
}
