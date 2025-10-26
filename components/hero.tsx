"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const scrollToNextSection = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/design-mode/aerofotosnimok-zavodskih-gruzovikov-priparkovannyh-vozle-sklada-v-dnevnoe-vrema.jpg"
          alt="ТД Медведь - Складской комплекс"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2433]/95 via-[#1C2433]/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-3xl leading-tight text-white font-extrabold md:text-5xl">
            Исключительные решения исключительных задач
          </h1>

          <p className="mb-10 text-sm md:text-base text-[#EDF1F7] leading-relaxed max-w-2xl font-light">
            Проектируем, производим, обслуживаем — под ключ. Надёжные решения для нефтегазовой отрасли и машиностроения.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              className="bg-[#B19D76] text-white hover:bg-[#B19D76]/90 font-semibold text-base px-8 rounded-sm transition-all duration-200 hover:scale-105"
            >
              Связаться с нами
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#B7C5DB] text-white hover:bg-[#B7C5DB] hover:text-[#1C2433] font-semibold text-base px-8 bg-transparent rounded-sm transition-all duration-200 hover:scale-105"
            >
              Узнать больше
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-8 max-w-2xl">
            <div className="text-left">
              <div className="text-4xl md:text-5xl text-[#B19D76] mb-2 font-extrabold">100+</div>
              <div className="text-xs md:text-sm text-[#B7C5DB] leading-tight font-light">
                Успешно завершённых проектов
              </div>
            </div>
            <div className="text-left">
              <div className="text-4xl md:text-5xl text-[#B19D76] mb-2 font-extrabold">11</div>
              <div className="text-xs md:text-sm text-[#B7C5DB] leading-tight font-light">
                Регионов поставок
                <br />
                (Россия и СНГ)
              </div>
            </div>
            <div className="text-left">
              <div className="text-4xl md:text-5xl text-[#B19D76] mb-2 font-extrabold">10+</div>
              <div className="text-xs md:text-sm text-[#B7C5DB] leading-tight font-light">Направлений работы</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        aria-label="Прокрутить вниз"
      >
        <div className="glass rounded-md p-3 border border-[#B7C5DB]/30 transition-all duration-200 group-hover:border-[#B19D76] group-hover:bg-[#B19D76]/10">
          <ArrowRight className="h-5 w-5 text-[#B7C5DB] rotate-90 transition-colors group-hover:text-[#B19D76]" />
        </div>
      </button>
    </section>
  )
}
