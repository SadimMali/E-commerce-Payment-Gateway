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
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exist with this email" },
        { status: 401 }
      );
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new UserModel({
      username,
      first_name: firstName,
      last_name: lastName,
      phone_number,
      location,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "User created successfully",
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
