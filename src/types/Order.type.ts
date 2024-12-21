import { Delivery, Order, OrderItem, Payment, Product } from "@prisma/client";

export type OrderList = Order & { payment: Payment | null } & {
  delivery: Delivery | null;
} & { orderItems: (OrderItem & { product: Product })[] };