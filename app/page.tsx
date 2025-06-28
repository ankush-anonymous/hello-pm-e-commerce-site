import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockProducts, averageCarbonFootprint } from "@/lib/mock-data"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = mockProducts.filter((product) => product.featured)
  const ecoFriendlyProducts = mockProducts.filter((product) => product.carbonFootprint < averageCarbonFootprint)
  const verifiedProducts = mockProducts.filter((product) => product.isEcoVerified)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Elegant Dresses for
            <br />
            <span className="text-muted-foreground">Every Occasion</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our curated collection of premium dresses for men and women. From formal events to casual
            gatherings, find your perfect style.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/women">
              <Button size="lg">Shop Women</Button>
            </Link>
            <Link href="/men">
              <Button variant="outline" size="lg">
                Shop Men
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Eco-Friendly Offers Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-green-600">🌱</span>
              Eco-Friendly Rewards
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Get instant discounts on dresses with below-average carbon footprint!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-green-600 text-white text-lg px-6 py-2">Up to 20% OFF Low-Carbon Dresses</Badge>
              <Badge variant="outline" className="text-lg px-6 py-2">
                Average: {averageCarbonFootprint.toFixed(1)} kg CO₂
              </Badge>
            </div>
          </div>

          {/* Offer Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-green-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">💚</div>
                <CardTitle className="text-green-700">Instant Eco Discount</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Automatic discounts applied at checkout for dresses with carbon footprint below{" "}
                  {averageCarbonFootprint.toFixed(1)} kg CO₂
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <CardTitle className="text-blue-700">Verified Products</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Look for the verified badge on products with certified carbon efficiency certificates
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle className="text-orange-700">Cashback Rewards</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Earn 5% cashback on verified eco-friendly dresses for your next purchase
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Eco-Friendly Products Showcase */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">🌿 Eco-Friendly Collection</h3>
            <p className="text-muted-foreground mb-6">
              These dresses have carbon footprints below our average of {averageCarbonFootprint.toFixed(1)} kg CO₂
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoFriendlyProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/eco-friendly">
              <Button className="bg-green-600 hover:bg-green-700">View All Eco-Friendly Dresses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground">Handpicked pieces that define elegance and style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/women" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-600">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-bold mb-2">Women's Collection</h3>
                    <p className="text-lg opacity-90">Elegant & Sophisticated</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/men" className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-gradient-to-br from-gray-600 to-gray-900">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl font-bold mb-2">Men's Collection</h3>
                    <p className="text-lg opacity-90">Classic & Modern</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-blue-600">✓</span>
              Certified Eco-Friendly
            </h2>
            <p className="text-muted-foreground">Products with verified carbon efficiency certificates</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <span className="text-green-600">🌱</span>
              Sustainable Fashion
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We believe in transparent, sustainable fashion. Every product displays its carbon footprint, helping you
              make environmentally conscious choices without compromising on style.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6">
                <div className="text-2xl mb-2">♻️</div>
                <h3 className="font-semibold mb-2">Eco-Friendly Materials</h3>
                <p className="text-sm text-muted-foreground">Sourced from sustainable and recycled materials</p>
              </div>
              <div className="p-6">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Carbon Transparency</h3>
                <p className="text-sm text-muted-foreground">Full carbon footprint disclosure for every product</p>
              </div>
              <div className="p-6">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="font-semibold mb-2">Global Impact</h3>
                <p className="text-sm text-muted-foreground">Contributing to a more sustainable fashion industry</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
