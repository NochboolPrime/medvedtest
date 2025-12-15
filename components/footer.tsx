"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"
import { useTranslations } from "@/hooks/use-translations"
import { useTheme } from "next-themes"
import { useSiteContent } from "@/hooks/use-site-content"

export function Footer() {
  const t = useTranslations()
  const { theme } = useTheme()
  const { get } = useSiteContent("footer")

  const companyName = get("companyName") || t("footer.companyName")
  const companyDescription = get("companyDescription") || t("footer.companyDescription")
  const companySubtitle = get("companySubtitle") || t("header.companySubtitle")

  return (
    <footer className="bg-card dark:bg-[#1a1f2e] text-foreground mt-4 md:mt-6 lg:mt-8 2xl:mt-10 border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-12 w-12 items-center justify-center text-foreground">
                {theme === "light" ? (
                  <Image
                    src="/images/logo-light.svg"
                    alt="Медведь Логотип"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Logo className="w-full h-full" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">{companyName}</span>
                <span className="text-xs text-muted-foreground">{companySubtitle}</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{companyDescription}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, "#hero")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {t("header.nav.home")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "#about")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {t("header.nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => scrollToSection(e, "#equipment")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {t("header.nav.products")}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, "#services")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {t("header.nav.services")}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {t("header.nav.contacts")}
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">{t("services.items.cementing.title")}</li>
              <li className="text-sm text-muted-foreground">{t("services.items.fracturing.title")}</li>
              <li className="text-sm text-muted-foreground">{t("services.items.pumps.title")}</li>
              <li className="text-sm text-muted-foreground">{t("services.items.modernization.title")}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.contacts")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+74957775660"
                  className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  +7 (495) 777-56-60
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aomedved.ru"
                  className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  info@aomedved.ru
                </a>
              </li>
              <li>
                <a
                  href="https://yandex.ru/maps/?text=107031%2C%20г.%20Москва%2C%20ВН.ТЕР.Г.%20Муниципальный%20округ%20Тверской%2C%20ул.%20Дмитровка%20Б.%2C%20д.%2032%2C%20стр.%209%2C%20пом.%203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
            <p>
              © 2025 {companyName}. {t("footer.rights")}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <span className="hidden md:inline">•</span>
              <Link
                href="/personal-data"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {t("footer.personalData")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
