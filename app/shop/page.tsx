"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/lib/cart"
import type { Product } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const { addItem } = useCart()
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) throw new Error("Failed to fetch")
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem(product, 1)
    // Show a toast or redirect to cart
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-lg text-muted-foreground">Discover our curated collection of luxury items</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-destructive">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
