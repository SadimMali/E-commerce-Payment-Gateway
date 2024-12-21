"use client";

import { toast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import KhaltiPayment from "@/components/payment/KhaltiPayment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CartContext } from "@/context/CartContext";
import { DeliveryType } from "@/schemas/deliverySchema";
import { calculatePrice } from "@/utils/calculatePrice";
import { cn } from "@/lib/utils";

//Dynamic imports
const Delivery = dynamic(() => import("@/components/checkout/Delivery"), {
  loading: () => <p>Loading...</p>,
});

// Schema and type
const radioPayementSchema = z.object({
  type: z.enum(["khalti", "esewa"], {
    required_error: "You need to select a payment type.",
  }),
});

type RadioPayementSchema = z.infer<typeof radioPayementSchema>;

const PaymentPreview = ({ type }: RadioPayementSchema) => {
  return (
    <div className="rounded-md p-4 flex flex-col gap-2 mb-4">
      <h2>Payment method</h2>
      <Image src={`/${type}.png`} alt={type} width={90} height={90} />
    </div>
  );
};

const paymentMethods = [
  { id: "khalti", label: "Khalti", imageSrc: "/khalti.png" },
  { id: "esewa", label: "eSewa", imageSrc: "/esewa.png" },
];

const Page = () => {
  const router = useRouter();
  const [deliveryData, setDeliveryData] = useState<DeliveryType>({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    email: "",
    phone_number: "",
  });
  const [isDeliveryPreview, setIsDeliveryPreview] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<RadioPayementSchema | null>(
    null
  );
  const [isPaymentPreview, setIsPaymentPreview] = useState<boolean>(false);

  const form = useForm<RadioPayementSchema>({
    resolver: zodResolver(radioPayementSchema),
  });

  function onSubmit(data: RadioPayementSchema) {
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

  // Redirect to page incase no product in the cart
  if (cartContext.cart.length === 0) {
    router.push("/cart");
  }

  const price = calculatePrice(0, cartContext.cart);
 

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
                deliveryData={deliveryData}
                setDeliveryData={setDeliveryData}
                isDeliveryPreview={isDeliveryPreview}
                setIsDeliveryPreview={setIsDeliveryPreview}
              />
            </div>
            <div className="flex w-full gap-2 items-center justify-between">
              <h2
                className={cn("text-xl my-2 font-medium", {
                  "opacity-35": !isDeliveryPreview,
                })}
              >
                Payment
              </h2>
              {/* EDIT BUTTON */}
              {isPaymentPreview && isDeliveryPreview && (
                <div className="mr-2">
                  <button
                    className="underline text-black font-semibold hover:text-gray-500"
                    onClick={() => setIsPaymentPreview(false)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
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
                                {paymentMethods.map((method) => (
                                  <FormItem
                                    key={method.id}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={method.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <Image
                                        src={method.imageSrc}
                                        alt={method.label}
                                        width={100}
                                        height={100}
                                      />
                                    </FormLabel>
                                  </FormItem>
                                ))}
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

            {/* khalti */}

            {/* /show payment btn on deliveryData & payment type */}
            {isDeliveryPreview &&
              paymentType &&
              isPaymentPreview &&
              deliveryData && (
                <KhaltiPayment
                  deliveryDetails={deliveryData}
                  price={price}
                  cart={cartContext.cart}
                />
              )}
          </div>

          {/* order summary */}
          <div className=" md:w-1/3">
            <div>
              <div className="mb-10">
                <h4 className="text-xl font-semibold">In Your Bag</h4>
              </div>

              <div className="flex w-full items-center justify-between mt-2">
                <span className="font-semibold">Subtotal</span>
                {price.subTotalPrice ? (
                  <span>Rs {price.subTotalPrice}</span>
                ) : (
                  "-"
                )}
              </div>
              <div className="flex w-full items-center justify-between mt-2">
                <span className="font-semibold">Estimated Shipping</span>
                {price.charge ? <span>Rs {price.charge}</span> : "0"}
              </div>
              <div className="w-full border px-2 mt-3" />
              <div className="flex w-full items-center justify-between mt-2">
                <span className="font-semibold">Total</span>
                {price.totalPrice ? <span>Rs {price.totalPrice}</span> : "-"}
              </div>
              <div className="w-full border mt-2" />
            </div>

            <div className=" mt-5">
              {
               cartContext.cart.map((item)=> (
                <div key={item.id} className="flex gap-2 items-center ">
                  <Image src={item.img} width={60} height={60} alt='' />
                  <div className="flex flex-col gap-2 text-sm font-semibold">
                    <span>{item.name}</span>
                    <p > Quantity: {item.quantity}</p>
                  </div>
                </div>
               ))
              }
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
