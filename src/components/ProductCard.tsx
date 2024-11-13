import { Card, CardContent } from "@/components/ui/card";
import { ProductList } from "@/types/Products.type";
import { Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  item: ProductList;
}

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <Card className="h-full border-2 rounded-none border-gray-100 transition-all  hover:border-black">
      <CardContent className="flex flex-col justify-center p-0">
        <div className="flex items-center justify-center h-80 w-full bg-gray-100">
          <div className="relative w-full h-full">
            {/* <img
            /> */}
            <Image
              src={item.img}
              className="absolute object-contain "
              alt={item.name}
              fill
            />
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              <span>{item.subCategory.name}</span>
              <Star className="inline-block w-5 h-5 mb-1 text-[#edcf5d] fill-[#edcf5d]" />{" "}
              4.9
            </p>
          </div>
          <p className="text-lg font-semibold">{item.name}</p>
          <p className="font-semibold text-md">Rs {item.price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
