"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const { state } = useCart()
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">DressStore</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/women" className="text-sm font-medium hover:underline">
              Women
            </Link>
            <Link href="/men" className="text-sm font-medium hover:underline">
              Men
            </Link>
     
            <Link href="/gallery" className="text-sm font-medium hover:underline">
              Gallery
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <Input type="search" placeholder="Search dresses..." className="w-64" />
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/admin">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/women" className="text-lg font-medium">
                  Women
                </Link>
                <Link href="/men" className="text-lg font-medium">
                  Men
                </Link>
                <Link href="/featured" className="text-lg font-medium">
                  Featured
                </Link>
                <Link href="/gallery" className="text-lg font-medium">
                  Gallery
                </Link>
                <div className="pt-4">
                  <Input type="search" placeholder="Search dresses..." className="w-full" />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
