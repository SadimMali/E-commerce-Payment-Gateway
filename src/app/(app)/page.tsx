import Hero from "@/components/hompage/Hero";
import Features from "@/components/hompage/Features";
import Category from "@/components/hompage/Category";
import SpecialOffer from "@/components/hompage/SpecialOffer";
import FeaturedProduct from "@/components/hompage/FeaturedProduct";
import { prisma } from "@/lib/prisma";
import Newsletter from "@/components/hompage/Newsletter";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 5,
    include: {
      category: true,
      subCategory: true,
    },
    orderBy: {
      releaseDate: "desc",
    },
  });
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Categories */}
      <MaxWidthWrapper>
        <Category />
      </MaxWidthWrapper>
      {/* Features */}
      <Features />
      {/* Featured Products */}
      <FeaturedProduct featuredProducts={featuredProducts} />
      {/* Special Offer */}
      <MaxWidthWrapper>
        <SpecialOffer />
      </MaxWidthWrapper>
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
