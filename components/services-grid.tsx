import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Link from "next/link"

export function ServicesGrid() {
  const services = [
    {
      title: "Цементировочные агрегаты",
      description: "Проектирование и изготовление мобильных цементировочных установок для нефтегазовой отрасли",
      features: ["Высокая производительность", "Надежная конструкция", "Соответствие стандартам"],
      cta: "Узнать подробнее",
      slug: "cementirovanie",
    },
    {
      title: "Оборудование для ГРП",
      description: "Комплексные решения для гидроразрыва пласта с современными системами управления",
      features: ["Автоматизация процессов", "Высокое давление", "Безопасность эксплуатации"],
      cta: "Узнать подробнее",
      slug: "grp",
    },
    {
      title: "Насосное оборудование",
      description: "Поставка и модернизация насосного оборудования ведущих мировых производителей",
      features: ["Широкий ассортимент", "Гарантия качества", "Сервисное обслуживание"],
      cta: "Узнать подробнее",
      slug: "nasosnoe",
    },
    {
      title: "Модернизация и ремонт",
      description: "Капитальный ремонт и модернизация существующего оборудования с продлением срока службы",
      features: ["Диагностика", "Замена узлов", "Увеличение ресурса"],
      cta: "Узнать подробнее",
      slug: "modernizaciya",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Какие услуги мы предоставляем?</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-card rounded-[2.5rem] p-8 md:p-10 text-foreground group hover:scale-[1.02] transition-transform duration-300 border border-border"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{service.description}</p>

            <ul className="space-y-2 mb-8">
              {service.features.map((feature, idx) => (
                <li key={idx} className="text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href={`/services/${service.slug}`}>
              <Button variant="secondary" className="rounded-full px-6 py-5 group/btn">
                {service.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
