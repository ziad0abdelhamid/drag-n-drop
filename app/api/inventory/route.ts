import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const adminUser = await isAdmin()
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const inventory = await query(
      `SELECT id, name, sku, stock_quantity, price, category, created_at
       FROM products
       ORDER BY name ASC`,
    )

    return NextResponse.json(inventory)
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const adminUser = await isAdmin()
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId, quantity } = await request.json()

    const result = await query("UPDATE products SET stock_quantity = $1 WHERE id = $2 RETURNING *", [
      quantity,
      productId,
    ])

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 })
  }
}
