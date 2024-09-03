import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const {
      verifyCode,
      username,
      email,
      password,
      firstName,
      lastName,
      location,
      phone_number,
    } = await req.json();
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    
    if(existingUser.verifyCode !== verifyCode){
      return Response.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
      
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const updatedUser = await UserModel.findOneAndUpdate(
      {
        email,
        verifyCode,
      },
      {
        $set: {
          username,
          first_name: firstName,
          last_name: lastName,
          phone_number,
          password: hashedPassword,
          location,
          isVerified: true,
        },
      },
      { new: true }
    );
    return Response.json(
      {
        success: true,
        message: "User created and verified successfully",
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