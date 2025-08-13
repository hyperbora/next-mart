import { NextResponse } from "next/server";
import { createOrder, isOrderError } from "@/lib/orderApi";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    const orderId = await createOrder(user_id);
    return NextResponse.json(
      {
        message: "주문이 생성되었습니다.",
        order_id: orderId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    let error;
    let status;
    if (isOrderError(err)) {
      error = err.message;
      status = err.status;
    } else {
      error = "주문 생성 중 오류가 발생했습니다.";
      status = 500;
    }
    return NextResponse.json({ error }, { status });
  }
}
