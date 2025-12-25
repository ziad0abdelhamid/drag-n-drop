"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0 overflow-hidden bg-muted/50 aspect-square relative">
        {product.image_url ? (
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </CardContent>
      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block group/link">
          <h3 className="font-semibold text-sm group-hover/link:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{product.description}</p>
      </div>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-lg font-bold text-primary">${product.price.toFixed(2)}</div>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onAddToCart?.(product)}
          disabled={product.stock_quantity === 0}
          title={product.stock_quantity === 0 ? "Out of stock" : "Add to cart"}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
