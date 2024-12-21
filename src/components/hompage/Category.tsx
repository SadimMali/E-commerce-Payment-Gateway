import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"

const Category = () => {
    const categories = [
      { name: "Sneaker", image: "/product/afspid.jpg", count: 150 },
      { name: "AllClothing", image: "/product/short-sleeve.jpg", count: 320 },
      { name: "Accessories", image: "/product/sunglass.jpg", count: 230 },
      { name: "Short", image: "/product/shorts.jpg", count: 180 },
    ]
  return (
    <section className="py-16 container ">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
      <p className="text-muted-foreground">Browse our wide selection of products by category</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link href={`/products/?category=${category.name.toLowerCase()}`} key={category.name}>
          <Card className="hover:shadow-lg transition-shadow bg-gray-100">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>{category.count} Products</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </section>
  )
}

export default Category