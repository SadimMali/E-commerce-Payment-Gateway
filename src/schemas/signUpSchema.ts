import { z } from "zod";

const usernameValidator = z
  .string()
  .min(2, "Username must be more than 2 characters")
  .max(20, "Username must be no more than 20 character")
  .regex(/^[a-zA-z0-9_]+$/, "Username must not contain special character");

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: usernameValidator,
  firstname: z
    .string()
    .max(50, "First Name max length exceed")
    .min(1, "First name is required"),
  lastname: z
    .string()
    .max(50, "First Name max length exceed")
    .min(1, "Last name is required"),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(6, "Password must be more than 6 characters"),
});

export type SignUp = z.infer<typeof signUpSchema>
