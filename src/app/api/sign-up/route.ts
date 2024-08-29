import  UserModel  from "@/model/User.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, email, password, firstName, lastName, location } =
    await req.json();
  try {
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
      email,
      password: hashedPassword,
      location,
    });
    await newUser.save();

    Response.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
  }

  return Response.json(
    {
      sucess: true,
    },
    { status: 200 }
  );
}
