import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { AlertCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-4xl font-bold">Payment Cancelled</h1>
          <p className="text-xl text-muted-foreground">Your payment was cancelled. Your cart has been saved.</p>
          <p className="text-muted-foreground">You can return to checkout anytime to complete your purchase.</p>
          <div className="flex gap-4 justify-center pt-8">
            <Button asChild>
              <Link href="/cart">Back to Cart</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
