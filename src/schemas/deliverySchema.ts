import { z } from "zod";

export const deliverySchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }).trim(),
  city: z.string().min(1, { message: "City is required" }).trim(),
  address: z.string().min(1, { message: "Address is required" }).trim(),
  email: z.string().email({ message: "Invalid email address" }).trim(),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .trim(),
});
