import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const FeaturedProduct = ({featuredProducts}: {featuredProducts: any}) => {
  return (
    <section className="py-16 px-10 md:px-1 bg-muted">
    <div className="container">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
        <p className="text-muted-foreground">Handpicked products for you</p>
      </div>
      <Carousel className="max-w-5xl mx-auto">
        <CarouselContent>
          {featuredProducts.map((product:any) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <CardHeader className="p-0 bg-gray-100">
                  <div className="relative h-48">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-contain rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <Badge>{product.category.name}</Badge>
                  <h3 className="font-semibold mt-2">{product.name}</h3>
                
                  <p className="font-semibold text-sm text-gray-400 mt-2">{product.style}</p>
                  <p className="font-bold mt-2">Rs {product.price}</p>

                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
  )
}

export default FeaturedProduct