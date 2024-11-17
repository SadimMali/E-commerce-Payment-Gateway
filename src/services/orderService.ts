import { prisma } from "@/lib/prisma";

export async function createOrder(userId: string, deliveryId: string) {
  return await prisma.order.create({
    data: {
      userId,
      orderDate: new Date(),
      status: "PENDING",
      deliveryId: deliveryId,
    },
  });
}

export async function addOrderItems(orderId: string, cart: any[]) {
  return await Promise.all(
    cart.map(async (item) => {
      return await prisma.orderItem.create({
        data: {
          orderId,
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.quantity * item.price,
        },
      });
    })
  );
}

export async function updateOrder(
  orderId: string,
  pid: string,
  deliveryId: string
) {
  return await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "CONFIRM",
      paymentId: pid,
      deliveryId: deliveryId,
    },
  });
}