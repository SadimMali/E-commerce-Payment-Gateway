import CuratedForYouItem from "@/components/CuratedForYouItem";

export default function Home() {
  return (
    <main className="px-5 py-5 md:px-24 lg:px-32">

      {/* search by category */}
      <section className="my-5">
        <div className="flex justify-between">
          <p className="font-bold text-lg">Shop by category</p>
          <span className="text-slate-400 text-md">See All</span>
        </div>
        <div className="flex gap-5 pt-2">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-slate-700"></div>
            <p className="font-semibold text-md">text</p>
          </div>
        </div>
      </section>
      {/* carsouel */}
       <CuratedForYouItem />
    </main>
  );
}
