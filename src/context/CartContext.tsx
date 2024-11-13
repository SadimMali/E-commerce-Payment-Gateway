"use client"
import { ProductList } from "@/types/Products.type";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";


export interface Cart extends ProductList {
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
