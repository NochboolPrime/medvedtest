"use client"

import Image from "next/image"
import { CheckCircle2, Wrench, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Доступность технологий",
    description: "Современное оборудование и передовые технологии производства",
  },
  {
    icon: Wrench,
    title: "Гибкость решений",
    description: "Индивидуальный подход к каждому проекту и задаче",
  },
  {
    icon: Shield,
    title: "Надёжность",
    description: "Гарантия качества и долговечности оборудования",
  },
  {
    icon: Zap,
    title: "Оперативность",
    description: "Быстрое выполнение заказов и техническая поддержка",
  },
]

const galleryImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759489_y-nwTKwwULG6SbtsT9RqEBZ4X6Pb5CZb.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759481_y-Oxd0mXZGmdbNzu8vB3ebayrBPkdduE.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759485_y-pvZeV9G1rSA7i4L223lJxsPX2nfLzK.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759487_y-ianx8nBikEGA2jt63hszEfv9DIpt1X.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759484_y-ilzLIR8alaqOXnXGodigWPKpvzkaxD.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759480_y-1oasFLTyE9G3A0anuX1TpCFHZSYUmk.jpg",
]

export function ExcellenceGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Обеспечиваем превосходство в каждом проекте
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Наши решения и эффективные технологии помогают клиентам достигать исключительных результатов в нефтегазовой
            отрасли
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl bg-[#1E375C]/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-[#1E375C]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Photo Gallery Bento */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-3xl bg-slate-100 group">
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
            <div key={index} className="relative overflow-hidden rounded-2xl bg-slate-100 group">
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
