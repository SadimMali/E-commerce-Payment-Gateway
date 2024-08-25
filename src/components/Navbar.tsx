import React from "react";
import MaxWidthWraper from "./MaxWidthWrapper";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  let cart = []; // Dynamic render the cart item;
  const isUser = false;
  return (
    <nav className=" sticky z-[100] inset-x-0 w-full top-0 h-14 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWraper>
        <div className="h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-base">
            <span>E.com</span>
          </Link>
          <div className="flex items-center justify-between gap-5">
            <button className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 -right-4 -top-3">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="relative">
              <Heart className="h-6 w-6" />
              {cart.length > 0 && ( //TODO: : Change to whislist
                <span className="absolute flex items-center justify-center text-xs font-semibold w-4 h-4 p-2 border-2 rounded-full border-red-600 -right-4 -top-3">
                  {cart.length}
                </span>
              )}
            </button>

            {/* btns */}
            {isUser ? (
              <Link href="/user">User ✨</Link>
            ) : (
              <div className=" flex space-x-5 items-center justify-between h-full">
                <Link href="/sign-up">
                  <button>Sign up</button>
                </Link>
                <Link href="/sign-up">
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
