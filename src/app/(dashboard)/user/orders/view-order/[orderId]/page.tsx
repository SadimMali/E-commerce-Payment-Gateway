import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ViewOrder from "@/components/user/view-order";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const Page = async ({
  params,
}: {
  params: { orderId: string | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session && !user) {
    return <div> Unauthorized</div>;
  }
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      delivery: true,
      payment: true,
    },
  });

  return (
    <div className="">
      <ViewOrder order={order} />
    </div>
  );
};

export default Page;
