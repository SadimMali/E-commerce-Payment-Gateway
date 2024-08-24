"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { CATEGORY_FILTERS, Product, PRODUCTS } from "@/utils/products";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category == "all") setFilteredProducts(PRODUCTS);
    else
      setFilteredProducts(
        PRODUCTS.filter(
          (product) =>
            product.category == category || product.subCategory == category
        )
      );
  }, [category]);

  //fn to set searchParams based on the argument passed
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <main>
      <MaxWidthWrapper>
        {/* filter */}
        <div className="py-5 md:py-10 flex gap-4 flex-wrap">
          {CATEGORY_FILTERS.map((filter) => (
            <button
              className={cn(
                "border-2 px-2 py-1 border-gray-300 hover:border-black transition-all",
                { "border-black": filter.name === category }
              )}
              key={filter.id}
              onClick={() => updateSearchParams("category", filter.name)}
            >
              <span className="text-sm">{filter.name}</span>
            </button>
          ))}
        </div>
        <p className="text-base mb-5">
          <span className="font-semibold">Showing results:</span>{" "}
          {filteredProducts.length}
        </p>
        {/* products cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <ProductCard item={product} />
              </Link>
            ))
          ) : (
            <p className="mt-5">No result found</p>
          )}
        </div>
      </MaxWidthWrapper>
      ``
    </main>
  );
};

export default Page;
