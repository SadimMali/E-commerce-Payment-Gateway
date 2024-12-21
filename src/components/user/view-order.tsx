"use client";

import { OrderList } from "@/types/Order.type";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function ViewOrder({ order }: { order: OrderList | null }) {
  if (!order) {
    return <div> Invalid user order</div>;
  }

  const getPaymentMethodImage = (paymentMethod: string | undefined) => {
    switch (paymentMethod?.toLowerCase()) {
      case "khalti":
        return (
          <>
            <Image
              src="/khalti.png"
              width={60}
              height={60}
              alt="khalti image"
              className="object-contain"
            />
          </>
        );
      case "esewa":
        return (
          <>
            <Image src="/esewa.png" width={60} height={60} alt="khalti image" />
          </>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
          <p className="capitalize">{order.delivery?.address}</p>
          <p className="capitalize">{order.delivery?.city}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <p className="capitalize flex gap-2">
            {getPaymentMethodImage(order?.payment?.method)}
            {order?.payment?.method}
          </p>
          <p>
            Amount: NPR{" "}
            {order?.orderItems?.reduce(
              (initial, acc) => initial + acc.totalPrice,
              0
            )}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Product Image</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order?.orderItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productId}</TableCell>
                <TableCell>
                  <Image 
                  src={item.product.img}
                  width={50}
                  height={50}
                  alt=""
                  />
                  </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>NPR {item.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  NPR {(item.quantity * item.totalPrice).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
