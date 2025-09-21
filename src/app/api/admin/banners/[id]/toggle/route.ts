import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { is_active } = body;

  const { id } = await params;
  const supabase = await createServerClient();
  const { error } = await supabase
    .from("banners")
    .update({ is_active })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
