import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/products/product-card"
import { mockProducts } from "@/lib/mock-data"

export default function WomenPage() {
  const womenProducts = mockProducts.filter((product) => product.category === "women")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Women's Collection</h1>
          <p className="text-muted-foreground text-lg">Elegant and sophisticated dresses for every occasion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
