"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Product, PRODUCTS } from "@/utils/products";
import { Car, Heart, ShoppingBag, Star } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  type Params = {
    id: string;
  };
  const params: Params = useParams();

  const productId: number = parseInt(params.id, 10); //radix 10

  const filterProduct: Product | undefined = PRODUCTS.find(
    (product) => product.id === productId
  );

  if (!filterProduct) return notFound();

  const [image, setImage] = useState(filterProduct?.img);

  const handleImageChange = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    setImage(target.src);
  };
  return (
    <main className="w-full h-full">
      <MaxWidthWrapper>
        {/* breadcrumbs */}
        <div></div>
        <div className="flex flex-col-reverse md:flex-row py-2">
          {/* img */}
          <div className="w-full ">
            <div className="flex justify-center items-center bg-gray-100 w-full">
              <img
                className=" w-56  md:w-80 h-full object-cover"
                src={image}
                alt="product image"
              />
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
                               <span className="font-semibold">Release Date:</span> <span className="text-black">{filterProduct?.releaseDate || 'N/A'}</span>
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
              <span className="font-semibold text-md text-black">
                Colorway:{" "}
              </span>
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
              <button className="w-1/12 py-1 rounded-md bg-gray-200 flex items-center justify-center hover:opacity-70">
                <Heart className="w-4 h-4 border-black-1 hover:opacity-70" />
              </button>
            </div>
            <p className="font-bold text-sm flex gap-2 items-center">
              <Car className="w-5 h-5" /> Free delivery on orders over $30
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default page;
