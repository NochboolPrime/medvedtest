import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function HeroOrganic() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-card shadow-2xl">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
          {/* Left side - Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden">
            <Image
              src="/images/design-mode/photo_5460756544556759479_y.jpg"
              alt="Оборудование ТД Медведь"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Исключительные решения исключительных задач для
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Надёжные решения для нефтегазовой отрасли и машиностроения
              </p>
            </div>

            <Button size="lg" className="w-fit rounded-full px-8 py-6 text-lg group">
              Заказать оборудование
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Floating accent card */}
        <div className="absolute bottom-8 right-8 bg-accent rounded-[2rem] p-6 shadow-xl max-w-xs hidden lg:block">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-accent-foreground">100+ проектов</p>
            <p className="text-xs text-accent-foreground/80">Реализовано по всей России</p>
          </div>
        </div>
      </div>
    </section>
  )
}
