import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { CheckCircle } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
          <h1 className="text-4xl font-bold">Order Confirmed!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for your purchase. Your order has been received and will be processed shortly.
          </p>
          <p className="text-muted-foreground">Check your email for order details and tracking information.</p>
          <div className="flex gap-4 justify-center pt-8">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/account">View Orders</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
