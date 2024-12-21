import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
    <Image
      src="/bg/hero.jpg"
      alt="Hero background"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 text-center text-white space-y-6 p-4 bg-black/50 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold">Winter Collection 2024</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Discover our latest collection of premium products at unbeatable prices.
      </p>
      <Link href="/products">
      <Button size="lg" className="bg-white text-black hover:bg-gray-200 mt-5">
        Shop Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      </Link>
    </div>
  </section>
  )
}

export default Hero