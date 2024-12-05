"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import axios, { AxiosError } from "axios";
import { DataTable } from "../../../../components/data-table";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/hooks/use-toast";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const [productData, setProductData] = useState<any>(null);

  const { toast } = useToast();
  const { page } = searchParams;
  const p = page ? parseInt(page) : 1;


  //Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = page ? `?page=${page}` : "";
        const response = await axios.get<ApiResponse>(`/api/products${query}`);
        if (response?.data.success) {
          setProductData(response.data.data);
        }
      } catch (error) {
        const err = error as AxiosError<ApiResponse>; //AxiosError
        console.log(error);
        toast({
          variant: "destructive",
          title: err.response?.data.message,
        });
      }
    };
    fetchProducts();
  }, [page, toast]);

  // Transform the product data by mapping over the products array and extracting the relevant fields into a new format.
  const transformedProducts =
    productData?.products.map((product: any) => ({
      id: product.id,
      name: product.name,
      image: product.img,
      price: parseFloat(product.price) || 0,
      category: product.category.name,
    })) || [];

  console.log(transformedProducts);
  return (
    <div className="container">
      {/* table */}
      <DataTable
        columns={columns}
        data={transformedProducts}
        page={p}
        filterName="name"
        count={parseInt(productData?.count)}
      />
    </div>
  );
};

export default Page;
