import { getCurrentUser } from "@/lib/middleware"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 })
    }

    return NextResponse.json({
      isLoggedIn: true,
      isAdmin: user.is_admin,
      email: user.email,
    })
  } catch (error) {
    return NextResponse.json({ isLoggedIn: false }, { status: 401 })
  }
}
