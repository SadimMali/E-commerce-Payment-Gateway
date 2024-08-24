"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getRandomProduct, Product, PRODUCTS } from "@/utils/products";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";

const CuratedForYouItem = () => {
  const [curatedForYouItem, setCuratedForYoutItem] = useState<Product[]>([]);
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
                <ProductCard item={item} />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CuratedForYouItem;
