"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"

interface EquipmentItem {
  id: string
  title: string
  description: string
  slug: string
  image: string
  features: string[]
  title_en?: string
  title_zh?: string
  features_en?: string[]
  features_zh?: string[]
}

interface EquipmentSectionClientProps {
  products: EquipmentItem[]
}

export function EquipmentSectionClient({ products }: EquipmentSectionClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    if (products.length > 0) {
      console.log("[v0] Equipment Section - First product:", products[0])
      console.log("[v0] Equipment Section - First product title_en:", products[0].title_en)
      console.log("[v0] Equipment Section - First product title_zh:", products[0].title_zh)
    }
  }, [locale, products])

  const trackView = async (productId: string) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, eventType: "view" }),
      })
    } catch (error) {
      console.error("[v0] Error tracking view:", error)
    }
  }

  const trackClick = async (productId: string) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, eventType: "click" }),
      })
    } catch (error) {
      console.error("[v0] Error tracking click:", error)
    }
  }

  const getLocalizedTitle = (item: EquipmentItem): string => {
    if (locale === "en" && item.title_en) return item.title_en
    if (locale === "zh" && item.title_zh) return item.title_zh
    return item.title
  }

  const getLocalizedFeatures = (item: EquipmentItem): string[] => {
    if (locale === "en" && item.features_en && item.features_en.length > 0) return item.features_en
    if (locale === "zh" && item.features_zh && item.features_zh.length > 0) return item.features_zh
    return item.features
  }

  return (
    <section id="about" className="py-0 pb-12 bg-background dark:bg-[#1a1f2e]">
      <div className="container mx-auto px-4 md:px-6 max-w-full">
        <div className="mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((item, index) => {
            const localizedTitle = getLocalizedTitle(item)
            const localizedFeatures = getLocalizedFeatures(item)

            return (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer"
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative rounded-lg overflow-hidden bg-[#2c3e50] shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(177,157,118,0.3)]">
                  <div className="relative h-[400px] overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      animate={{
                        scale: hoveredId === item.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={localizedTitle}
                        fill
                        className="object-contain brightness-110 text-background bg-secondary-foreground"
                      />
                    </motion.div>
                  </div>

                  <div className="p-6 text-secondary-foreground bg-[rgba(26,31,46,1)]">
                    <h3 className="text-2xl text-[#EDF1F7] mb-4 uppercase font-extrabold">{localizedTitle}</h3>

                    <ul className="space-y-3 mb-6">
                      {localizedFeatures.map((feature, idx) => (
                        <li key={idx} className="text-base text-[#B7C5DB] flex items-start">
                          <span className="text-[#B19D76] mr-3 font-bold">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href={`/transportation/${item.slug}`} onClick={() => trackClick(item.id)}>
                      <Button
                        variant="secondary"
                        className="w-full md:w-fit bg-[#B19D76] text-white hover:bg-[#9d8761] rounded-md px-8 py-3 text-base font-semibold transition-colors"
                      >
                        {t("equipment.detailsButton")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
