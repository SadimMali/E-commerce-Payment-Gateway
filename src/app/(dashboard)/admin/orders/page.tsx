import { DataTable } from "@/components/data-table";
import { fetchOrder } from "@/services/orderService";
import { columns } from "./columns";
import OrderWrapper from "./OrderWrapper";

export type Order = {
  id: string;
  customer: string | undefined;
  status: string;
  price: number;
  orderDate: Date;
};

const Page = async ({
  searchParams,
}: {
  [key: string]: string | undefined;
}) => {
  const data = await fetchOrder();
  console.log(searchParams);
  const [order, count] = data;
  const p = 1;

  const transformedOrder: Order[] = order.map((od) => ({
    id: od.id,
    customer: od.delivery?.firstName,
    status: od.status,
    price:
      od.orderItems.length > 1
        ? od.orderItems.reduce((intial, acc) => intial + acc.totalPrice, 0)
        : od.orderItems[0].totalPrice,
    orderDate: new Date(od.orderDate),
  }));

  return (
    <div className="container">
      <OrderWrapper count={count} page={p} data={transformedOrder} />
    </div>
  );
};

export default Page;