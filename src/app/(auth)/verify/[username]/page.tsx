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
import {} from "@/schemas/signUpSchema";
import { VerifyCode, verifyCodeSchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CodeVerificationPage = () => {
  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: VerifyCode) => console.log(data);

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

          <Button type="submit">Verify Code</Button>
        </form>
      </Form>
    </>
  );
};

export default CodeVerificationPage;
