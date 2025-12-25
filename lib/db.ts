import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function query(text: string, params?: any[]) {
  try {
    const result = await sql.query(text, params)
    return result
  } catch (error) {
    console.error("Database error:", error)
    throw error
  }
}

export default sql
