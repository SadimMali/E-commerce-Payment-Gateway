import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FilterProduct from "@/components/products/FilterProduct";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
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
  const { category } = searchParams;

  //Filter the products based on category or subCategory
  let query: Prisma.ProductWhereInput = {};
  if (category && category !== "all") {
    query.OR = [
      { category: { name: category } },
      { subCategory: { name: category } },
    ];
  }

  //Fetch products
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subCategory: true,
    },
    where: query,
  });

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
      </MaxWidthWrapper>
    </main>
  );
};

export default Page;
