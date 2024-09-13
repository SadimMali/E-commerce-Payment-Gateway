import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/utils/products";
import { Check } from "lucide-react";
import Link from "next/link";

type CartModalProps = { cart: Product; isOpen: boolean; onClose: () => void };

const CartModal = ({ cart, isOpen, onClose }: CartModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-5">
            {" "}
            <Check className="w-6 h-6 bg-green-700 text-white rounded-full p-1" />{" "}
            Added to Bag
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="image-wrapper w-1/3 ">
            <img src={cart.img} className="max-w-100 object-cover" />
          </div>
          {/* content */}
          <div className="w-2/3 space-y-1 flex flex-col justify-center">
            <h3 className="text-lg font-semibold">{cart.name}</h3>
            <p className="text-md text-gray-500">{cart.subName}</p>
            <p className="text-md font-medium"> &#36;{cart.price}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            className="border hover:border-black rounded-3xl text-md w-48 h-14"
            variant="outline"
            onClick={onClose}
          >
            <Link href="/cart">View Bag</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CartModal;
