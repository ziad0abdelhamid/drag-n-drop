import { createUser, getUserByEmail } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, password } = await request.json()

    if (!email || !fullName || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: "Email already in use" }, { status: 400 })
    }

    await createUser(email, password, fullName)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 })
  }
}
