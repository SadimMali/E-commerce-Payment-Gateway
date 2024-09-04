import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";

const Page = () => {
  const data = false;

  return (
    <div>
      <MaxWidthWrapper>
        <section className="flex flex-col md:flex-row md:px-5 xl:px-32 px-5 mt-16 gap-5">
          <article className="flex flex-col w-full md:w-2/3 space-y-6">
            <section className="flex flex-col border p-2 order-2">
              <h3 className="text-lg md:text-xl font-bold text-red-500">
                Members get free shipping on orders $50+
              </h3>
              <p className="text-gray-500 text-md">
                Become a Nike Member for fast free shipping on orders $50+
              </p>
            </section>

            <section className="order-1 lg:order-2">
              <div className="flex gap-5 items-center justify-center lg:justify-start mb-5 lg:mb-0">
                <h4 className="text-2xl font-semibold">Bag</h4>
                <p className="block lg:hidden">- | 0 | - </p>
              </div>
              {!data && (
                <p className="hidden lg:block">
                  There are no items in the bag.
                </p>
              )}
            </section>
          </article>
          {/* Data section */}
          {data && <section></section>}

          <aside className="md:w-1/3 md:px-5">
            <h3 className="text-2xl font-medium">Summary</h3>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Subtotal</span>
              <span>$160</span>
            </div>
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">
                Estimated Shipping & Handling
              </span>
              <span>$7</span>
            </div>
            <div className="w-full border px-2 mt-3" />
            <div className="flex w-full items-center justify-between mt-2">
              <span className="font-semibold">Total</span>
              <span>$7</span>
            </div>
            <div className="w-full border mt-2" />
          </aside>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
