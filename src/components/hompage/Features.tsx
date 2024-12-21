import { Clock, Package, RefreshCw, ShoppingCart } from "lucide-react"
import { Card, CardContent } from "../ui/card"

const Features = () => {
  return (
    <section className="py-12 bg-muted">
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <Card>
        <CardContent className="flex items-center space-x-4 pt-6">
          <ShoppingCart className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-semibold">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over $100</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center space-x-4 pt-6">
          <Package className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-semibold">Secure Packaging</h3>
            <p className="text-sm text-muted-foreground">Safe & secure delivery</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center space-x-4 pt-6">
          <RefreshCw className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-semibold">30 Days Return</h3>
            <p className="text-sm text-muted-foreground">Easy returns & refunds</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center space-x-4 pt-6">
          <Clock className="h-10 w-10 text-primary" />
          <div>
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">Customer service</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  )
}

export default Features