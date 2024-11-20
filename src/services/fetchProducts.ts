import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma } from "@prisma/client";

export async function fetchProducts(page: number, category?: string) {
  const query: Prisma.ProductWhereInput = category && category !== "all" 
    ? {
        OR: [
          { category: { name: category } },
          { subCategory: { name: category } },
        ],
      }
    : {};

  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
      include: {
        category: true,
        subCategory: true,
      },
      where: query,
    }),
    prisma.product.count({ where: query }),
  ]);

  return { products, count };
}
