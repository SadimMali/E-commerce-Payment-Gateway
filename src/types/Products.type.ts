import { Product,
    ProductCategory,
    ProductSubCategory, } from "@prisma/client";


export type ProductList = Product & { category: ProductCategory } & {
    subCategory: ProductSubCategory;
  };