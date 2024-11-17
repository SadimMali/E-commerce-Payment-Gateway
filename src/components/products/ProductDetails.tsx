"use client";

import CartModal from "@/components/cart/CartModal";
import { useToast } from "@/components/hooks/use-toast";
import { CartContext } from "@/context/CartContext";
import { Cart } from "@/types/Cart.type";
import { ProductList } from "@/types/Products.type";
import { Car, Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useContext, useState } from "react";

export const ProductDetails = ({
  filterProduct,
}: {
  filterProduct: ProductList;
}) => {
  const { toast } = useToast();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [image, setImage] = useState(filterProduct?.img);

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    // Handle the case when cartContext is null
    return <div>Loading...</div>;
  }

  const {cart, setCart } = cartContext;


  if (!filterProduct) return notFound();

  const handleImageChange = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImage(target.src);
  };
  const handleAddCart = () => {
    if (!filterProduct) return;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === filterProduct.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, update the quantity
        const updatedCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("updated", updatedCart);
        return updatedCart;
      } else {
        // Add product to cart with a default quantity of 1
        const newCartItem: Cart = { ...filterProduct, quantity: 1 };
        return [...prevCart, newCartItem];
      }
    });

    toast({
      title: "Add product to cart",
      description: "Product added to cart successfully",
    });
    setIsOpenModal(true);
  };
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row py-2">
        {/* img */}
        <div className="w-full ">
          <div className="flex justify-center items-center bg-gray-100 w-full h-full">
            <div className="relative w-56 md:w-80  min-h-[200px] h-full">
              <Image
                className="object-cover"
                src={image}
                alt="product image"
                fill
                priority={true}
              />
            </div>
          </div>
          {/* description */}
          <div className="p-5">
            <h3 className="text-2xl font-bold mb-3">Details</h3>
            <div>
              <p className="font-medium text-sm lg:text-base mb-2">
                {" "}
                {filterProduct?.description}{" "}
              </p>
              <p className="mb-1 text-sm lg:text-base">
                <span className="font-semibold">Release Date:</span>{" "}
                <span className="text-black">
                  {filterProduct?.releaseDate?.toLocaleString() || "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="w-full flex flex-col p-5 md:px-10  ">
          <div className="flex text-md w-full justify-between md:flex-col lg:flex-row lg:justify-between lg:items-center">
            <h3 className="font-bold text-lg md:text-2xl">
              {filterProduct?.name}
            </h3>
            <p className="text-gray-400 font-semibold text-base">
              {filterProduct?.style}
            </p>
          </div>
          <p className="font-semibold text-md text-gray-400">
            {filterProduct?.subCategory.name}
          </p>
          <p className="flex items-center text-sm text-gray-500 gap-3">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, ex) => (
                <Star
                  key={ex}
                  className="w-4 h-4 fill-[#edcf5d] text-[#edcf5d]"
                />
              ))}
            </span>
            43 reviews
          </p>
          <span className="font-bold text-2xl py-8">
            Rs {filterProduct?.price}
          </span>
          <p className="mb-3 text-sm text-gray-500">
            {" "}
            <span className="font-semibold text-md text-black">Colorway: </span>
            {filterProduct.colorWay}
          </p>
          <div className="flex gap-3 w-full ">
            <div
              className="inline w-20 h-20 relative ring-1 ring-gray-300 hover:ring-black"
              onMouseOver={handleImageChange}
            >
              <Image
                fill
                src={filterProduct?.img}
                priority
                className="w-full h-full object-contain cursor-pointer transition-shadow"
                alt=""
              />
            </div>
            {filterProduct?.otherImg.map((img, x) => (
              <div
                key={img}
                className="inline w-20 h-20 relative ring-1 ring-gray-300 hover:ring-black"
                onMouseOver={handleImageChange}
              >
                <Image
                  fill
                  src={img}
                  priority
                  className="h-full w-full object-contain cursor-pointer transition-shadow"
                  alt=""
                />
              </div>
            ))}
          </div>
          {/* cta buttons */}
          <div className="w-full flex gap-3 my-3">
            <button
              className="w-10/12  py-3 bg-black rounded-md text-white text-sm font-semibold hover:opacity-70 flex gap-2  items-center justify-center"
              onClick={handleAddCart}
            >
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </button>
            <button className="w-1/12 py-1 rounded-md bg-gray-200 flex items-center justify-center hover:opacity-70">
              <Heart className="w-4 h-4 border-black-1 hover:opacity-70" />
            </button>
          </div>
          <p className="font-bold text-sm flex gap-2 items-center">
            <Car className="w-5 h-5" /> Free delivery on orders over $30
          </p>
        </div>
      </div>
      {/* Cart Modal */}
      <CartModal
        cart={filterProduct}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};
