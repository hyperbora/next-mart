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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerClient();
  const body = await req.json();

  const { title, image_url, link_url, is_active } = body;

  if (!title || !image_url) {
    return NextResponse.json(
      { error: "제목과 이미지 URL은 필수입니다." },
      { status: 400 }
    );
  }
  const { id } = await params;
  const { error } = await supabase
    .from("banners")
    .update({ title, image_url, link_url, is_active })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("banners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ banner: data });
}
