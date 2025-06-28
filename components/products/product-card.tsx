import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { averageCarbonFootprint } from "@/lib/mock-data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowCarbon = product.carbonFootprint < averageCarbonFootprint
  const discountPercentage = isLowCarbon ? Math.round((averageCarbonFootprint - product.carbonFootprint) * 2) : 0

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg relative">
        {/* Eco Discount Badge */}
        {isLowCarbon && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-green-600 hover:bg-green-700 text-white">{discountPercentage}% ECO DISCOUNT</Badge>
          </div>
        )}

        {/* Verified Badge */}
        {product.isEcoVerified && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              ✓ VERIFIED
            </Badge>
          </div>
        )}

        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={400}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              {product.featured && (
                <Badge variant="secondary" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

            {/* Price and Carbon Footprint - Both Highlighted */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold">${product.price}</span>
                {isLowCarbon && discountPercentage > 0 && (
                  <span className="text-xs text-green-600 font-medium">
                    Save ${((product.price * discountPercentage) / 100).toFixed(2)}
                  </span>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>

            {/* Carbon Footprint - Prominently Displayed */}
            <div className="flex items-center justify-between mt-2 p-2 bg-muted/50 rounded-md">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${isLowCarbon ? "text-green-600" : "text-orange-600"}`}>🌱</span>
                <div className="flex flex-col">
                  <span className={`font-bold text-sm ${isLowCarbon ? "text-green-600" : "text-orange-600"}`}>
                    {product.carbonFootprint} kg CO₂
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isLowCarbon ? "Low Impact" : "Standard Impact"}
                  </span>
                </div>
              </div>
              {product.isEcoVerified && <div className="text-blue-600 text-xs font-medium">✓ Certified</div>}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
