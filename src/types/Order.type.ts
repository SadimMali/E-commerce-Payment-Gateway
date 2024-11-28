import { Delivery, Order, OrderItem, Payment } from "@prisma/client";

export type OrderList = Order & { payment: Payment | null } & {
  delivery: Delivery | null;
} & { orderItems: OrderItem[] | null };
