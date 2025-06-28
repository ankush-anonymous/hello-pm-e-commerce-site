"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export type SortOption = "default" | "price-low" | "price-high" | "eco-friendly" | "carbon-low" | "carbon-high"

interface ProductFiltersProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  totalProducts: number
  certifiedCount: number
  estimatedCount: number
  showCertifiedFirst: boolean
  onToggleCertifiedFirst: (show: boolean) => void
}

export function ProductFilters({
  sortBy,
  onSortChange,
  totalProducts,
  certifiedCount,
  estimatedCount,
  showCertifiedFirst,
  onToggleCertifiedFirst,
}: ProductFiltersProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Products:</span>
            <Badge variant="outline">{totalProducts} Total</Badge>
            <Badge className="bg-blue-600 text-white">{certifiedCount} Certified</Badge>
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
              {estimatedCount} Estimated
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2">
              <Button
                variant={showCertifiedFirst ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleCertifiedFirst(true)}
                className={showCertifiedFirst ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                ✓ Certified First
              </Button>
              <Button
                variant={!showCertifiedFirst ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleCertifiedFirst(false)}
              >
                All Products
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="eco-friendly">🌱 Most Eco-Friendly</SelectItem>
                  <SelectItem value="carbon-low">Carbon: Low to High</SelectItem>
                  <SelectItem value="carbon-high">Carbon: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
