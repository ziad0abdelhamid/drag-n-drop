import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getCurrentUser } from "@/lib/middleware"
import { decreaseStock } from "@/lib/products"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await query(
      `SELECT o.*, json_agg(
        json_build_object(
          'id', oi.id,
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'unit_price', oi.unit_price,
          'product', json_build_object('name', p.name, 'image_url', p.image_url)
        )
      ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC`,
      [user.id],
    )

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const { customerEmail, customerName, items, totalAmount, shippingAddress } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Create order
    const orderResult = await query(
      "INSERT INTO orders (user_id, customer_email, customer_name, total_amount, shipping_address, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user?.id || null, customerEmail, customerName, totalAmount, shippingAddress, "pending"],
    )

    const order = orderResult[0]

    // Add order items and decrease stock
    for (const item of items) {
      await query("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)", [
        order.id,
        item.product_id,
        item.quantity,
        item.price,
      ])
      await decreaseStock(item.product_id, item.quantity)
    }

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
