import { prisma } from "@/lib/prisma";

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
        address: true,
        createdAt: true,
      },
    }),
    prisma.user.count(),
  ]);


  return <div className="">Page</div>;
};

export default Page;
