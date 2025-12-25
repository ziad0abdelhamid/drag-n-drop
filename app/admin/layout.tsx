import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { getCurrentUser } from "@/lib/middleware"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || !user.is_admin) {
    redirect("/auth/login")
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  )
}
