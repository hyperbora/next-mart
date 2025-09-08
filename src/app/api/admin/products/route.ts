import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils";
import { createServerClient } from "@/utils/supabase/server";
import { createProduct, Product } from "@/lib/productApi";

export async function POST(req: Request) {
  try {
    const supabase = await createServerClient();

    const product: Product = await req.json();
    const { title, price } = product;

    if (!title || !price) {
      return NextResponse.json(
        { error: "상품명과 가격은 필수입니다." },
        { status: 400 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "인증 실패" }, { status: 401 });
    }

    const { data: roles } = await supabase
      .from("roles")
      .select("role")
      .eq("user_id", user.id);

    if (!roles?.some((r) => r.role === "admin")) {
      return NextResponse.json({ error: "권한 없음" }, { status: 403 });
    }

    const productId = await createProduct(product);

    return NextResponse.json({ productId: productId }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}
