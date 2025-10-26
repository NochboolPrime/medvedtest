"use client"

import type React from "react"

import Link from "next/link"
import { Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useState, useEffect } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1C2433]/98 backdrop-blur-lg shadow-lg border-b border-[#B7C5DB]/20`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center text-white">
              <Logo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl tracking-tight font-extrabold">ТД Медведь</span>
              <span className="text-xs text-[#B7C5DB] hidden sm:inline">Нефтегазовое оборудование</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, "#hero")}
              className="text-sm font-medium text-[#B7C5DB] transition-all duration-200 hover:text-white hover:scale-105"
            >
              Главная
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="text-sm font-medium text-[#B7C5DB] transition-all duration-200 hover:text-white hover:scale-105"
            >
              О компании
            </a>
            <a
              href="#equipment"
              onClick={(e) => scrollToSection(e, "#equipment")}
              className="text-sm font-medium text-[#B7C5DB] transition-all duration-200 hover:text-white hover:scale-105"
            >
              Продукция
            </a>
            <a
              href="#services"
              onClick={(e) => scrollToSection(e, "#services")}
              className="text-sm font-medium text-[#B7C5DB] transition-all duration-200 hover:text-white hover:scale-105"
            >
              Услуги
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="text-sm font-medium text-[#B7C5DB] transition-all duration-200 hover:text-white hover:scale-105"
            >
              Контакты
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden flex-col items-end md:flex">
              <a
                href="tel:+74957775660"
                className="flex items-center gap-2 text-base font-semibold text-white hover:text-[#B7C5DB] transition-colors"
              >
                <Phone className="h-4 w-4" />
                +7 (495) 777-56-60
              </a>
              <a
                href="mailto:info@aomedved.ru"
                className="text-xs text-[#B7C5DB] hover:text-white transition-colors flex items-center gap-1 mt-1"
              >
                <Mail className="h-3 w-3" />
                info@aomedved.ru
              </a>
            </div>
            <Button className="bg-[#B19D76] text-white hover:bg-[#B19D76]/90 font-semibold transition-all duration-200 hover:scale-105">
              Связаться
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
