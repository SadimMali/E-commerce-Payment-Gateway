import { z } from "zod";

const usernameValidator = z
  .string()
  .min(2, "Username must be more than 2 characters")
  .max(20, "Username must be no more than 20 character");

export const emailSchema = z.object({
  email: z.string().email({ message: "invalid email address" }),
});

export const signUpSchema = z.object({
  code: z.string().length(4, "code must be exaclty 4 digits"),
  username: usernameValidator,
  firstname: z.string().max(50, "First Name max length exceed"),
  lastname: z.string().max(50, "First Name max length exceed"),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(6, "Password must be more than 6 characters"),
});
