"use client";
import { Cart } from "@/types/Cart.type";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isMouted, setIsMouted] = useState<boolean>(false);

  //useEffect hook to run once when the component mount
  // This fetches the cart from the LocalStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) setCart(JSON.parse(storedCart));
      setIsMouted(true);
    }
  }, []);

  // useEffect hook to update localStorage whenever the cart changes
  useEffect(() => {
    if (isMouted && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [isMouted, cart]); 
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
