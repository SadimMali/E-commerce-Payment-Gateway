"use client";
import React, { useContext } from "react";
import MaxWidthWraper from "./MaxWidthWrapper";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

const Navbar = () => {
  const { data: session, status } = useSession(); // Get both session data and status
  const user: User = session?.user;

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <div>Loading cart...</div>;
  }

  const { cart } = cartContext;
  const quantity = cart.reduce((acc, element) => {
    return acc + element.quantity;
  }, 0);

  const wish = []; // Replace this with actual wishlist logic
  // Handle the loading state for the entire navbar
  if (status === "loading") {
    return (
      <nav className="sticky z-[100] inset-x-0 w-full top-0 h-14 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWraper>
          <div className="h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold text-base">
              <span>E.com</span>
            </Link>
            <div className="flex items-center justify-between gap-5">
              {/* Show loading indicator or skeletons */}
              <div className="flex space-x-5 items-center justify-between h-full">
                <button className="bg-gray-200 w-24 h-8 animate-pulse rounded-md" />
                <button className="bg-gray-200 w-24 h-8 animate-pulse rounded-md" />
              </div>
            </div>
          </div>
        </MaxWidthWraper>
      </nav>
    );
  }

  return (
    <nav className="sticky z-[100] inset-x-0 w-full top-0 h-14 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWraper>
        <div className="h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-base">
            <span>E.com</span>
          </Link>
          <div className="flex items-center justify-between gap-5">
            <Link href="/cart">
              <button className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 bg-red-600 text-white -right-4 -top-3">
                    {quantity}
                  </span>
                )}
              </button>
            </Link>

            <button className="relative">
              <Heart className="h-6 w-6" />
              {wish.length > 0 && ( // TODO: : Change to wishlist logic
                <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 -right-4 -top-3">
                  {wish.length}
                </span>
              )}
            </button>

            {/* Show user info or Sign in / Sign up buttons */}
            {user ? (
              <Link href="/user">{user.username || "user"} ✨</Link>
            ) : (
              <div className="flex space-x-5 items-center justify-between h-full">
                <Link href="/sign-up">
                  <button>Sign up</button>
                </Link>
                <Link href="/sign-in">
                  <button>Sign in</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWraper>
    </nav>
  );
};

export default Navbar;
