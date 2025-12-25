import { query } from "./db"
import type { Product } from "./types"

export async function getAllProducts(category?: string, limit = 50, offset = 0): Promise<Product[]> {
  let sql = "SELECT * FROM products"
  const params: any[] = []

  if (category) {
    sql += " WHERE category = $1"
    params.push(category)
  }

  sql += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2)
  params.push(limit, offset)

  const result = await query(sql, params)
  return result
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const result = await query("SELECT * FROM products WHERE slug = $1", [slug])
  return result.length > 0 ? result[0] : null
}

export async function getProductById(id: string): Promise<Product | null> {
  const result = await query("SELECT * FROM products WHERE id = $1", [id])
  return result.length > 0 ? result[0] : null
}

export async function createProduct(data: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
  const { name, slug, description, price, image_url, category, stock_quantity, sku } = data
  const result = await query(
    "INSERT INTO products (name, slug, description, price, image_url, category, stock_quantity, sku) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [name, slug, description, price, image_url, category, stock_quantity, sku],
  )
  return result[0]
}

export async function updateProduct(id: string, data: Partial<Omit<Product, "id" | "created_at">>): Promise<Product> {
  const fields = Object.keys(data)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ")
  const values = Object.values(data)

  const result = await query(
    `UPDATE products SET ${fields}, updated_at = NOW() WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id],
  )
  return result[0]
}

export async function decreaseStock(productId: string, quantity: number): Promise<void> {
  await query("UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2 AND stock_quantity >= $1", [
    quantity,
    productId,
  ])
}

export async function getCategories(): Promise<string[]> {
  const result = await query("SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category")
  return result.map((r) => r.category)
}
