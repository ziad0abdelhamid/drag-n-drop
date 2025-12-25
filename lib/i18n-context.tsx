"use client"

import { createContext, useContext, type ReactNode, useEffect, useState } from "react"
import { getTranslation, languages } from "./i18n"

type Language = "en" | "ar" | "de"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Language | null
    if (savedLang && Object.keys(languages).includes(savedLang)) {
      setLanguage(savedLang)
    }
    setMounted(true)
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("lang", lang)
  }

  const t = (key: string) => getTranslation(language, key)

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
