import EditUser from "@/components/EditUser";
import { prisma } from "@/lib/prisma";

const EditUserPage = async ({
  params,
}: {
  params: { userId: string | undefined };
}) => {
  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      address: true,
      number: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="">
      <EditUser data={user} />
    </div>
  );
};

export default EditUserPage;
