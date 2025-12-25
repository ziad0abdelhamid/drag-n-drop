"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart"
import { Trash2, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const total = getTotal()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/shop">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{items.length} items in cart</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          max={item.product.stock_quantity}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value))}
                          className="w-16"
                        />
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
