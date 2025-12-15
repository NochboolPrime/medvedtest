"use client"

import Image from "next/image"
import { CheckCircle2, Wrench, Shield, Zap, type LucideIcon } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"
import { useMemo } from "react"

const galleryImages = [
  "/images/photo-5460756544556759489-y.jpg",
  "/images/photo-5460756544556759481-y.jpg",
  "/images/photo-5460756544556759485-y.jpg",
  "/images/photo-5460756544556759487-y.jpg",
  "/images/photo-5460756544556759484-y.jpg",
  "/images/photo-5460756544556759480-y.jpg",
]

const iconMap: Record<string, LucideIcon> = {
  CheckCircle2,
  Wrench,
  Shield,
  Zap,
}

export function ExcellenceGrid() {
  const t = useTranslations()
  const { get, getItems, loading } = useSiteContent("excellence")

  const dynamicFeatures = useMemo(() => {
    const titleItems = getItems("^principle\\d+Title$")
    const descItems = getItems("^principle\\d+Description$")

    return titleItems.map((titleItem, index) => {
      const number = titleItem.key.match(/\d+/)?.[0]
      const descItem = descItems.find((d) => d.key === `principle${number}Description`)
      const iconName = titleItem.metadata?.icon || ["CheckCircle2", "Wrench", "Shield", "Zap"][index % 4]
      return {
        icon: iconMap[iconName] || CheckCircle2,
        title: titleItem.value,
        description: descItem?.value || "",
      }
    })
  }, [getItems])

  // Fallback to static translations if no dynamic content
  const features =
    dynamicFeatures.length > 0
      ? dynamicFeatures
      : [
          {
            icon: CheckCircle2,
            title: t("excellence.features.technology.title"),
            description: t("excellence.features.technology.description"),
          },
          {
            icon: Wrench,
            title: t("excellence.features.flexibility.title"),
            description: t("excellence.features.flexibility.description"),
          },
          {
            icon: Shield,
            title: t("excellence.features.reliability.title"),
            description: t("excellence.features.reliability.description"),
          },
          {
            icon: Zap,
            title: t("excellence.features.efficiency.title"),
            description: t("excellence.features.efficiency.description"),
          },
        ]

  const title = get("title") || t("excellence.title")
  const description = get("description") || t("excellence.description")
  const sectionVisible = get("sectionVisible") !== "false"

  if (!sectionVisible && !loading) {
    return null
  }

  return (
    <section id="products" className="py-24 bg-[#1a1f2e]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-[#B19D76]" />
            <h2 className="text-3xl font-semibold text-white">{title}</h2>
          </div>
          <p className="text-base font-normal text-gray-300 max-w-3xl">{description}</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#252b3d] rounded-2xl p-6 border border-gray-700">
              <div className="h-12 w-12 rounded-xl bg-[#B19D76]/20 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[#B19D76]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-base font-normal text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Photo Gallery Bento */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-slate-800 group">
            <div className="relative h-[400px]">
              <Image
                src={galleryImages[0] || "/placeholder.svg"}
                alt="Equipment in action"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {galleryImages.slice(1).map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl bg-slate-800 group">
              <div className="relative h-[190px]">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Equipment ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
