import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"

const SpecialOffer = () => {
  return (
    <section className="py-16 container">
    <div className="relative rounded-lg overflow-hidden">
      <Image
        src="/bg/noikebg.jpg"
        alt="Special offer background"
        width={1200}
        height={400}
        className="object-cover w-full h-[400px]"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex items-center justify-center text-white text-center p-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Special Offer</h2>
          <p className="text-lg md:text-xl max-w-xl">
            Get 20% off on all products this weekend. Use code winter20 at
            checkout.
          </p>
          <Link href="/products" className="mt-20">
            {" "}
            <Button 
              variant="outline"
              className="bg-white text-black hover:bg-gray-200 mt-5"
            >
              Shop Now <ChevronRight className="ml-2 h-4 w-4" />
            </Button>{" "}
          </Link>
        </div>
      </div>
    </div>
  </section>

  )
}

export default SpecialOffer