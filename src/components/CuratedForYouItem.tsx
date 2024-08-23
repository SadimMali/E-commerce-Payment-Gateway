"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getRandomProduct, Products, PRODUCTS } from "@/utils/products";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

const CuratedForYouItem = () => {
  const [curatedForYouItem, setCuratedForYoutItem] = useState<Products[]>([]);
  useEffect(() => {
    setCuratedForYoutItem(getRandomProduct(PRODUCTS, 6));
  }, []);

  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {curatedForYouItem.map((item, ex) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Link href={`/product/${item.id}`}>
                <Card className="aspect-square h-full">
                  <CardHeader className="h-full w-full">
                    <img
                      src={item.img}
                      className="max-w-full h-full object-contain"
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col justify-center ">
                    <div className="flex justify-between items-center">
                      <p className=" text-sm  text-gray-500"> <span>{item.subCategory}</span> <Star className="inline-block w-5 h-5 mb-1 text-[#edcf5d] fill-[#edcf5d]" /> 4.9 </p>
                    </div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="font-semibold text-md"> ${item.price}</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CuratedForYouItem;
