import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      location,
      phone_number,
    } = await req.json();

    const existingUserVerifiedByUsername = await prisma.user.findUnique({
      where: { username },
      select: { isVerified: true },
    });

    if (
      existingUserVerifiedByUsername &&
      existingUserVerifiedByUsername.isVerified
    ) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    // const existingUserByEmail = await UserModel.findOne({ email });
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    const verifyCode = Math.floor(1000 + Math.random() * 9000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        await prisma.user.update({
          where: { email },
          data: {
            password: hashedPassword,
            verifyCode,
          },
        });
      }
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await prisma.user.create({
        data: {
          username,
          firstName: firstname,
          lastName: lastname,
          email,
          verifyCode,
          verifyCodeExpiryDate: expiryDate,
          password: hashedPassword,
          isVerified: false,
        },
      });
    }

    //send verification code through email
    const emailResponse = await sendVerificationEmail({
      email,
      username,
      otp: verifyCode,
    });

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User register successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
