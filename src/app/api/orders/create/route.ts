import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getCartItemsByUser } from "@/lib/cartApi";

export async function POST(req: Request) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return NextResponse.json(
        { error: "user_id가 필요합니다." },
        { status: 400 }
      );
    }

    // 장바구니 데이터 가져오기
    const cartItems = await getCartItemsByUser(user_id);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: "장바구니가 비어 있습니다." },
        { status: 400 }
      );
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);
    // 주문 생성
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id, total_amount: totalAmount }])
      .select()
      .single();

    if (orderError) throw orderError;

    // 주문 상품 추가
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // 장바구니 비우기
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user_id);

    if (clearError) throw clearError;

    return NextResponse.json({
      message: "주문이 생성되었습니다.",
      order_id: order.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "주문 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
