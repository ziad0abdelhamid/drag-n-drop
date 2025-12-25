import * as bcrypt from "bcryptjs"
import { query } from "./db"
import type { User } from "./types"

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function createUser(email: string, password: string, fullName: string): Promise<User> {
  const passwordHash = await hashPassword(password)
  const result = await query(
    "INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name, is_admin, created_at, updated_at",
    [email, passwordHash, fullName],
  )
  return result[0]
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await query(
    "SELECT id, email, full_name, is_admin, created_at, updated_at FROM users WHERE email = $1",
    [email],
  )
  return result.length > 0 ? result[0] : null
}

export async function getUserWithPassword(email: string) {
  const result = await query(
    "SELECT id, email, password_hash, full_name, is_admin, created_at, updated_at FROM users WHERE email = $1",
    [email],
  )
  return result.length > 0 ? result[0] : null
}
