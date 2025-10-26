"use client"

import { useState } from "react"
import Image from "next/image"

const equipmentImages = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759479_y-eK02YrFkD1Qf5xscDS3uYNm1Z0oCpS.jpg",
    title: "Цементировочный агрегат ЦА-320",
    description: "Мобильная установка для цементирования скважин",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759475_y-NKbaasU6vUDHg4dfBRQSb4UDV1l27t.jpg",
    title: "Агрегат гидроразрыва пласта",
    description: "Высокопроизводительное оборудование для ГРП",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759476_y-L78Y5178SXiuEJKpF1MjyQxpzzouRa.jpg",
    title: "Установка для цементирования",
    description: "Современное решение для нефтегазовой отрасли",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759478_y-DT0q16j50seChhkn1kytET7TDNFsxM.jpg",
    title: "Насосный агрегат высокого давления",
    description: "Надежное оборудование для сложных условий",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759477_y-OnujmTYlD8N1eQPCjkvA3Pr1DtMZvf.jpg",
    title: "Мобильная цементировочная станция",
    description: "Полный комплекс для цементирования",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759472_y-KmQz1i8UcX3IsuM3UI5TjGUIv8kVpA.jpg",
    title: "Агрегат цементировочный АЦ-32",
    description: "Проверенное решение для промышленности",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759474_y-3jDmMHOuKsjV4608APsWk2w3iyRqhZ.jpg",
    title: "Установка для ГРП",
    description: "Инновационные технологии добычи",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759473_y-mq7FNVr9OQinhg23r5EzFKc9yeMoBI.jpg",
    title: "Насосная установка",
    description: "Высокая производительность и надежность",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759489_y-nwTKwwULG6SbtsT9RqEBZ4X6Pb5CZb.jpg",
    title: "Цементировочный комплекс",
    description: "Комплексное решение для скважин",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759481_y-Oxd0mXZGmdbNzu8vB3ebayrBPkdduE.jpg",
    title: "Агрегат для цементирования",
    description: "Современное оборудование ТД Медведь",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759485_y-pvZeV9G1rSA7i4L223lJxsPX2nfLzK.jpg",
    title: "Мобильная установка ЦА",
    description: "Эффективное решение для полевых условий",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759487_y-ianx8nBikEGA2jt63hszEfv9DIpt1X.jpg",
    title: "Насосный агрегат",
    description: "Высокотехнологичное оборудование",
  },
]

export function Equipment3D() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-graphite via-graphite-light to-graphite">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, rgb(183, 197, 219) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold text-balance text-white">Наше оборудование</h2>
          <p className="mx-auto max-w-2xl text-lg text-light-blue leading-relaxed">
            Высокотехнологичные решения для нефтегазовой отрасли. Современное оборудование, разработанное и
            произведенное с учетом самых строгих требований индустрии.
          </p>
        </div>

        {/* Main 3D showcase */}
        <div className="mb-12">
          <div className="relative mx-auto max-w-7xl perspective-2000">
            <div className="group relative overflow-hidden rounded-none bg-gradient-to-br from-navy-dark to-navy shadow-2xl transition-all duration-500 hover:shadow-accent/20">
              {/* 3D card effect */}
              <div className="relative aspect-[16/9] transform-gpu transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src={equipmentImages[activeIndex].url || "/placeholder.svg"}
                  alt={equipmentImages[activeIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent" />

                {/* 3D shine effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 40%, rgba(183, 197, 219, 0.1) 50%, transparent 60%)",
                    backgroundSize: "200% 200%",
                    animation: "shine 3s infinite",
                  }}
                />
              </div>

              {/* Info overlay with 3D effect */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform-gpu transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                <h3 className="mb-2 text-3xl font-bold text-white text-balance">
                  {equipmentImages[activeIndex].title}
                </h3>
                <p className="text-lg text-light-blue leading-relaxed">{equipmentImages[activeIndex].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D thumbnail grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {equipmentImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`group relative overflow-hidden rounded-none transition-all duration-300 transform-gpu hover:scale-105 hover:-translate-y-2 ${
                activeIndex === index
                  ? "ring-2 ring-accent shadow-lg shadow-accent/50 scale-105"
                  : "hover:ring-2 hover:ring-light-blue/50"
              }`}
              style={{
                transform: activeIndex === index ? "translateZ(20px)" : "translateZ(0)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* 3D depth overlay */}
              <div className="relative aspect-[3/2]">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* 3D border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-light-blue/30 transition-colors duration-300 rounded-none" />
              </div>

              {/* Active indicator with 3D effect */}
              {activeIndex === index && (
                <div className="absolute bottom-2 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-accent shadow-lg shadow-accent/50" />
              )}
            </button>
          ))}
        </div>

        {/* Navigation arrows with 3D effect */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setActiveIndex((prev) => (prev === 0 ? equipmentImages.length - 1 : prev - 1))}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-navy transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-accent/50 hover:scale-110 transform-gpu"
            aria-label="Предыдущее изображение"
          >
            <svg
              className="h-6 w-6 text-white transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev === equipmentImages.length - 1 ? 0 : prev + 1))}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-navy transition-all duration-300 hover:bg-accent hover:shadow-lg hover:shadow-accent/50 hover:scale-110 transform-gpu"
            aria-label="Следующее изображение"
          >
            <svg
              className="h-6 w-6 text-white transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .perspective-2000 {
          perspective: 2000px;
        }
      `}</style>
    </section>
  )
}
