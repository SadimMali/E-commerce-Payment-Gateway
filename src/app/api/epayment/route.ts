import { createDelivery } from "@/services/deliveryService";
import { addOrderItems, createOrder } from "@/services/orderService";
import { createPayment, processKhaltiPayment } from "@/services/paymentService";
import { Cart } from "@/types/Cart.type";
import { Order } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

type CartDetails = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const _user = session?.user;

  let paymentMethod = "khalti";

  if (!session?.user) {
    return Response.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { price, deliveryDetails: delivery, cart } = await req.json();

  const cartDetails: Array<CartDetails> = cart?.map((product: Cart) => ({
    id: product.id,
    name: product.name,
    quantity: product.quantity,
    price: product.price,
  }));

  try {
    // create a user delivery details
    const newDelivery = await createDelivery(delivery);

    //create a new order
    const newOrder: Order = await createOrder(_user.id.toString(), newDelivery.id.toString());
    
    //add order Item
    await addOrderItems(newOrder.id.toString(), cart);
    
    //Khalti
    const payload = {
      return_url: `${process.env.NEXT_CLIENT_URL}/success`,
      website_url: process.env.NEXT_CLIENT_URL,
      amount: price.totalPrice * 100,
      purchase_order_id: newOrder.id.toString(),
      purchase_order_name: "o" + newOrder.id,
      customer_info: {
        name: `${delivery.firstName} ${delivery.lastName}`,
        email: delivery.email,
      },
      amount_breakdown: [
        {
          label: "Sub Price",
          amount: price.subTotalPrice * 100,
        },
        {
          label: "charge",
          amount: price.charge * 100,
        },
      ],
      product_details: cartDetails?.map((cart: CartDetails) => ({
        identity: cart.id.toString(),
        name: cart.name.toString(),
        total_price: cart.price,
        quantity: cart.quantity,
        unit_price: 100,
      })),

      merchant_username: process.env.KHALTI_MERCHANT_NAME,
    };

    const paymentData = await processKhaltiPayment(
      payload,
      process.env.KHALTI_SECRET_KEY || ""
    );

    if (paymentData) {
      await createPayment(paymentMethod, paymentData.pidx);
      return Response.json(
        { success: true, message: paymentData },
        { status: 200 }
      );
    }
  } catch (err: any) {
    console.log("error", err.message);
    return Response.json(
      { message: err.message || "Error occured" },
      { status: 500 }
    );
  }
}
