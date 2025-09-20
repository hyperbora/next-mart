import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerClient();

  const { error } = await supabase.from("banners").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
