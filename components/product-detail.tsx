"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart"
import { Heart, Share2, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 py-8">
      {/* Product Image */}
      <div className="space-y-4">
        <Card className="aspect-square overflow-hidden bg-muted/50">
          <CardContent className="w-full h-full p-0 flex items-center justify-center relative">
            {product.image_url ? (
              <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="text-muted-foreground">No image available</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{product.category}</p>
            <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            <div className="flex items-baseline gap-4 mt-4">
              <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              {product.stock_quantity > 0 ? (
                <span className="text-sm text-green-600 font-medium">
                  In Stock ({product.stock_quantity} available)
                </span>
              ) : (
                <span className="text-sm text-destructive font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-none bg-transparent"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="px-4 py-2 hover:bg-muted transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={product.stock_quantity === 0}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
