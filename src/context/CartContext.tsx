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

const getCartFromLocalStorage = (): Cart[] => {
  // execute only if window is typeof object
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    console.log(typeof storedCart)
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<Cart[]>(getCartFromLocalStorage);

  //Store cart in localStorage whenever there are changes in cart item
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
