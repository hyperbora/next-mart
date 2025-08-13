import { getAllOrders } from "@/lib/orderApi";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAllOrders();
    return NextResponse.json({ orders: data });
  } catch (error) {
    console.error("주문 조회 실패:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
