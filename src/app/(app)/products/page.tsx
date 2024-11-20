import { AppPagination } from "@/components/AppPagination";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FilterProduct from "@/components/products/FilterProduct";
import { fetchProducts } from "@/services/fetchProducts";
import dynamic from "next/dynamic";

//Lazy loading Categories product component
const CategoriesProduct = dynamic(
  () => import("@/components/products/CategoriesProduct"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

type SearchParams = { [key: string]: string | undefined };
const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { page, category } = searchParams;

  const p = page ? parseInt(page) : 1;

  //Fetch products and count no of products
  const { products, count } = await fetchProducts(p, category);

  return (
    <main>
      <MaxWidthWrapper>
        {/* filter */}
        <FilterProduct />
        <p className="text-base mb-5">
          <span className="font-semibold">Showing results:</span>{" "}
          {products.length}
        </p>
        {/* products cards */}
        <CategoriesProduct products={products} />

        {/* pagination */}
        <div className="py-10">
          <AppPagination page={p} count={count} />
        </div>
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
