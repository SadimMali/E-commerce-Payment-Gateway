import Link from "next/link";
import ProductCard from "../ProductCard";
import { ProductList } from "@/types/Products.type";

const CategoriesProduct = ({ products }: { products: Array<ProductList> }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard item={product} />
          </Link>
        ))
      ) : (
        <p className="mt-5">No result found</p>
      )}
    </div>
  );
};

export default CategoriesProduct;
