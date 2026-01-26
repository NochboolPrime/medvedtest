"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const t = useTranslations()

  // Use useCallback to avoid re-creating function on each render
  const checkConsent = useCallback(() => {
    try {
      const consent = localStorage.getItem("cookieConsent")
      if (!consent) {
        setShowConsent(true)
      }
    } catch (error) {
      // localStorage may not be available in some environments
      console.warn("[v0] CookieConsent: localStorage not available")
    }
  }, [])

  useEffect(() => {
    // Set mounted state first
    setIsMounted(true)
    
    // Use requestAnimationFrame to ensure DOM is ready
    // This fixes rendering issues on some hosting providers like Beget
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        checkConsent()
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [checkConsent])

  const acceptCookies = useCallback(() => {
    try {
      localStorage.setItem("cookieConsent", "accepted")
    } catch (error) {
      console.warn("[v0] CookieConsent: Could not save consent")
    }
    setShowConsent(false)
  }, [])

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) return null
  if (!showConsent) return null

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      style={{ 
        animation: "slideInFromBottom 0.5s ease-out forwards",
        transform: "translateY(100%)",
      }}
    >
      <style jsx>{`
        @keyframes slideInFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="container mx-auto max-w-5xl">
        <div className="relative rounded-lg border border-border bg-background shadow-2xl p-4 md:p-6">
          <button
            onClick={acceptCookies}
            className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={t("cookieConsent.close")}
            type="button"
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
              <Button 
                onClick={acceptCookies} 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                type="button"
              >
                {t("cookieConsent.accept")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
