"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface EquipmentItem {
  id: number
  title: string
  description: string
  image: string
  features: string[]
}

const equipmentData: EquipmentItem[] = [
  {
    id: 1,
    title: "Цементировочный агрегат ЦА-320",
    description: "Высокопроизводительная установка для цементирования скважин",
    image: "/images/truck-1.png",
    features: ["Давление до 70 МПа", "Автоматизированная система", "Повышенная надежность", "Круглосуточная поддержка"],
  },
  {
    id: 2,
    title: "Передвижная насосная станция",
    description: "Мобильная установка высокого давления для промывки и гидроразрыва",
    image: "/images/truck-2.png",
    features: ["Производительность 2500 л/мин", "Высокая мобильность", "Современное оснащение", "Быстрая установка"],
  },
  {
    id: 3,
    title: "Комплекс для ГРП",
    description: "Современный агрегат для гидроразрыва пласта с автоматизацией",
    image: "/images/truck-3.png",
    features: [
      "Автоматизированное управление",
      "Контроль параметров",
      "Высокая эффективность",
      "Безопасность операций",
    ],
  },
  {
    id: 4,
    title: "Многофункциональная установка",
    description: "Универсальное оборудование для различных технологических операций",
    image: "/images/truck-4.png",
    features: ["Универсальность применения", "Повышенная мобильность", "Надежная конструкция", "Простота обслуживания"],
  },
]

export function EquipmentSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="about" className="py-0 pb-12 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-full">
        <div className="mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {equipmentData.map((item, index) => (
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
              <div className="relative rounded-none overflow-hidden glass p-6 min-h-[750px] flex flex-col">
                <div className="relative h-[500px] mb-6 -mx-6 -mt-6 overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      scale: hoveredId === item.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-contain brightness-110"
                    />
                  </motion.div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl text-[#EDF1F7] mb-4 uppercase font-extrabold">{item.title}</h3>

                  <ul className="space-y-2 mb-6 flex-1">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="text-lg text-[#B7C5DB] flex items-start">
                        <span className="mr-3">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="secondary"
                    className="w-fit bg-[#B19D76] text-white hover:bg-[#B19D76]/90 rounded-none px-8 py-4 text-lg font-semibold"
                  >
                    Заказать перевозку
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
