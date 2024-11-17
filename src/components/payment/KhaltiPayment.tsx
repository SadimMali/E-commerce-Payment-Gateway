"use client";
import { DeliveryType } from "@/schemas/deliverySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Cart } from "@/types/Cart.type";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

interface Price {
  totalPrice: number;
  charge: number;
  subTotalPrice: number;
}

interface Props {
  deliveryDetails: DeliveryType;
  price: Price;
  cart: Array<Cart>;
}

const KhaltiPayment = ({ deliveryDetails, price, cart }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleKhaltiPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/epayment", {
        deliveryDetails,
        price,
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
      console.error("Error payment", err);
      const axiosError = err as AxiosError<ApiResponse>;
      toast({
        title: "Payment failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
