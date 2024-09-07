import axios from "axios";

export async function POST(req: Request) {
    const {price} = await req.json();
    const headers = {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
    }
  try {

    // const payload = {
    //   return_url: "http://localhost:3000/return/",
    //   website_url: "http://localhost:3000/",
    //   amount: price.totalPrice,
    //   purchase_order_id: "test12",
    //   purchase_order_name: "test",
    //   customer_info: {
    //     name: "Khalti Bahadur",
    //     email: "example@gmail.com",
    //     phone: "9800000123",
    //   },
    //   amount_breakdown: [
    //     {
    //       label: "Sub Price",
    //       amount: price.subTotalPrice,
    //     },
    //     {
    //       label: "Charge",
    //       amount: price.charge,
    //     },
    //   ],
    //   product_details: [
    //     {
    //       identity: "1234567890",
    //       name: "Khalti logo",
    //       total_price: 306,
    //       quantity: 1,
    //       unit_price: 306,
    //     },
    //   ],
    //   merchant_username: process.env.KHALTI_MERCHANT_NAME,
    //   merchant_extra: "merchant_extra",
    // };
    const payload = {
      "return_url": "http://localhost:3000/callback",
      "website_url": "http://localhost:3000/",
      "amount": 1300,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      "customer_info": {
          "name": "Khalti Bahadur",
          "email": "example@gmail.com",
          "phone": "9800000123"
      },
      "amount_breakdown": [
          {
              "label": "Mark Price",
              "amount": 1000
          },
          {
              "label": "VAT",
              "amount": 300
          }
      ],
      "product_details": [
          {
              "identity": "1234567890",
              "name": "Khalti logo",
              "total_price": 1300,
              "quantity": 1,
       "unit_price": 1300
          }
      ],
      "merchant_username": "merchant_name",
      "merchant_extra": "merchant_extra"
    }
    const res = await axios.post(
      process.env.KHALTI_URL || '',
      payload,
      {headers}
    );
    console.log(res.data); // Use res.data to see the response body
    return Response.json({success: true, message: res.data}, {status: 200})
  } catch (err) {
    console.log("error", err);
    return Response.json({ message: "hello" }, { status: 500 });
  }
}
