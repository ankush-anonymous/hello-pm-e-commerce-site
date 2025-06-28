"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/types/product"
import { Plus, Edit, Trash2, Upload, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [products, setProducts] = useState(mockProducts)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "women" as "men" | "women",
    sizes: [] as string[],
    colors: [] as string[],
    featured: false,
    inStock: true,
    carbonFootprint: "",
    carbonCertificate: "",
    isEcoVerified: false,
    imageUrl: "", // Add this line
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "women",
      sizes: [],
      colors: [],
      featured: false,
      inStock: true,
      carbonFootprint: "",
      carbonCertificate: "",
      isEcoVerified: false,
      imageUrl: "", // Add this line
    })
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      sizes: formData.sizes,
      colors: formData.colors,
      images: formData.imageUrl
        ? [formData.imageUrl]
        : editingProduct?.images || [
            `/placeholder.svg?height=600&width=400&query=${encodeURIComponent(formData.name + " " + formData.category + " dress")}`,
          ],
      inStock: formData.inStock,
      featured: formData.featured,
      carbonFootprint: Number.parseFloat(formData.carbonFootprint),
      carbonCertificate: formData.carbonCertificate || undefined,
      isEcoVerified: !!formData.carbonCertificate, // Auto-verify if certificate is uploaded
      createdAt: editingProduct?.createdAt || new Date(),
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)))
      toast({ title: "Product updated successfully" })
    } else {
      setProducts([...products, newProduct])
      toast({ title: "Product added successfully" })
    }

    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      sizes: product.sizes,
      colors: product.colors,
      featured: product.featured,
      inStock: product.inStock,
      carbonFootprint: product.carbonFootprint.toString(),
      carbonCertificate: product.carbonCertificate || "",
      isEcoVerified: product.isEcoVerified,
      imageUrl: product.images[0] || "", // Add this line
    })
    setShowAddForm(true)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
    toast({ title: "Product deleted successfully" })
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, sizes: [...formData.sizes, size] })
    } else {
      setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== size) })
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, colors: [...formData.colors, color] })
    } else {
      setFormData({ ...formData, colors: formData.colors.filter((c) => c !== color) })
    }
  }

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a server and get back a URL
      const mockUrl = `/certificates/${file.name}`
      setFormData({ ...formData, carbonCertificate: mockUrl })
      toast({ title: "Certificate uploaded successfully" })
    }
  }

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const availableColors = [
    "Black",
    "White",
    "Gray",
    "Navy",
    "Burgundy",
    "Red",
    "Blue",
    "Green",
    "Beige",
    "Gold",
    "Emerald",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Add/Edit Product Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="carbonFootprint">Carbon Footprint (kg CO₂)</Label>
                  <Input
                    id="carbonFootprint"
                    type="number"
                    step="0.1"
                    value={formData.carbonFootprint}
                    onChange={(e) => setFormData({ ...formData, carbonFootprint: e.target.value })}
                    placeholder="e.g., 8.5"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the carbon footprint in kg CO₂ equivalent for this product
                  </p>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Product Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter a direct URL to the product image. If left empty, a placeholder will be generated.
                  </p>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={formData.imageUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="w-20 h-24 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=96&width=80"
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Carbon Certificate Upload */}
                <div className="space-y-2">
                  <Label htmlFor="certificate">Carbon Efficiency Certificate</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="certificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCertificateUpload}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.carbonCertificate && (
                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                      <Badge className="bg-green-600 text-white">✓ Certificate Uploaded</Badge>
                      <span className="text-sm text-green-700">{formData.carbonCertificate.split("/").pop()}</span>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Upload a carbon efficiency certificate to get the verified badge. Accepted formats: PDF, JPG, PNG
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: "men" | "women") => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Available Sizes</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          checked={formData.sizes.includes(size)}
                          onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                        />
                        <Label htmlFor={`size-${size}`}>{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Available Colors</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {availableColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={formData.colors.includes(color)}
                          onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked as boolean })}
                    />
                    <Label htmlFor="inStock">In Stock</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <Badge variant="outline">{product.category}</Badge>
                      {product.featured && <Badge variant="secondary">Featured</Badge>}
                      {product.isEcoVerified && <Badge className="bg-blue-600 text-white">✓ Verified</Badge>}
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">{product.description}</p>
                    <p className="text-xl font-bold mb-2">${product.price}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Sizes: {product.sizes.join(", ")}</p>
                      <p>Colors: {product.colors.join(", ")}</p>
                      <p className="flex items-center gap-1">
                        <span className="text-green-600">🌱</span>
                        Carbon Footprint: {product.carbonFootprint} kg CO₂
                      </p>
                      {product.carbonCertificate && (
                        <p className="flex items-center gap-1 text-blue-600">
                          <span>📄</span>
                          Certificate: {product.carbonCertificate.split("/").pop()}
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Download className="h-3 w-3" />
                          </Button>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
