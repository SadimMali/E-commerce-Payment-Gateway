import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Product } from "@/utils/products";
import { Star } from "lucide-react";

interface ProductCardProps {
  item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <Card className="h-full border-0">
    <CardContent className="flex flex-col justify-center p-0">
      <div className="flex items-center justify-center h-80 w-full bg-gray-100">
        <img src={item.img} className="h-full object-contain" alt={item.name} />
      </div>
      <div className="p-5">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          <span>{item.subCategory}</span>
          <Star className="inline-block w-5 h-5 mb-1 text-[#edcf5d] fill-[#edcf5d]" /> 4.9
        </p>
      </div>
      <p className="text-lg font-semibold">{item.name}</p>
      <p className="font-semibold text-md">${item.price}</p>
      </div>
    </CardContent>
  </Card>
  );
};

export default ProductCard;
