"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "../hooks/use-toast";
import { useFormState } from "react-dom";
import { updateUser } from "@/utils/actions";

const userFormSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  firstName: z.string().min(1, {
    message: "First name is required.",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().optional(),
  number: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

const initialUserData: UserFormValues = {
  id: "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  number: "",
};

export function UserProfile({ user }: { user: UserFormValues }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserFormValues>(
    user || initialUserData
  );
  const { toast } = useToast();


  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: userData,
  });
  const initialState = { success: false, error: false };

  const [state, formAction] = useFormState(updateUser, initialState);

  function onSubmit(data: UserFormValues) {
    setUserData(data);
    formAction(data);
    setIsEditing(false);

    if (state.success) {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    }

    if (state.error) {
      toast({
        title: "Profile update failed",
        description: "Failed updating profile.",
        variant: "destructive",
      });
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
    form.reset(userData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.reset(userData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src="/placeholder.svg?height=100&width=100"
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            <AvatarFallback>
              {userData.firstName[0]}
              {userData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>
              {userData.firstName} {userData.lastName}
            </CardTitle>
            <CardDescription>@{userData.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user && (
                <FormField
                  control={form.control}
                  name="id"
                  defaultValue={user.id}
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormLabel>id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>@{userData.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{userData.number}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{userData.address || "No address provided"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Joined on {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>
      {!isEditing && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleEdit}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
