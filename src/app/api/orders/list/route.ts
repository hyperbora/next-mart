import { getAllOrders } from "@/lib/orderApi";
import { getErrorMessage } from "@/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getAllOrders();
    return NextResponse.json({ orders: data });
  } catch (err) {
    console.error("주문 조회 실패:", err);
    const errorMessage = getErrorMessage(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
