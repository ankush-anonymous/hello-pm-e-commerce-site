"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/products/product-card"
import { ProductFilters, type SortOption } from "@/components/products/product-filters"
import { mockProducts } from "@/lib/mock-data"

export default function WomenPage() {
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [showCertifiedFirst, setShowCertifiedFirst] = useState(true)

  const womenProducts = mockProducts.filter((product) => product.category === "women")
  const certifiedCount = womenProducts.filter((p) => p.isEcoVerified).length
  const estimatedCount = womenProducts.filter((p) => p.isCarbonEstimated).length

  const sortProducts = (products: typeof womenProducts, sortOption: SortOption) => {
    const sorted = [...products]

    switch (sortOption) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "eco-friendly":
        return sorted.sort((a, b) => {
          // Prioritize verified, then low carbon footprint
          if (a.isEcoVerified && !b.isEcoVerified) return -1
          if (!a.isEcoVerified && b.isEcoVerified) return 1
          return a.carbonFootprint - b.carbonFootprint
        })
      case "carbon-low":
        return sorted.sort((a, b) => a.carbonFootprint - b.carbonFootprint)
      case "carbon-high":
        return sorted.sort((a, b) => b.carbonFootprint - a.carbonFootprint)
      default:
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }

  const organizeProducts = (products: typeof womenProducts) => {
    if (!showCertifiedFirst) {
      return sortProducts(products, sortBy)
    }

    const certified = products.filter((p) => p.isEcoVerified)
    const estimated = products.filter((p) => !p.isEcoVerified)

    return [...sortProducts(certified, sortBy), ...sortProducts(estimated, sortBy)]
  }

  const organizedProducts = organizeProducts(womenProducts)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Women's Collection</h1>
          <p className="text-muted-foreground text-lg">Elegant and sophisticated dresses for every occasion</p>
        </div>

        <ProductFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalProducts={womenProducts.length}
          certifiedCount={certifiedCount}
          estimatedCount={estimatedCount}
          showCertifiedFirst={showCertifiedFirst}
          onToggleCertifiedFirst={setShowCertifiedFirst}
        />

        {showCertifiedFirst && (
          <>
            {/* Certified Products Section */}
            {organizedProducts.filter((p) => p.isEcoVerified).length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">✓ Certified Products</h2>
                  <div className="h-px bg-blue-200 flex-1"></div>
                  <span className="text-sm text-blue-600 font-medium">
                    {organizedProducts.filter((p) => p.isEcoVerified).length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {organizedProducts
                    .filter((p) => p.isEcoVerified)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            )}

            {/* Estimated Products Section */}
            {organizedProducts.filter((p) => !p.isEcoVerified).length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold">~ Estimated Carbon Footprint</h2>
                  <div className="h-px bg-orange-200 flex-1"></div>
                  <span className="text-sm text-orange-600 font-medium">
                    {organizedProducts.filter((p) => !p.isEcoVerified).length} items
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {organizedProducts
                    .filter((p) => !p.isEcoVerified)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {!showCertifiedFirst && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {organizedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
