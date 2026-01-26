"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"
import { useState, useEffect } from "react"

export function Hero() {
  const t = useTranslations()
  const { get, loading } = useSiteContent("hero")
  const [bannerImage, setBannerImage] = useState(
    "/images/hero-banner-oil-gas.jpg",
  )

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        console.log("Hero: Fetching banner image")
        const response = await fetch("/api/hero-banner")
        const data = await response.json()

        if (data.banner?.image_url) {
          console.log("Hero: Banner loaded:", data.banner.image_url)
          setBannerImage(data.banner.image_url)
        }
      } catch (error) {
        console.error("Hero: Error fetching banner:", error)
      }
    }

    fetchBanner()
  }, [])

  const scrollToNextSection = () => {
    const certificatesSection = document.querySelector("#certificates")
    if (certificatesSection) {
      certificatesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const title = get("title") || t("hero.title")
  const description = get("description") || t("hero.description")
  const contactButton = get("contactButton") || t("hero.contactButton")
  const certificatesButton = get("certificatesButton") || t("hero.certificatesButton")

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[85vh] 2xl:min-h-screen flex items-center justify-start overflow-hidden bg-card dark:bg-[#1a1f2e]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bannerImage || "/placeholder.svg"}
          alt="ТД Медведь - Складской комплекс"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-card/95 via-card/70 to-transparent dark:from-[#1a1f2e]/95 dark:via-[#1a1f2e]/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 lg:pt-24 2xl:pt-32 pb-20 lg:pb-12 2xl:pb-20">
        <div className="max-w-3xl">
          <h1 className="mb-6 lg:mb-4 2xl:mb-6 text-3xl leading-tight text-foreground font-extrabold md:text-5xl lg:text-4xl 2xl:text-5xl">
            {title}
          </h1>

          <p className="mb-10 lg:mb-6 2xl:mb-10 text-sm leading-relaxed max-w-2xl font-light text-foreground md:text-xl lg:text-lg 2xl:text-xl">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-3 2xl:gap-4 mb-16 lg:mb-8 2xl:mb-16">
            <Button
              size="lg"
              className="bg-[#B19D76] text-white hover:bg-[#B19D76]/90 font-semibold text-base px-8 rounded-sm transition-all duration-200 hover:scale-105"
              onClick={scrollToContact}
            >
              {contactButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold text-base px-8 rounded-sm transition-all duration-200 hover:scale-105 bg-transparent"
              onClick={scrollToNextSection}
            >
              {certificatesButton}
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        aria-label={t("hero.scrollDown")}
      >
        <div className="bg-background/80 border border-border rounded-md p-3 transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10">
          <ArrowRight className="h-5 w-5 text-foreground rotate-90 transition-colors group-hover:text-primary" />
        </div>
      </button>
    </section>
  )
}
