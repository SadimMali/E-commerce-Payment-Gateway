"use client";

import React from "react";
import { Package, Truck, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { OrderList } from "@/types/Order.type";
import Link from "next/link";


export default function UserOrder({ orders }: { orders: OrderList[] }) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirm":
        return (
          <Badge variant="outline">
            <CheckCircle className="mr-1 h-3 w-3 text-green-500" /> Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline">
            <Package className="mr-1 h-3 w-3 text-yellow-500" /> Pending
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="outline">
            <Truck className="mr-1 h-3 w-3 text-blue-500" /> Shipped
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline">
            <XCircle className="mr-1 h-3 w-3 text-red-500" /> Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.id.slice(0, 8)}
              </TableCell>
              <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell>{order?.orderItems?.length}</TableCell>
              <TableCell>
                NPR  {order.orderItems?.reduce(
                  (intial, acc) => intial + acc.totalPrice,
                  0
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <Package className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                   <Link href={`/user/orders/view-order/${order.id}`}>
                   <DropdownMenuItem>View details</DropdownMenuItem>
                   </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Cancel order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    
    </div>
  );
}
