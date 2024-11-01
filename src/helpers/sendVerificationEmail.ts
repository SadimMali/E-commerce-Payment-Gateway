import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail({
  email,
  username,
  otp,
}: {
  email: string;
  username: string;
  otp: string;
}): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.DOMAIN!,
      to: email,
      subject: "Mike Message | Verification code",
      react: VerificationEmail({ username, otp }),
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    console.error("Error sending verificaton email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
