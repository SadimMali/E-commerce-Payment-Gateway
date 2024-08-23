"use client";

import { Products, PRODUCTS } from "@/utils/products";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  type Params = {
    id: string;
  };
  const params: Params = useParams();

  const productId: number = parseInt(params.id);
  const filterProduct: Products | undefined = PRODUCTS.find(
    (product) => product.id === productId
  );

  const [image, setImage] = useState(filterProduct?.img);

  const handleImageChange = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImage(target.src);
  };
  return (
    <main className="w-full h-screen">
      {/* breadcrumbs */}
      <div></div>
      <div className="flex flex-col md:flex-row py-2">
        {/* img */}
        <div className="w-full py-10 md:py-20 bg-gray-100">
          <div className="flex justify-center items-center">
            <img
              className=" w-56  md:w-80 h-full object-cover"
              src={image}
              alt="product image"
            />
          </div>
        </div>
        {/* content */}
        <div className="w-full flex flex-col md:px-10 lg:px-20 xl:px-32">
          <div className="flex text-md justify-between items-center w-full">
            <h3 className="font-bold text-lg">{filterProduct?.name}</h3>
            <p className="text-gray-400 font-semibold text-md">
              {filterProduct?.style}
            </p>
          </div>
          <p className="font-semibold text-md text-gray-400">
            {filterProduct?.subName}
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
            ${filterProduct?.price}
          </span>
          <p className="mb-3 text-sm text-gray-500">
            {" "}
            <span className="font-semibold text-md text-black">Colorway: </span>
            {filterProduct?.colorway}
          </p>
          <div className="flex gap-3 w-full ">
            <img
              src={filterProduct?.img}
              className="w-20 h-20 border hover:border-black cursor-pointer transition-shadow"
              onMouseOver={handleImageChange}
              alt=""
            />
            {filterProduct?.otherImgs.map((img, x) => (
              <img
                key={x}
                src={img}
                className="w-20 h-20 border hover:border-black cursor-pointer transition-shadow"
                onMouseOver={handleImageChange}
                alt=""
              />
            ))}
          </div>
          {/* cta buttons */}
          <div className="w-full flex gap-3 my-3">
            <button className="w-10/12  py-3 bg-black rounded-md text-white text-sm font-semibold hover:opacity-70 flex gap-2  items-center justify-center">
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </button>
            <button className="w-1/12 py-1 rounded-md bg-gray-200 flex items-center justify-center hover:opacity-85">
              <Heart className="w-4 h-4 border-black-1" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
