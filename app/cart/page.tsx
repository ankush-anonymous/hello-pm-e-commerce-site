"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CheckoutSuccessPopup } from "@/components/checkout/checkout-success-popup"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { toast } = useToast()
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false)
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const handleCheckout = async () => {
    setIsProcessingCheckout(true)

    // Simulate checkout processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessingCheckout(false)
    setShowCheckoutPopup(true)
  }

  const handleCheckoutComplete = () => {
    setShowCheckoutPopup(false)
    dispatch({ type: "CLEAR_CART" })
    toast({
      title: "Thank you for your purchase!",
      description: "Your order has been confirmed and you'll receive an email shortly.",
    })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const finalTotal = state.total * 1.1 // Including tax

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => {
              const itemId = `${item.product.id}-${item.size}-${item.color}`
              return (
                <Card key={itemId}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-32 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          width={96}
                          height={128}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="font-semibold">${item.product.price}</p>

                        {/* Carbon footprint info */}
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-green-600">🌱</span>
                          <span className="text-muted-foreground">{item.product.carbonFootprint} kg CO₂ each</span>
                          {item.product.isEcoVerified && <span className="text-blue-600 ml-2">✓ Verified</span>}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(itemId, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(itemId, Number.parseInt(e.target.value) || 0)}
                            className="w-16 text-center"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(itemId, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(itemId)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(state.total * 0.1).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>

                {/* Environmental preview */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-green-800">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-green-600">🌱</span>
                      <span className="font-medium">Environmental Impact</span>
                    </div>
                    <p className="text-xs">
                      Total carbon footprint:{" "}
                      {state.items
                        .reduce((sum, item) => sum + item.product.carbonFootprint * item.quantity, 0)
                        .toFixed(1)}{" "}
                      kg CO₂
                    </p>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessingCheckout}>
                  {isProcessingCheckout ? "Processing..." : "Proceed to Checkout"}
                </Button>
                <Link href="/">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Success Popup */}
      <CheckoutSuccessPopup
        isOpen={showCheckoutPopup}
        onClose={handleCheckoutComplete}
        cartItems={state.items}
        orderTotal={finalTotal}
      />
    </div>
  )
}
