import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserOrder from "@/components/user/user-order";
import { fetchOrderByUserId } from "@/services/orderService";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const orders = await fetchOrderByUserId(user.id.toString());

  return (
    <div className="">
      <UserOrder orders={orders} />
    </div>
  );
};

export default Page;
