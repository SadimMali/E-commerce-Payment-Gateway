"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React, { useContext, useState } from "react";
import { calculatePrice } from "@/utils/calculatePrice";
import { CartContext } from "@/context/CartContext";
import KhaltiPayment from "@/components/payment/KhaltiPayment";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const RadioPayementSchema = z.object({
  type: z.enum(["khalti", "esewa"], {
    required_error: "You need to select a payment type.",
  }),
});

export type DeliveryData = {
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  email: string;
  phone_number: number;
};

const Delivery = dynamic(() => import("@/components/checkout/Delivery"), {
  loading: () => <p>Loading...</p>,
});

const PaymentPreview = ({ type }: z.infer<typeof RadioPayementSchema>) => {
  return (
    <div className="ring-2 ring-gray-600 rounded-md p-4 flex flex-col gap-2 mb-4">
      <h2>Payment method</h2>
      <Image src={`/${type}.png`} alt={type} width={90} height={90} />
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const [deliveryData, setDeliveryData] = useState<DeliveryData>();
  const [isDeliveryPreview, setIsDeliveryPreview] = useState<boolean>(false);
  const [paymentType, setPaymentType] =
    useState<z.infer<typeof RadioPayementSchema>>();
  const [isPaymentPreview, setIsPaymentPreview] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RadioPayementSchema>>({
    resolver: zodResolver(RadioPayementSchema),
  });

  function onSubmit(data: z.infer<typeof RadioPayementSchema>) {
    setPaymentType(data);
    setIsPaymentPreview(true);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  // if (cartContext.cart.length === 0) {
  //   router.push("/cart");
  // }

  const price = calculatePrice(0, cartContext.cart);

  const user = {
    name: "Sadim Mali",
    email: "sadimmalakar77@gmail.com",
    phonenumber: "9749497621",
  };
  return (
    <div>
      <MaxWidthWrapper>
        <div>
          <h3 className="text-lg font-semibold text-center">Checkout</h3>
        </div>
        <div className="flex flex-col gap-5 md:flex-row lg:px-32 ">
          <div className="w-full md:w-2/3">
            <div>
              <h2 className="text-xl my-2 font-medium">Delivery Options</h2>
              <div>
                <Button variant="outline">Shipping</Button>
              </div>
              <Delivery
                deliveryData={deliveryData!}
                setDeliveryData={setDeliveryData}
                isDeliveryPreview={isDeliveryPreview}
                setIsDeliveryPreview={setIsDeliveryPreview}
              />
            </div>
            <h2 className="text-xl my-2 font-medium">Payment</h2>
            {deliveryData && isDeliveryPreview && !isPaymentPreview && (
              <>
                <div className="space-y-4">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className=" space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Select payment method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="khalti" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    <Image
                                      src="/khalti.png"
                                      alt=""
                                      width={100}
                                      height={100}
                                    />
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="esewa" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    <Image
                                      src="/esewa.png"
                                      alt=""
                                      width={100}
                                      height={100}
                                    />
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <p className="text-sm">
                        You will be redirected to the Khalti site after
                        reviewing your order.
                      </p>
                      <Button type="submit">Continue to Order Review</Button>
                    </form>
                  </Form>
                </div>
              </>
            )}

            {isPaymentPreview && isDeliveryPreview && paymentType && (
              <PaymentPreview type={paymentType.type} />
            )}

            {/* esewa */}
            
            <KhaltiPayment price={price} user={user} cart={cartContext.cart} />
          </div>
          <div className=" md:w-1/3">
            <div className="mb-10">
              <h4 className="text-xl font-semibold">In Your Bag</h4>
            </div>

            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Subtotal</span>
              {price.subTotalPrice ? (
                <span>&#36;{price.subTotalPrice}</span>
              ) : (
                "-"
              )}
            </div>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Estimated Shipping</span>
              {price.charge ? <span>&#36;{price.charge}</span> : "0"}
            </div>
            <div className="w-full border px-2 mt-3" />
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Total</span>
              {price.totalPrice ? <span>&#36;{price.totalPrice}</span> : "-"}
            </div>
            <div className="w-full border mt-2" />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
