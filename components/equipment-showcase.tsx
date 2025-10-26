"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const equipmentCategories = [
  {
    title: "Цементировочные агрегаты",
    description: "Мобильные установки для цементирования скважин",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759479_y-eK02YrFkD1Qf5xscDS3uYNm1Z0oCpS.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759475_y-NKbaasU6vUDHg4dfBRQSb4UDV1l27t.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759478_y-DT0q16j50seChhkn1kytET7TDNFsxM.jpg",
    ],
  },
  {
    title: "Оборудование для ГРП",
    description: "Установки гидроразрыва пласта высокой мощности",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759476_y-L78Y5178SXiuEJKpF1MjyQxpzzouRa.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759477_y-OnujmTYlD8N1eQPCjkvA3Pr1DtMZvf.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759472_y-KmQz1i8UcX3IsuM3UI5TjGUIv8kVpA.jpg",
    ],
  },
  {
    title: "Насосное оборудование",
    description: "Промышленные насосные станции",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759474_y-3jDmMHOuKsjV4608APsWk2w3iyRqhZ.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759473_y-mq7FNVr9OQinhg23r5EzFKc9yeMoBI.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759483_y-NKB2Fkfi8rFM9mXcINxTlJTFmYxQcY.jpg",
    ],
  },
]

export function EquipmentShowcase() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Комплексные решения для нефтегазовой отрасли
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Полный цикл производства от проектирования д�� ввода в эксплуатацию
            </p>
          </div>

          <div className="hidden lg:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={() => setActiveCategory(Math.max(0, activeCategory - 1))}
              disabled={activeCategory === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-transparent"
              onClick={() => setActiveCategory(Math.min(equipmentCategories.length - 1, activeCategory + 1))}
              disabled={activeCategory === equipmentCategories.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Large featured card */}
          <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-none bg-slate-100">
            <div className="relative h-[750px] lg:h-full">
              <Image
                src={equipmentCategories[activeCategory].images[0] || "/placeholder.svg"}
                alt={equipmentCategories[activeCategory].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
                  <span className="text-sm font-medium">Основное оборудование</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">{equipmentCategories[activeCategory].title}</h3>
                <p className="text-white/90">{equipmentCategories[activeCategory].description}</p>
              </div>
            </div>
          </div>

          {/* Small cards */}
          <div className="relative overflow-hidden rounded-none bg-slate-100 group">
            <div className="relative h-[365px]">
              <Image
                src={equipmentCategories[activeCategory].images[1] || "/placeholder.svg"}
                alt="Equipment detail"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-none bg-slate-100 group">
            <div className="relative h-[365px]">
              <Image
                src={equipmentCategories[activeCategory].images[2] || "/placeholder.svg"}
                alt="Equipment detail"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-3 mt-8 justify-center">
          {equipmentCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === index
                  ? "bg-[#1E375C] text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
