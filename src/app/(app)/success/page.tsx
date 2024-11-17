"use client";

import { useToast } from "@/components/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SuccessPageProps = {
  searchParams: {
    [key: string]: string | undefined;
  };
};

const Page = ({ searchParams }: SuccessPageProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { pidx, transaction_id, purchase_order_id } = searchParams;

  useEffect(() => {
    const updateOrderConfirmation = async () => {
      try {
        const response = await axios.post<ApiResponse>(
          "/api/epayment/confirm",
          { pidx, transaction_id, purchase_order_id }
        );
        if (response.data.success) {
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
