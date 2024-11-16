import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { parse } from "path";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  const _user = session?.user;

  //Check user is authenticated
  if (!session?.user || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated " },
      { status: 401 }
    );
  }

  if (session?.user || _user) {
    try {
      //Decode the user ID in-case of URL encoded
      const decodedUserId = decodeURIComponent(_user.id);

      //Query the database using decoded user ID
      const user = await prisma.user.findUnique({
        where: { id: decodedUserId },
        select: {
          firstName: true,
          lastName: true,
          address: true,
          email: true,
          number: true,
        },
      });

      // If user not found,  404
      if (!user)
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );

      //Return user data if exists
      return Response.json({ success: true, data: user }, { status: 200 });
    } catch (err) {
      console.log("Error user", err);

      return Response.json({ success: false, message: err }, { status: 500 });
    }
  }
}
