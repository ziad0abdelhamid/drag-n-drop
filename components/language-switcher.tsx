"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { languages } from "@/lib/i18n"
import { useEffect, useState } from "react"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentLang, setCurrentLang] = useState("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const lang = searchParams.get("lang") || localStorage.getItem("lang") || "en"
    setCurrentLang(lang)
  }, [searchParams])

  if (!mounted) return null

  const switchLanguage = (newLang: string) => {
    localStorage.setItem("lang", newLang)
    const newParams = new URLSearchParams(searchParams)
    newParams.set("lang", newLang)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <div className="flex gap-2">
      {Object.entries(languages).map(([code, label]) => (
        <Button
          key={code}
          variant={currentLang === code ? "default" : "outline"}
          size="sm"
          onClick={() => switchLanguage(code)}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
