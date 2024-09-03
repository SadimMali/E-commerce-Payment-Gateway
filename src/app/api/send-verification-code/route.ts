import { dbConnect } from "@/lib/dbConnector";
import UserModel from "@/model/User.model";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email } = await req.json();

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiryDate = new Date(Date.now() + 3600000);
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) { //If user exists with email & isVerified
        return Response.json(
          { success: false, message: "User already exists with email." },
          { status: 403 }
        );
      } else { //Update code & expiry date if user exists with email but not verified
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiryDate = expiryDate;
        await existingUserByEmail.save();
      }
    } else { // Create new User with email
      const newUser = new UserModel({
        email,
        verifyCode,
        verifyCodeExpiry: expiryDate,
      });
      await newUser.save();
    }
//TODO:Implement nodemailer or resend mail
    return Response.json(
      {
        success: true,
        message:
          "Email register successfully. Please verify email and register",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ success: false, message: err }, { status: 500 });
  }
}
