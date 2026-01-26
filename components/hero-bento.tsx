"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroBento() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-blue-700">Надёжные решения для нефтегазовой отрасли</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Исключительные решения для<span className="text-[#1E375C]">исключительных</span> задач
            </h1>

            <p className="text-lg text-muted-foreground text-pretty max-w-xl">
              Проектирование и производство оборудования для цементирования скважин, гидроразрыва пласта и поставка
              насосного оборудования
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#1E375C] hover:bg-[#1C2433] text-white gap-2">
                Наши решения
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Связаться с нами
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="bg-white rounded-none p-4 shadow-sm border border-slate-100">
                <div className="text-3xl font-bold text-[#1E375C]">100+</div>
                <div className="text-sm text-muted-foreground">Проектов</div>
              </div>
              <div className="bg-white rounded-none p-4 shadow-sm border border-slate-100">
                <div className="text-3xl font-bold text-[#1E375C]">11</div>
                <div className="text-sm text-muted-foreground">Регионов</div>
              </div>
              <div className="bg-white rounded-none p-4 shadow-sm border border-slate-100">
                <div className="text-3xl font-bold text-[#1E375C]">10+</div>
                <div className="text-sm text-muted-foreground">Направлений</div>
              </div>
            </div>
          </div>

          {/* Right - Bento Grid */}
          <div className="relative h-[700px]">
            {/* Main large card */}
            <div className="absolute top-0 right-0 w-[75%] h-[60%] rounded-none overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/design-mode/photo_5460756544556759479_y.jpg"
                alt="Цементировочный агрегат"
                fill
                className="object-cover"
              />
            </div>

            {/* Small card bottom left */}
            <div className="absolute bottom-0 left-0 w-[50%] h-[40%] rounded-none overflow-hidden shadow-xl border-4 border-white bg-white">
              <Image
                src="/images/design-mode/photo_5460756544556759476_y.jpg"
                alt="Оборудование для ГРП"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating info card */}
            <div className="absolute bottom-[40%] left-[10%] bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Статус</div>
                  <div className="text-sm font-semibold">В производстве</div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-[20%] left-[-5%] w-32 h-32 bg-[#B19D76]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[10%] right-[-5%] w-40 h-40 bg-[#1E375C]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
