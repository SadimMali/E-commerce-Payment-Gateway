"use client"

import { DataTable } from "@/components/data-table"
import { Order } from "./page";
import { columns } from "./columns";

const OrderWrapper = ({count, page, data}: {count: number; page: number; data: Order[]}) => {
  return (
    <div className=''>
      <DataTable count={count} columns={columns} page={page} data={data} filterName="customer" />

    </div>
  )
}

export default OrderWrapper