"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n-config"
import { defaultLocale } from "@/lib/i18n-config"

type LanguageContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function detectBrowserLanguage(): Locale {
  if (typeof window === "undefined") return defaultLocale
  
  const browserLang = navigator.language.toLowerCase()
  
  if (browserLang.startsWith('ru')) return 'ru'
  if (browserLang.startsWith('zh')) return 'zh'
  if (browserLang.startsWith('en')) return 'en'
  
  return defaultLocale
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null
    
    if (savedLocale && ['ru', 'en', 'zh'].includes(savedLocale)) {
      setLocaleState(savedLocale)
    } else {
      // Auto-detect browser language on first visit
      const detectedLocale = detectBrowserLanguage()
      setLocaleState(detectedLocale)
      localStorage.setItem("locale", detectedLocale)
    }
    
    setIsInitialized(true)
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }

  if (!isInitialized) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
