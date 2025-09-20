import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { title, image_url, link_url, is_active } = await req.json();

  if (!title || title.trim().length === 0) {
    return NextResponse.json({ error: "제목은 필수입니다." }, { status: 400 });
  }

  if (!image_url || !isValidUrl(image_url)) {
    return NextResponse.json(
      { error: "유효한 이미지 URL을 입력해주세요." },
      { status: 400 }
    );
  }

  if (link_url && !isValidUrl(link_url)) {
    return NextResponse.json(
      { error: "유효한 링크 URL을 입력해주세요." },
      { status: 400 }
    );
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("banners")
    .insert([{ title, image_url, link_url, is_active }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ banner: data });
}

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
