"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, BarChart3, LogOut } from "lucide-react"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/inventory", icon: Package, label: "Inventory" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/"
  }

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              asChild
            >
              <span>
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
