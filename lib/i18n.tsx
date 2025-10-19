"use client"

import { translations } from "@/messages/message"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "lo" | "th"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language | null>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "lo", "th"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      setLanguage("en")
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    if (!language) return key // prevent mismatch
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // 🧠 Don’t render children until language is loaded
  if (!language) return null

  return (
    <TranslationContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}


export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
