import CuratedForYouItem from "@/components/CuratedForYouItem";
import ProductAvatar from "@/components/ProductAvatar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="px-5 py-5 md:px-24 lg:px-32">
      {/* search by category */}
      <section className="my-5">
        <div className="flex justify-between">
          <p className="font-bold text-lg">Shop by category</p>
          <Link href="/products?category=all">
            <span className="text-slate-400 text-sm">See All</span>{" "}
          </Link>
        </div>
        <div className="flex gap-5 pt-2">
          <Link href="/products/?category=sneaker">
            <ProductAvatar url="/product/travis.jpg" fallback="SHOE" />
          </Link>
          <Link href="/products/?category=short">
            <ProductAvatar url="/product/shorts.jpg" fallback="SHORTS" />
          </Link>
          <Link href="/products/?category=sunglass">
            <ProductAvatar url="/product/sunglass.jpg" fallback="GLASS" />
          </Link>
          <Link href="/products/?category=backpack">
            <ProductAvatar url="/product/tbackpack.jpg" fallback="BAG" />
          </Link>
          <Link href="/products/?category=bottle">
            <ProductAvatar
              url="/product/SqueezableBottle.jpg"
              fallback="BOTTLE"
            />
          </Link>
          <Link href="/products/?category=jacket">
            <ProductAvatar url="/product/womenjack1.jpg" fallback="JACKET" />
          </Link>
        </div>
      </section>
      {/* carsouel */}
      <CuratedForYouItem />
    </main>
  );
}
