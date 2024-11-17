import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductList } from "@/types/Products.type";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CartModalProps = { cart: ProductList; isOpen: boolean; onClose: () => void };

const CartModal = ({ cart, isOpen, onClose }: CartModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-5">
            {" "}
            <Check className="w-6 h-6 bg-green-700 text-white rounded-full p-1" />{" "}
            Added to Bag
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="image-wrapper relative w-1/3 ">
            <Image
              src={cart.img}
              className="max-w-100 object-contain absolute"
              fill
              alt={cart.name || ""}
            />
          </div>
          {/* content */}
          <div className="w-2/3 space-y-1 flex flex-col justify-center">
            <h3 className="text-lg font-semibold">{cart.name}</h3>
            <p className="text-md text-gray-500">{cart.subCategory.name}</p>
            <p className="text-md font-medium"> Rs {cart.price}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Link href="/cart">
            <Button
              type="button"
              className="border hover:border-black rounded-3xl text-md w-48 h-14"
              variant="outline"
              onClick={onClose}
            >
              View Bag
            </Button>
          </Link>
          <Link href="/checkout">
            <Button
              type="button"
              className="bg-black text-white hover:bg-white hover:text-black hover:border-black border rounded-3xl text-md w-48 h-14"
              variant="secondary"
              onClick={onClose}
            >
              Checkout
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CartModal;
