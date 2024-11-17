import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";

export async function createPayment(method: string, pidx: string) {
  try {
    return await prisma.payment.create({
      data: {
        id: pidx,
        method,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Error creating payment", error);
    throw new Error("Error creating payment");
  }
}

export async function processKhaltiPayment(payload: any, secretKey: string) {
  try {
    const headers = { Authorization: `Key ${secretKey}` };
    const response = await axios.post(process.env.KHALTI_URL || "", payload, {
      headers,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage = axiosError.response?.data.message;
    console.log(errorMessage);
    throw new Error(errorMessage || "Payment process failed");
  }
}
