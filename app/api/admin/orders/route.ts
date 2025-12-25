import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const adminUser = await isAdmin()
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await query(
      `SELECT * FROM orders
       ORDER BY created_at DESC`,
    )

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching admin orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
