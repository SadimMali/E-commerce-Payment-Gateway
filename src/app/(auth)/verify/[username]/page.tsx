"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {} from "@/schemas/signUpSchema";
import { VerifyCode, verifyCodeSchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CodeVerificationPage = () => {
  const { username } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyCode) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username,
        code: data.code,
      });
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace("/sign-in");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error verifiying", error);
      const axiosError = error as AxiosError<ApiResponse>;

      //Default error message
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "Error verifying code",
        description: errorMessage,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">
        Now let&apos;s make you a Mike Member.
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="code" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="disabled:opacity-75"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Verify Code"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CodeVerificationPage;
