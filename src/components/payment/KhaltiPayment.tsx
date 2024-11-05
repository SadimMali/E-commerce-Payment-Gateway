"use client";
import { Cart } from "@/context/CartContext";
import { DeliveryType } from "@/schemas/deliverySchema";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  name: string;
  email: string;
  phonenumber: string;
}
interface Price {
  totalPrice: number;
  charge: number;
  subTotalPrice: number;
}

interface Props {
  deliveryDetails: DeliveryType;
  price: Price;
  user: User;
  cart: Array<Cart>;
}

const KhaltiPayment = ({ deliveryDetails, price, user, cart }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleKhaltiPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/epayment", {
        deliveryDetails,
        price,
        user,
        cart,
      });
      console.log("server api", response);
      const data = response.data;
      console.log(data);
      if (data.success) {
        setIsLoading(false);
        router.push(data.message.payment_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleKhaltiPayment}
        className="border-0 block bg-[#5C2D91] text-white py-[5px] px-[14px] w-40 h-10"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-full animate-spin transition-all" />
        ) : (
          "Pay with Khalti"
        )}
      </button>
    </div>
  );
};

export default KhaltiPayment;
