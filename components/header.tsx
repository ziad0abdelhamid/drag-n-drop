"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, LogOut, Globe } from "lucide-react"
import { useEffect, useState } from "react"
import { languages } from "@/lib/i18n"
import { useI18n } from "@/lib/i18n-context"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const { language, setLanguage, t } = useI18n()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    const checkAuth = async () => {
      const response = await fetch("/api/auth/check")
      if (response.ok) {
        const data = await response.json()
        setIsLoggedIn(true)
        setIsAdmin(data.isAdmin)
      }
    }
    checkAuth()
  }, [])

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsLoggedIn(false)
    setIsAdmin(false)
    router.push("/")
  }

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <span className="text-primary-foreground font-bold text-lg">✦</span>
            </div>
            <span className="font-semibold text-xl hidden sm:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Drag N' Drop
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.shop")}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t("nav.about")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="hidden sm:flex items-center gap-1 border-l border-r border-border px-3">
              <Globe className="w-4 h-4 text-muted-foreground" />
              {Object.entries(languages).map(([code]) => (
                <Button
                  key={code}
                  variant={language === code ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage(code as "en" | "ar" | "de")}
                  className="text-xs font-medium px-2 h-8"
                >
                  {code.toUpperCase()}
                </Button>
              ))}
            </div>

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin">{t("nav.admin")}</Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">{t("auth.signin")}</Link>
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
