"use client";

import { useToast } from "@/components/hooks/use-toast";
import { CartContext } from "@/context/CartContext";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

type SuccessPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = ({ searchParams }: SuccessPageProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const cartContext = useContext(CartContext);

  const { pidx, transaction_id, purchase_order_id, status } = searchParams;

  useEffect(() => {
    if (!cartContext || !cartContext.setCart) {
      return;
    }
    const updateOrderConfirmation = async () => {
      try {
        const response = await axios.post<ApiResponse>(
          "/api/epayment/confirm",
          { pidx, transaction_id, purchase_order_id, status }
        );
        if (response.data.success) {
          cartContext.setCart([]);
          toast({
            title: "Payment confirmed",
            description: "Order updated successfully",
            variant: "default",
          });
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (err) {
        const axiosError = err as AxiosError<ApiResponse>;
        const errorMessage = axiosError.response?.data.message;
        toast({
          title: errorMessage,
          variant: "destructive",
        });
      }
    };
    updateOrderConfirmation();
  }, [searchParams, router, toast]);

  return <div className="">Page</div>;
};

export default Page;
