import { prisma } from "@/lib/prisma";
import UserWrapper from "./UserWrapper";

const Page = async () => {
  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        number: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);

  return (
    <div className="">
      <UserWrapper count={count} data={data} page={1} />
    </div>
  );
};

export default Page;
