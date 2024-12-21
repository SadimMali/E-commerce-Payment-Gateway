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
import { SignIn, signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignIn) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (result?.error) {
      setIsSubmitting(false);
      toast({
        title: "Login failed",
        description: result?.error,
        variant: "destructive",
      });
    }

    if (result?.url) {
      setIsSubmitting(false);
      toast({
        title: "Login successfully",
        description: "You have successfully logged in",
      });
      router.replace("/");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold py-4">
        Enter your email to join us or sign in
      </h1>
      {/* sign in form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email / Username</FormLabel>
                <FormControl>
                  <Input placeholder="email/username" {...field} />
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
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait...
              </>
            ) : (
              "Sign in"
            )}{" "}
          </Button>
        </form>
      </Form>
      <p className="text-md text-center mt-4 ">
        Not a member yet?
        <Link
          href="/sign-up"
          className=" ml-2 font-bold text-blue-600 hover:text-blue-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
