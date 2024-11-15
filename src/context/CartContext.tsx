"use client";
import { ProductList } from "@/types/Products.type";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface Cart extends ProductList {
  quantity: number;
}
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

  //useEffect hook to run once when the component mount
  // This fetches the cart from the LocalStorage if available
  useEffect(() => {
    if (typeof window == "undefined") return;
    const storedCart = localStorage.getItem("cart");
    storedCart ? setCart(JSON.parse(storedCart)) : [];
  }, []);

  // useEffect hook to update localStorage whenever the cart changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
