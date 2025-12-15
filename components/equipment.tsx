"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

export function Equipment() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const t = useTranslations()

  const equipmentCategories = [
    {
      title: t("products.items.cementingUnit.name"),
      description: t("products.items.cementingUnit.description"),
      slug: "tsementirovaniye",
      images: [
        "/images/photo-5460756544556759479-y.jpg",
        "/images/photo-5460756544556759475-y.jpg",
        "/images/photo-5460756544556759476-y.jpg",
        "/images/photo-5460756544556759478-y.jpg",
      ],
    },
    {
      title: t("products.items.fracturingUnit.name"),
      description: t("products.items.fracturingUnit.description"),
      slug: "grp",
      images: [
        "/images/photo-5460756544556759477-y.jpg",
        "/images/photo-5460756544556759472-y.jpg",
        "/images/photo-5460756544556759474-y.jpg",
        "/images/photo-5460756544556759473-y.jpg",
      ],
    },
    {
      title: t("products.items.highPressurePump.name"),
      description: t("products.items.highPressurePump.description"),
      slug: "nasos",
      images: [
        "/images/photo-5460756544556759489-y.jpg",
        "/images/photo-5460756544556759481-y.jpg",
        "/images/photo-5460756544556759485-y.jpg",
        "/images/photo-5460756544556759487-y.jpg",
      ],
    },
  ]

  const currentCategory = equipmentCategories[activeCategory]
  const totalImages = currentCategory.images.length

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  return (
    <section id="equipment" className="py-20 bg-[#1a1a1a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#151515] via-[#1a1a1a] to-[#151515]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl mb-4 font-extrabold">{t("products.title")}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t("products.description")}</p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {equipmentCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveCategory(index)
                setCurrentImageIndex(0)
              }}
              className={`px-5 py-2 font-medium transition-all rounded-none ${
                activeCategory === index ? "bg-white text-[#1a1a1a]" : "glass text-white hover:bg-white/10"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Equipment showcase */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Image carousel */}
          <div className="glass-strong rounded-none p-3 relative aspect-video overflow-hidden">
            <div className="relative w-full h-full rounded-none overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
              <Image
                src={currentCategory.images[currentImageIndex] || "/placeholder.svg"}
                alt={currentCategory.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-6">
              <Button
                size="icon"
                onClick={prevImage}
                className="rounded-full glass-strong text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                onClick={nextImage}
                className="rounded-full glass-strong text-white hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Image indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {currentCategory.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="glass-strong rounded-none p-6">
            <h3 className="text-2xl md:text-3xl text-white mb-3 font-extrabold">{currentCategory.title}</h3>
            <p className="text-base text-white/80 mb-5">{currentCategory.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2" />
                <p className="text-sm text-white/70">Узлы и комплектующие от лучших мировых производителей</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2" />
                <p className="text-sm text-white/70">Собственная система управления в ручном и автоматическом режиме</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2" />
                <p className="text-sm text-white/70">Гарантийное и сервисное обслуживание</p>
              </div>
            </div>

            <Link href={`/products/${currentCategory.slug}`}>
              <Button size="lg" className="bg-white text-[#1a1a1a] hover:bg-white/90 font-semibold">
                {t("products.detailsButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
