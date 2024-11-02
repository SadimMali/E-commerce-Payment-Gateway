import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;
