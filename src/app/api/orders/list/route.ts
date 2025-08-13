import { getAllOrders } from "@/lib/orderApi";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();
    const data = await getAllOrders(user_id);
    return NextResponse.json({ orders: data });
  } catch (error) {
    console.error("주문 조회 실패:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
