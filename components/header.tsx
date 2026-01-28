"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Phone, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslations } from "@/hooks/use-translations"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [newsEnabled, setNewsEnabled] = useState(false)
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchNewsStatus = async () => {
      try {
        const response = await fetch("/api/site-settings")
        const data = await response.json()
        setNewsEnabled(data.settings?.news_enabled ?? false)
      } catch (error) {
        console.error("Error fetching news status:", error)
      }
    }
    fetchNewsStatus()

    const handleFocus = () => {
      fetchNewsStatus()
    }
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (isHomePage) {
      const element = document.querySelector(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      router.push(`/${id}`)
    }
  }

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    if (isHomePage) {
      const element = document.querySelector("#contact")
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    } else {
      router.push("/#contact")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-card/98 dark:bg-[#1C2433]/98 backdrop-blur-lg shadow-lg border-b border-border`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center text-foreground">
              <Logo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl tracking-tight font-extrabold text-foreground">{t("header.companyName")}</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">{t("header.companySubtitle")}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="/#hero"
              onClick={(e) => handleNavClick(e, "#hero")}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.home")}
            </a>
            <a
              href="/#about"
              onClick={(e) => handleNavClick(e, "#about")}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.about")}
            </a>
            <a
              href="/#products"
              onClick={(e) => handleNavClick(e, "#products")}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.products")}
            </a>
            <Link
              href="/catalog"
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.catalog")}
            </Link>
            {newsEnabled && (
              <Link
                href="/news"
                className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
              >
                {t("header.nav.news")}
              </Link>
            )}
            <a
              href="/#services"
              onClick={(e) => handleNavClick(e, "#services")}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.services")}
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            >
              {t("header.nav.contacts")}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />

            <div className="hidden flex-col items-end md:flex">
              <a
                href="tel:+74957775600"
                className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-muted-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                {t("header.phone")}
              </a>
              <a
                href="mailto:sales@medved-neftegaz.ru"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mt-1"
              >
                <Mail className="h-3 w-3" />
                {t("header.email")}
              </a>
            </div>
            <Button
              onClick={handleContactClick}
              className="bg-[#B19D76] text-white hover:bg-[#B19D76]/90 font-semibold transition-all duration-200 hover:scale-105"
            >
              {t("header.contactButton")}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[80px] bg-black/50 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-[80px] right-0 h-[calc(100vh-80px)] w-[280px] bg-card dark:bg-[#1C2433] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-6 gap-6">
          {/* Mobile Navigation Links */}
          <a
            href="/#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.home")}
          </a>
          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.about")}
          </a>
          <a
            href="/#products"
            onClick={(e) => handleNavClick(e, "#products")}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.products")}
          </a>
          <Link
            href="/catalog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.catalog")}
          </Link>
          {newsEnabled && (
            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
            >
              {t("header.nav.news")}
            </Link>
          )}
          <a
            href="/#services"
            onClick={(e) => handleNavClick(e, "#services")}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.services")}
          </a>
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="text-base font-medium text-foreground hover:text-[#B19D76] transition-colors py-2"
          >
            {t("header.nav.contacts")}
          </a>

          {/* Mobile Contact Info */}
          <div className="pt-6 mt-6 border-t border-border">
            <a
              href="tel:+74957775600"
              className="flex items-center gap-2 text-base font-semibold text-foreground hover:text-[#B19D76] transition-colors mb-3"
            >
              <Phone className="h-5 w-5" />
              {t("header.phone")}
            </a>
            <a
              href="mailto:sales@medved-neftegaz.ru"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              {t("header.email")}
            </a>
          </div>

          {/* Mobile Contact Button */}
          <Button
            onClick={handleContactClick}
            className="w-full bg-[#B19D76] text-white hover:bg-[#B19D76]/90 font-semibold mt-4"
          >
            {t("header.contactButton")}
          </Button>
        </nav>
      </div>
    </header>
  )
}
