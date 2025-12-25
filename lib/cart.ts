import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./types"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item,
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
