"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/cart-context"
import { mockProducts, averageCarbonFootprint } from "@/lib/mock-data"
import { ShoppingCart, Heart, Share2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { dispatch } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </div>
    )
  }

  const isLowCarbon = product.carbonFootprint < averageCarbonFootprint
  const discountPercentage = isLowCarbon ? Math.round((averageCarbonFootprint - product.carbonFootprint) * 2) : 0
  const discountAmount = (product.price * discountPercentage) / 100
  const finalPrice = product.price - discountAmount

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select size and color",
        description: "Both size and color are required to add to cart.",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
        size: selectedSize,
        color: selectedColor,
      },
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg relative">
              {isLowCarbon && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">
                    {discountPercentage}% ECO DISCOUNT
                  </Badge>
                </div>
              )}
              {product.isEcoVerified && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    ✓ VERIFIED
                  </Badge>
                </div>
              )}
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.featured && <Badge variant="secondary">Featured</Badge>}
                {product.isEcoVerified && <Badge className="bg-blue-600 text-white">✓ Eco Verified</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Price Section with Discount */}
              <div className="mb-4">
                {isLowCarbon && discountPercentage > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-green-600">${finalPrice.toFixed(2)}</span>
                      <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                      <Badge className="bg-green-600 text-white">Save ${discountAmount.toFixed(2)}</Badge>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      🌱 Eco-friendly discount applied automatically!
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl font-bold">${product.price}</span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Carbon Footprint - Prominently Displayed */}
            <Card
              className={`border-2 ${isLowCarbon ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className={`text-2xl ${isLowCarbon ? "text-green-600" : "text-orange-600"}`}>🌱</span>
                    Carbon Footprint
                  </h3>
                  {product.isEcoVerified && (
                    <Button variant="outline" size="sm" className="text-blue-600 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Certificate
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">This Product:</span>
                    <span className={`font-bold text-2xl ${isLowCarbon ? "text-green-600" : "text-orange-600"}`}>
                      {product.carbonFootprint} kg CO₂
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Site Average:</span>
                    <span className="font-semibold">{averageCarbonFootprint.toFixed(1)} kg CO₂</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${isLowCarbon ? "bg-green-600" : "bg-orange-600"}`}
                      style={{ width: `${Math.min(100, (product.carbonFootprint / averageCarbonFootprint) * 100)}%` }}
                    ></div>
                  </div>
                  <p className={`text-sm font-medium ${isLowCarbon ? "text-green-600" : "text-orange-600"}`}>
                    {isLowCarbon
                      ? `🌿 ${(averageCarbonFootprint - product.carbonFootprint).toFixed(1)} kg CO₂ below average - Great choice!`
                      : `⚠️ ${(product.carbonFootprint - averageCarbonFootprint).toFixed(1)} kg CO₂ above average`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart} className="flex-1" disabled={!product.inStock}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.inStock
                  ? `Add to Cart - $${isLowCarbon ? finalPrice.toFixed(2) : product.price}`
                  : "Out of Stock"}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Sizes:</span>
                    <span>{product.sizes.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available Colors:</span>
                    <span>{product.colors.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stock Status:</span>
                    <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eco Certification:</span>
                    <span className={product.isEcoVerified ? "text-blue-600" : "text-muted-foreground"}>
                      {product.isEcoVerified ? "✓ Verified" : "Not Certified"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
