"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Leaf, Award, Gift } from "lucide-react"
import type { CartItem } from "@/types/product"
import { averageCarbonFootprint } from "@/lib/mock-data"

interface CheckoutSuccessPopupProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  orderTotal: number
}

export function CheckoutSuccessPopup({ isOpen, onClose, cartItems, orderTotal }: CheckoutSuccessPopupProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  // Calculate carbon savings
  const totalCarbonFootprint = cartItems.reduce((sum, item) => sum + item.product.carbonFootprint * item.quantity, 0)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const averageIfBought = averageCarbonFootprint * totalQuantity
  const carbonSaved = averageIfBought - totalCarbonFootprint
  const carbonSavedPercentage = ((carbonSaved / averageIfBought) * 100).toFixed(1)

  // Calculate eco-friendly items
  const ecoFriendlyItems = cartItems.filter((item) => item.product.carbonFootprint < averageCarbonFootprint)
  const verifiedItems = cartItems.filter((item) => item.product.isEcoVerified)

  // Calculate cashback for verified items
  const verifiedItemsTotal = verifiedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cashbackAmount = verifiedItemsTotal * 0.05 // 5% cashback

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const getImpactLevel = () => {
    if (carbonSaved > 5) return { level: "Excellent", color: "text-green-600", emoji: "🌟" }
    if (carbonSaved > 2) return { level: "Great", color: "text-green-500", emoji: "🌿" }
    if (carbonSaved > 0) return { level: "Good", color: "text-green-400", emoji: "🌱" }
    return { level: "Standard", color: "text-gray-600", emoji: "📊" }
  }

  const impact = getImpactLevel()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-600" />
              {showConfetti && <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🎉</div>}
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-green-600">Order Confirmed!</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Carbon Impact Section */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">🌍 Environmental Impact</h3>

              {carbonSaved > 0 ? (
                <div className="space-y-3">
                  <div className="text-3xl font-bold text-green-600">-{carbonSaved.toFixed(1)} kg CO₂</div>
                  <p className="text-sm text-green-700">
                    You saved <strong>{carbonSavedPercentage}%</strong> carbon compared to average purchases!
                  </p>
                  <Badge className={`${impact.color} bg-transparent border-current`}>
                    {impact.emoji} {impact.level} Choice!
                  </Badge>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-gray-600">{totalCarbonFootprint.toFixed(1)} kg CO₂</div>
                  <p className="text-sm text-gray-600">Your order's carbon footprint</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rewards Section */}
          {(ecoFriendlyItems.length > 0 || verifiedItems.length > 0) && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Your Eco Rewards</h4>
                </div>

                <div className="space-y-2 text-sm">
                  {ecoFriendlyItems.length > 0 && (
                    <div className="flex justify-between">
                      <span>🌱 Eco-friendly items:</span>
                      <Badge variant="outline" className="text-green-600">
                        {ecoFriendlyItems.length} items
                      </Badge>
                    </div>
                  )}

                  {verifiedItems.length > 0 && (
                    <>
                      <div className="flex justify-between">
                        <span>✅ Verified items:</span>
                        <Badge variant="outline" className="text-blue-600">
                          {verifiedItems.length} items
                        </Badge>
                      </div>

                      {cashbackAmount > 0 && (
                        <div className="flex justify-between font-semibold text-blue-700">
                          <span>💰 Cashback earned:</span>
                          <span>${cashbackAmount.toFixed(2)}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Order Total:</span>
              <span className="font-semibold">${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Items:</span>
              <span className="text-sm">
                {totalQuantity} dress{totalQuantity !== 1 ? "es" : ""}
              </span>
            </div>
          </div>

          {/* Environmental Tip */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Award className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {carbonSaved > 0
                    ? "Thank you for choosing sustainable fashion! 🌱"
                    : "Consider eco-friendly options for your next purchase! 🌍"}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Every sustainable choice makes a difference for our planet.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} className="flex-1">
              Continue Shopping
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Track Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
