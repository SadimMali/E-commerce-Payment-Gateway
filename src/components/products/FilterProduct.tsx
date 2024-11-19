"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_FILTERS } from "@/utils/products";
import { useRouter, useSearchParams } from "next/navigation";

const FilterProduct = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();
  
  //fn to set searchParams based on the argument passed
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(key === 'category') {
      params.set(key, value);
      params.delete("page")
    } else {
      params.set(key, value);
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <>
      <h3 className="font-semibold text-3xl mt-2 text-center uppercase">
        {category}
      </h3>
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
    </>
  );
};

export default FilterProduct;
