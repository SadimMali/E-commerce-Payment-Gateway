"use client"
import { CartContext } from '@/context/CartContext'
import { calculatePrice } from '@/utils/calculatePrice'
import Link from 'next/link'
import React, { useContext } from 'react'

const CartSummary = () => {
    const cartContext = useContext(CartContext);
    if(!cartContext) return null
    const {cart} = cartContext
    const price = calculatePrice(0, cart)
  return (
    <aside className="lg:w-1/3 md:px-5 pb-5">
    <h3 className="text-2xl font-medium">Summary</h3>
    <div className="flex w-full items-center justify-between mt-2">
      <span className="font-semibold">Subtotal</span>
      {price.subTotalPrice ? (
        <span>Rs {price.subTotalPrice}</span>
      ) : (
        "-"
      )}
    </div>
    <div className="flex w-full items-center justify-between mt-2">
      <span className="font-semibold">
        Estimated Shipping & Handling
      </span>
      {price.charge ? <span>Rs {price.charge}</span> : "0"}
    </div>
    <div className="w-full border px-2 mt-3" />
    <div className="flex w-full items-center justify-between mt-2">
      <span className="font-semibold">Total</span>
      {price.totalPrice ? <span>Rs {price.totalPrice}</span> : "-"}
    </div>
    <div className="w-full border mt-2" />

    <div className="mt-5">
      <Link href="/checkout">
        <button className="border border-black bg-black text-white rounded-lg py-3 w-full hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed" disabled={!cart.length}>Checkout</button>
      </Link>
    </div>
  </aside>
  )
}

export default CartSummary