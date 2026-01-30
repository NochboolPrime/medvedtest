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

interface ProductsClientProps {
  products: EquipmentItem[]
}

export function ProductsClient({ products }: ProductsClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    if (products.length > 0) {
      console.log("[v0] Products Section - First product:", products[0])
      console.log("[v0] Products Section - First product title_en:", products[0].title_en)
      console.log("[v0] Products Section - First product title_zh:", products[0].title_zh)
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
    <section id="products" className="py-12 lg:py-6 2xl:py-12 bg-background dark:bg-[#1a1f2e]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="mb-12 lg:mb-6 2xl:mb-12">
          <Link href="/catalog" className="block">
            <h2 className="text-center mb-8 lg:mb-4 2xl:mb-8 text-4xl lg:text-4xl 2xl:text-5xl font-medium hover:text-[#B19D76] transition-colors cursor-pointer">
              {t("products.title")}
            </h2>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 2xl:gap-6">
          {products.map((item, index) => {
            const localizedTitle = getLocalizedTitle(item)
            const localizedFeatures = getLocalizedFeatures(item)

            return (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer h-full"
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative rounded-lg overflow-hidden bg-[#2c3e50] shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(177,157,118,0.3)] flex flex-col h-full">
                  <div className="relative h-[400px] lg:h-[280px] 2xl:h-[400px] overflow-hidden flex-shrink-0">
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

                  <div className="p-6 lg:p-4 2xl:p-6 text-secondary-foreground bg-[rgba(26,31,46,1)] flex flex-col flex-grow">
                    <h3 className="text-2xl lg:text-xl 2xl:text-2xl text-[#EDF1F7] mb-4 lg:mb-2 2xl:mb-4 uppercase font-extrabold">
                      {localizedTitle}
                    </h3>

                    <ul className="space-y-3 lg:space-y-2 2xl:space-y-3 mb-6 lg:mb-4 2xl:mb-6 flex-grow">
                      {localizedFeatures.map((feature, idx) => (
                        <li key={idx} className="text-base lg:text-sm 2xl:text-base text-[#B7C5DB] flex items-start">
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
