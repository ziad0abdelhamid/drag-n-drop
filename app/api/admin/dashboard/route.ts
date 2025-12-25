import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { isAdmin } from "@/lib/middleware"

export async function GET(request: NextRequest) {
  try {
    const adminUser = await isAdmin()
    if (!adminUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Total revenue
    const revenueResult = await query(
      "SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status = 'paid'",
    )
    const totalRevenue = Number.parseFloat(revenueResult[0].total)

    // Total orders
    const ordersResult = await query("SELECT COUNT(*) as count FROM orders")
    const totalOrders = Number.parseInt(ordersResult[0].count)

    // Total products
    const productsResult = await query("SELECT COUNT(*) as count FROM products")
    const totalProducts = Number.parseInt(productsResult[0].count)

    // Low stock products
    const lowStockResult = await query("SELECT COUNT(*) as count FROM products WHERE stock_quantity < 10")
    const lowStockProducts = Number.parseInt(lowStockResult[0].count)

    // Recent orders
    const recentOrdersResult = await query(
      `SELECT id, customer_name, customer_email, total_amount, status, created_at
       FROM orders
       ORDER BY created_at DESC
       LIMIT 5`,
    )

    // Chart data (sales by date)
    const chartDataResult = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as count, SUM(total_amount) as sales
       FROM orders
       WHERE status = 'paid'
       GROUP BY DATE(created_at)
       ORDER BY date DESC
       LIMIT 30`,
    )

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockProducts,
      recentOrders: recentOrdersResult,
      chartData: chartDataResult,
    })
  } catch (error) {
    console.error("Dashboard error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
