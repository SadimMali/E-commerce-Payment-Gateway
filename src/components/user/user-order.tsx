'use client'

import React from 'react'
import { Package, CreditCard, Truck, CheckCircle, XCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type OrderItem = {
  id: string
  productId: string
  quantity: number
  price: number
}


type Order = {
  id: string
  userId: string
  paymentId: string
  deliveryId: string
  orderDate: Date
  status: string
  orderItems: OrderItem[]
  delivery: {
    address: string
    city: string
    postalCode: string
  }
  payment: {
    method: string
    amount: number
  }
}

const mockOrder: Order = {
  id: 'bbd1d9b4-decb-417a-8d69-7b070d799393',
  userId: 'a086561f-7f75-4881-aab9-5de6fe129aa7',
  paymentId: 'nSnnYreqybp2UusCcf9DJV',
  deliveryId: '413f1b5b-5073-4afd-9a14-4ed8e7f2f0f7',
  orderDate: new Date('2024-11-21T09:14:02.671Z'),
  status: 'confirm',
  orderItems: [
    { id: '1', productId: 'prod1', quantity: 2, price: 29.99 },
    { id: '2', productId: 'prod2', quantity: 1, price: 49.99 },
  ],
  delivery: {
    address: '123 Main St',
    city: 'Anytown',
    postalCode: '12345',
  },
  payment: {
    method: 'Credit Card',
    amount: 109.97,
  },
}

export default function UserOrder () {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirm':
        return <Badge variant="outline"><CheckCircle className="mr-1 h-3 w-3 text-green-500" /> Confirmed</Badge>
      case 'pending':
        return <Badge variant="outline"><Package className="mr-1 h-3 w-3 text-yellow-500" /> Pending</Badge>
      case 'shipped':
        return <Badge variant="outline"><Truck className="mr-1 h-3 w-3 text-blue-500" /> Shipped</Badge>
      case 'cancelled':
        return <Badge variant="outline"><XCircle className="mr-1 h-3 w-3 text-red-500" /> Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

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
          <TableRow>
            <TableCell className="font-medium">{mockOrder.id.slice(0, 8)}</TableCell>
            <TableCell>{mockOrder.orderDate.toLocaleDateString()}</TableCell>
            <TableCell>{getStatusBadge(mockOrder.status)}</TableCell>
            <TableCell>{mockOrder.orderItems.length}</TableCell>
            <TableCell>${mockOrder.payment.amount.toFixed(2)}</TableCell>
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
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Update status</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Cancel order</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
          <p>{mockOrder.delivery.address}</p>
          <p>{mockOrder.delivery.city}, {mockOrder.delivery.postalCode}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <p><CreditCard className="inline mr-2 h-4 w-4" /> {mockOrder.payment.method}</p>
          <p>Amount: ${mockOrder.payment.amount.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrder.orderItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}