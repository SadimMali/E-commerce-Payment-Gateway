import { AppPagination } from "@/components/AppPagination";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FilterProduct from "@/components/products/FilterProduct";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
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
  const { page, category } = searchParams;

  const p = page ? parseInt(page) : 1;

  //Filter the products based on category or subCategory
  let query: Prisma.ProductWhereInput = {};
  if (category && category !== "all") {
    query.OR = [
      { category: { name: category } },
      { subCategory: { name: category } },
    ];
  }

  //Fetch products and count no.of products

  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        category: true,
        subCategory: true,
      },
      where: query,
    }),
    prisma.product.count({
      where: query,
    }),
  ]);

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
