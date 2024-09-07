"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useContext } from "react";
import { calculatePrice } from "../cart/page";
import { CartContext } from "@/context/CartContext";
import KhaltiPayment from "@/components/payment/KhaltiPayment";

const page = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  const price = calculatePrice(0, cartContext.cart);

  const user = {
    name: "Sadim Mali",
    email: "sadimmalakar77@gmail.com",
    phonenumber: "9749497621",
  };
  return (
    <div>
      <MaxWidthWrapper>
        <div>
          <h3 className="text-lg font-semibold text-center">Checkout</h3>
        </div>
        <div className="flex lg:px-32 ">
          <div className="w-2/3">
            <h3>payment</h3>

            {/* esewa */}
            <KhaltiPayment price={price} user={user} cart={cartContext.cart} />
          </div>
          <div className="w-1/3">
            <div className="mb-10">
              <h4 className="text-xl font-semibold">In Your Bag</h4>
            </div>

            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Subtotal</span>
              {price.subTotalPrice ? (
                <span>&#36;{price.subTotalPrice}</span>
              ) : (
                "-"
              )}
            </div>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Estimated Shipping</span>
              {price.charge ? <span>&#36;{price.charge}</span> : "0"}
            </div>
            <div className="w-full border px-2 mt-3" />
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Total</span>
              {price.totalPrice ? <span>&#36;{price.totalPrice}</span> : "-"}
            </div>
            <div className="w-full border mt-2" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
