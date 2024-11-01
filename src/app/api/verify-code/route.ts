import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await prisma.user.findUnique({
      where: { username: decodedUsername },
    });
    console.log(user);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiryDate) > new Date();

    console.log(isCodeValid)

    if (isCodeValid && isCodeNotExpired) {
      await prisma.user.update({
        where: { username: decodedUsername },
        data: {
          isVerified: true,
        },
      });
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please signup again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error checking verifying code", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      {
        status: 500,
      }
    );
  }
}
