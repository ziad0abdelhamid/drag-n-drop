import { cookies } from "next/headers"
import { getUserByEmail } from "./auth"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userEmail = cookieStore.get("user_email")?.value

  if (!userEmail) {
    return null
  }

  try {
    const user = await getUserByEmail(userEmail)
    return user
  } catch {
    return null
  }
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.is_admin === true
}
