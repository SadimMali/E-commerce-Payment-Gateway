import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { pidx, transaction_id, purchase_order_id, status } = await req.json();

  const decodedOrderId = decodeURIComponent(purchase_order_id);
  const decodedPaymentId = decodeURIComponent(pidx);
  try {
    await prisma.payment.update({
      where: {
        id: decodedPaymentId,
      },
      data: {
        status,  
        transactionId: transaction_id,
      },
    });
    await prisma.order.update({
      where: {
        id: decodedOrderId,
      },
      data: {
        status: "confirm",
        paymentId: pidx,
      },
    });
    return Response.json(
      { success: true, message: "Order confirm" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.mesage || "Failed to confirm the order",
      },
      { status: 500 }
    );
  }
}
