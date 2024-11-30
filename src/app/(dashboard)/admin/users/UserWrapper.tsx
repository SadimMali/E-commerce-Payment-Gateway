"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

const UserWrapper = ({
  count,
  page,
  data,
}: {
  count: number;
  page: number;
  data: any;
}) => {
  return (
    <div className="">
      <DataTable
        count={count}
        columns={columns}
        page={page}
        data={data}
        filterName="firstName"
      />
    </div>
  );
};

export default UserWrapper;
