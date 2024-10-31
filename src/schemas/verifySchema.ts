import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().length(4, "code must be exaclty 4 digits"),
});

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
