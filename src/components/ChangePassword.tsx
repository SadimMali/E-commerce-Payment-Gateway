"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Package2, KeyRound, Settings, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "./hooks/use-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

// Password validation schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePassword() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (!response.data.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.data.message,
        });
      }
      // Success notification
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      // Error notification
       const axiosError = error as AxiosError<ApiResponse>;
              const errorMessage = axiosError.response?.data.message;
      toast({
        variant: "destructive",
        title: "Error",
        description:
          errorMessage || "There was a problem updating your password.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" overflow-y-auto">
      <div className="container space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Change Password
            </h2>
            <p className="text-sm text-muted-foreground">
              Update your password and keep your account secure.
            </p>
          </div>
        </div>

        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Password Settings</CardTitle>
            <CardDescription>
              Make sure your new password is at least 8 characters and includes
              uppercase, lowercase, and numbers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters long and include
                        uppercase, lowercase, and numbers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardFooter className="px-0">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="ml-auto"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
