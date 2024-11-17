import { ProductList } from "./Products.type";

export interface Cart extends ProductList {
    quantity: number;
  }