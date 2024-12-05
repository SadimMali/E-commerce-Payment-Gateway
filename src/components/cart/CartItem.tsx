"use client";
import CartItemCard from "@/components/cart/CartItemCard";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useToast } from "../hooks/use-toast";
import { calculatePrice } from "@/utils/calculatePrice";
import { Cart } from "@/types/Cart.type";
import { useSession } from "next-auth/react";

const CartItem = () => {
  const cartContext = useContext(CartContext);

  const [userCart, setUserCart] = useState<Array<Cart>>([]);

  const { toast } = useToast();

  const { data: session } = useSession();

  useEffect(() => {
    if (cartContext && session?.user) {
      setUserCart(
        cartContext.cart.filter((cart) => cart.userId === session.user.id)
      );
    }
  }, [cartContext, session?.user]);

  if (!cartContext) {
    // Handle the case when cartContext is null
    return <div>Loading...</div>;
  }
  const { cart, setCart } = cartContext;

  const onRemoveCart = (id: string) => {
    setCart((item) => item.filter((prev) => prev.id !== id));
    toast({
      title: "Remove product",
      description: "Remove product from cart successfully",
    });
  };

  const price = calculatePrice(0, cart);
  return (
    <section className="order-1 lg:order-2">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start mb-5 lg:mb-0">
        <h4 className="text-2xl font-semibold">Bag</h4>
        <p className="text-lg block lg:hidden">
          {" "}
          {cart.length} items |{" "}
          {cart.length ? <>&#36; {price?.totalPrice}</> : "-"}{" "}
        </p>
      </div>

      <div className="flex flex-col gap-4 ">
        {userCart.length > 0 && session?.user ? (
          userCart.map((c: Cart) => (
            <CartItemCard item={c} key={c.id} onRemoveCart={onRemoveCart} />
          ))
        ) : (
          <p>There are no items in the bag.</p>
        )}
      </div>
    </section>
  );
};

export default CartItem;
