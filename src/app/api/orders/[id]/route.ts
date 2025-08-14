import { getOrderById } from "@/lib/orderApi";
import { NextResponse } from "next/server";
import { getErrorMessage } from "@/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await getOrderById(Number(id));
    if (!data) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }
    return NextResponse.json({ order: data });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(request, errorMessage);
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 400 });
  }
}
