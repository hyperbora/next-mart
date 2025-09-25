import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createServerClient();
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("title", `%${query}%`)
    .order("inserted_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ products: data });
}
