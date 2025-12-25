import Stripe from "stripe"
import { type NextRequest, NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-10-28.acacia",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, orderId, customerEmail } = await request.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Order " + orderId,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/cancel`,
      customer_email: customerEmail,
    })

    return NextResponse.json({ clientSecret: session.id })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Failed to create payment session" }, { status: 500 })
  }
}
