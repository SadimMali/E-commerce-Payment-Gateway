import Hero from "@/components/hompage/Hero";
import Features from "@/components/hompage/Features";
import Category from "@/components/hompage/Category";
import SpecialOffer from "@/components/hompage/SpecialOffer";
import FeaturedProduct from "@/components/hompage/FeaturedProduct";
import { prisma } from "@/lib/prisma";
import Newsletter from "@/components/hompage/Newsletter";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    take: 5,
    include: {
      category: true,
    },
    orderBy: {
      releaseDate: "desc",
    },
  });
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero />
      {/* Features */}
      <Features />
      {/* Categories */}
      <Category />
      {/* Featured Products */}
      <FeaturedProduct featuredProducts={featuredProducts} />

      {/* Special Offer */}
      <SpecialOffer />
      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
