"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-lg border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg p-4 md:p-6">
          <button
            onClick={acceptCookies}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={t("cookieConsent.close")}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pr-8">
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">{t("cookieConsent.title")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("cookieConsent.description")}{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  {t("cookieConsent.privacyPolicy")}
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-2 shrink-0">
              <Button onClick={acceptCookies} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t("cookieConsent.accept")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
