"use client";
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
import { DeliveryType, deliverySchema } from "@/schemas/deliverySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const DeliveryPreview = ({
  data,
  setIsDeliveryPreview,
}: {
  data: DeliveryType;
  setIsDeliveryPreview: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="ring-2 ring-gray-600 p-4 rounded-sm my-5 flex flex-1">
      <div className="flex flex-col text-gray-700 w-1/2 text-sm">
        <p>{`${data.firstName} ${data.lastName} `}</p>
        <p>{data.address}</p>
        <p> {data.email} </p>
        <p>{data.phone_number} </p>
      </div>

      {/* EDIT BUTTON */}
      <div className="flex justify-end w-1/2 items-start">
        <button
          className="underline text-black font-semibold hover:text-gray-500"
          onClick={() => setIsDeliveryPreview(false)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

type DeliveryProps = {
  deliveryData: DeliveryType;
  setDeliveryData: Dispatch<SetStateAction<any>>;
  isDeliveryPreview: boolean;
  setIsDeliveryPreview: Dispatch<SetStateAction<boolean>>;
};

const Delivery = ({
  deliveryData,
  setDeliveryData,
  isDeliveryPreview,
  setIsDeliveryPreview,
}: DeliveryProps) => {
  const form = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      address: "",
      email: "",
      phone_number: "",
    },
  });

  const onSubmit = (data: z.infer<typeof deliverySchema>) => {
    console.log(data);
    setDeliveryData(data);
    setIsDeliveryPreview(true);
  };
  return (
    <div className="">
      {!isDeliveryPreview && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-8">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} maxLength={10}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full justify-end">
            <Button type="submit" className="rounded-3xl px-6 py-6">Save & Continue</Button>
            </div>
          </form>
        </Form>
      )}
      {isDeliveryPreview && (
        <DeliveryPreview
          data={deliveryData}
          setIsDeliveryPreview={setIsDeliveryPreview}
        />
      )}
    </div>
  );
};

export default Delivery;
