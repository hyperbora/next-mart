import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createServerClient();
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";
  const sort = url.searchParams.get("sort") || "inserted_at";

  let orderColumn;

  if (sort === "price_asc") {
    orderColumn = { column: "price", ascending: true };
  } else if (sort === "price_desc") {
    orderColumn = { column: "price", ascending: false };
  } else {
    orderColumn = { column: "inserted_at", ascending: false };
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("title", `%${query}%`)
    .order(orderColumn.column, { ascending: orderColumn.ascending });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ products: data });
}
