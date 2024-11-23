import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserProfile } from "@/components/user/UserProfile";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const _user = session?.user;

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: _user.id,
    },
  });

  if (!user) {
    return <div> Unauthorized</div>;
  }
  const {
    password,
    isVerified,
    verifyCodeExpiryDate,
    role,
    verifyCode,
    address,
    ...rest
  } = user;

  const sanitizedUser = {
    ...rest,
    address: address ?? undefined,
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <UserProfile user={sanitizedUser} />
    </div>
  );
}
