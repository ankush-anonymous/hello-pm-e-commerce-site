import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/products/product-card"
import { mockProducts } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function GalleryPage() {
  const womenProducts = mockProducts.filter((product) => product.category === "women")
  const menProducts = mockProducts.filter((product) => product.category === "men")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Complete Collection</h1>
          <p className="text-muted-foreground text-lg">Explore our full range of elegant dresses for men and women</p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="outline" className="text-sm px-4 py-2">
              {mockProducts.length} Total Dresses
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              🌱 Eco-Friendly Collection
            </Badge>
          </div>
        </div>

        {/* Women's Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Women's Collection</h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {womenProducts.length} Dresses
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Men's Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Men's Collection</h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {menProducts.length} Dresses
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Environmental Impact Summary */}
        <section className="mt-16 p-8 bg-muted/50 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-green-600">🌱</span>
              Collection Environmental Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {(mockProducts.reduce((sum, p) => sum + p.carbonFootprint, 0) / mockProducts.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Average kg CO₂ per dress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {mockProducts.filter((p) => p.carbonFootprint < 8).length}
                </div>
                <div className="text-sm text-muted-foreground">Low-impact dresses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-muted-foreground">Carbon footprint transparency</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
