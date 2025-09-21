import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerClient();

  const { id } = await params;
  const { error } = await supabase.from("banners").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
