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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const verifyschema = z.object({
  email: z.string().email({message: "Invalid email"})
})

const page = () => {
  const form = useForm<z.infer<typeof verifyschema>>({
    resolver: zodResolver(verifyschema),
    defaultValues: {
   email: ""
    },
  });

  function onSubmit(data: z.infer<typeof verifyschema>) {
    console.log("button clicked");
    console.log(data);
  }

  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md">
        <h1 className="text-xl md:text-2xl font-semibold">
          Enter your email to join us or sign in
        </h1>
        {/* form */} 
        {/* what kind of password is  */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Sign up</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default page;
