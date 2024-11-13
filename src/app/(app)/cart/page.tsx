import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <section className="flex flex-col lg:flex-row md:px-5 xl:px-32 px-5 mt-16 gap-5">
          <article className="flex flex-col w-full lg:w-2/3 space-y-6">
            <section className="flex flex-col border p-2 order-2">
              <h3 className="text-md md:text-xl font-bold text-red-500">
                Members get free shipping on orders $50+
              </h3>
              <p className="text-gray-500 text-sm md:text-md">
                Become a Nike Member for fast free shipping on orders $50+
              </p>
            </section>
            <CartItem />
          </article>
          <CartSummary />
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
