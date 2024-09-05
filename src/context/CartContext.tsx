"use client"
import { Product } from "@/utils/products";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";


export interface Cart extends Product {
    quantity: number;
}
interface CartContextType {
    cart: Cart[],
    setCart: Dispatch<SetStateAction<Cart[]>>
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({children}: {children: React.ReactNode})=>{
    const [cart, setCart] = useState<Cart[]>([]);
    return(
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}
