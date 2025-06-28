export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "men" | "women"
  sizes: string[]
  colors: string[]
  images: string[]
  inStock: boolean
  featured: boolean
  carbonFootprint: number // in kg CO2 equivalent
  carbonCertificate?: string // URL to certificate file
  isEcoVerified: boolean // whether product has valid certificate
  createdAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}
