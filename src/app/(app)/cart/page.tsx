"use client";

import CartItem from "@/components/cart/CartItem";
import { useToast } from "@/components/hooks/use-toast";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CartContext } from "@/context/CartContext";
import type { Cart } from "@/context/CartContext";
import Link from "next/link";
import React, { useContext } from "react";

export function calculatePrice(ch: number, cart: Array<Cart>) {
  // let  totalPrice = tp;
  let charge = ch;

  const subTotalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  if (subTotalPrice != 0 && subTotalPrice < 500) {
    charge = 50;
  }
  let totalPrice = charge + subTotalPrice;
  return {
    subTotalPrice: subTotalPrice,
    charge: charge,
    totalPrice: totalPrice,
  };
}

const Page = () => {
  const cartContext = useContext(CartContext);
  const { toast } = useToast();
  if (!cartContext) {
    // Handle the case when cartContext is null
    return <div>Loading...</div>;
  }
  const { cart, setCart } = cartContext;

  //Remove item from cart
  const onRemoveCart = (id: number) => {
    setCart((item) => item.filter((prev) => prev.id !== id));
    toast({
      title: "Remove product",
      description: "Remove product from cart succesfully",
    });
  };

  const price = calculatePrice(0, cart);

  return (
    <div>
      <MaxWidthWrapper>
        <section className="flex flex-col lg:flex-row md:px-5 xl:px-32 px-5 mt-16 gap-5">
          <article className="flex flex-col w-full lg:w-2/3 space-y-6">
            <section className="flex flex-col border p-2 order-2">
              <h3 className="text-lg md:text-xl font-bold text-red-500">
                Members get free shipping on orders $50+
              </h3>
              <p className="text-gray-500 text-md">
                Become a Nike Member for fast free shipping on orders $50+
              </p>
            </section>

            <section className="order-1 lg:order-2">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mb-5 lg:mb-0">
                <h4 className="text-2xl font-semibold">Bag</h4>
                <p className="text-lg block lg:hidden">
                  {" "}
                  {cart.length} items |{" "}
                  {cart.length ? <>&#36; {price?.totalPrice}</> : "-"}{" "}
                </p>
              </div>
              {cart.length === 0 && (
                <p className="hidden lg:block">
                  There are no items in the bag.
                </p>
              )}
              {cart.length > 0
                ? cart.map((c: Cart, i: number) => (
                    <CartItem item={c} key={i} onRemoveCart={onRemoveCart} />
                  ))
                : ""}
            </section>
          </article>
          <aside className="lg:w-1/3 md:px-5">
            <h3 className="text-2xl font-medium">Summary</h3>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Subtotal</span>
              {price.subTotalPrice ? (
                <span>&#36;{price.subTotalPrice}</span>
              ) : (
                "-"
              )}
            </div>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">
                Estimated Shipping & Handling
              </span>
              {price.charge ? <span>&#36;{price.charge}</span> : "0"}
            </div>
            <div className="w-full border px-2 mt-3" />
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Total</span>
              {price.totalPrice ? <span>&#36;{price.totalPrice}</span> : "-"}
            </div>
            <div className="w-full border mt-2" />

            <div className="mt-5">
              <Link href="/checkout">
                <button className="border border-black bg-black text-white rounded-lg py-3 w-full hover:opacity-80">Checkout</button>
              </Link>
            </div>
          </aside>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
