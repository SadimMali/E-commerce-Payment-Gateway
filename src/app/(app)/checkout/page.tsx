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

export type DeliveryData = {
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  email: string;
  phone_number: number;
};

type PayementType = "khalti" | "esewa";

const Delivery = dynamic(() => import("@/components/checkout/Delivery"), {
  loading: () => <p>Loading...</p>,
});

const Page = () => {
  const router = useRouter();
  const [deliveryData, setDeliveryData] = useState<DeliveryData>();
  const [isDeliveryPreview, setIsDeliveryPreview] = useState<boolean>(false);
  const [paymentType, setPaymentType] = useState<PayementType>("khalti");
  const form = useForm();

  console.log(paymentType);

  const cartContext = useContext(CartContext);
  if (!cartContext) return;

  // if (cartContext.cart.length === 0) {
  //   router.push("/cart");
  // }

  const price = calculatePrice(0, cartContext.cart);

  const handleRadioGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

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
            <h3>payment</h3>

            <div>
              <h2>Delivery Options</h2>
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
            {deliveryData && isDeliveryPreview && (
              <>
                <div className="space-y-4">
                  <h2>Payment</h2>
                  <div>
                    <p className="text-sm">Select payment method</p>
                    <div>
                      <RadioGroup
                        defaultValue="khalti"
                        onChange={handleRadioGroup}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="khalti" id="khalti" />
                          <label htmlFor="khalti" className="text-purple-700">
                            <Image
                              src="/khalti.png"
                              alt=""
                              width={100}
                              height={100}
                            />
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="esewa" id="esewa" />
                          <label htmlFor="esewa" className="text-green-500">
                            <Image
                              src="/esewa.png"
                              alt=""
                              width={100}
                              height={100}
                            />
                          </label>
                        </div>
                      </RadioGroup>
                      <p>
                        You will be redirected to the Khalti site after
                        reviewing your order.
                      </p>
                      <Button>Continue to Order Review</Button>
                    </div>
                  </div>
                </div>
              </>
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
