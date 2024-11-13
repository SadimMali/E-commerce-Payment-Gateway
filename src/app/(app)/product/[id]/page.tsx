import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductDetails } from "@/components/products/ProductDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = await prisma.product.findUnique({
    include: {
      category: true,
      subCategory: true,
    },
    where: {
      id,
    },
  });

  if (!product) {
    return notFound;
  }

  return (
    <main className="w-full h-full">
      <MaxWidthWrapper>
        {/* breadcrumbs */}
        <div></div>
        <ProductDetails filterProduct={product} />
      </MaxWidthWrapper>
    </main>
  );
};

export default SingleProductPage;
