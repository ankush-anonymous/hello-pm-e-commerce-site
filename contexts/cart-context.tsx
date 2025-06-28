"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem, Product } from "@/types/product"

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; size: string; color: string } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size, color } = action.payload
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += 1
        return {
          ...state,
          items: updatedItems,
          total: state.total + product.price,
        }
      }

      return {
        ...state,
        items: [...state.items, { product, quantity: 1, size, color }],
        total: state.total + product.price,
      }
    }
    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) => `${item.product.id}-${item.size}-${item.color}` === action.payload,
      )
      if (!itemToRemove) return state

      return {
        ...state,
        items: state.items.filter((item) => `${item.product.id}-${item.size}-${item.color}` !== action.payload),
        total: state.total - itemToRemove.product.price * itemToRemove.quantity,
      }
    }
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => `${item.product.id}-${item.size}-${item.color}` === id)
      if (!item) return state

      const quantityDiff = quantity - item.quantity
      const updatedItems = state.items.map((item) =>
        `${item.product.id}-${item.size}-${item.color}` === id ? { ...item, quantity } : item,
      )

      return {
        ...state,
        items: updatedItems,
        total: state.total + item.product.price * quantityDiff,
      }
    }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
