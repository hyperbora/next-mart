export enum OrderStatus {
  Pending = "pending",
  Paid = "paid",
  Shipped = "shipped",
  Canceled = "canceled",
}

export const OrderStatusLabel: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "대기 중",
  [OrderStatus.Paid]: "결제 완료",
  [OrderStatus.Shipped]: "배송 중",
  [OrderStatus.Canceled]: "취소됨",
};
