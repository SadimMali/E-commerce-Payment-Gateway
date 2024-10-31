import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      location,
      phone_number,
    } = await req.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    
    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
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
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiryDate = new Date(
          Date.now() * 3600000
        );
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        location,
        phone_number,
        verifyCode,
        verifyCodeExpiryDate: expiryDate,
        isVerified: false,
      });
      await newUser.save();
    }

    //send verification code through email

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
