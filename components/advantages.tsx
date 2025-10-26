import { Card } from "@/components/ui/card"
import { Zap, Layers, HeartHandshake } from "lucide-react"

const advantages = [
  {
    icon: Zap,
    title: "Доступность, технологичность",
    description:
      "Российская производственная компания по созданию технологичного оборудования для предприятий нефтегазового сектора.",
  },
  {
    icon: Layers,
    title: "Гибкость",
    description: "Широкая вариативность решений в соответствии с техническим заданием.",
  },
  {
    icon: HeartHandshake,
    title: "Забота",
    description: "Сервисная поддержка оборудования на протяжении всего жизненного цикла.",
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши преимущества</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексный подход к решению задач в нефтегазовой отрасли
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card key={index} className="p-8 bg-white border-border hover:shadow-lg transition-shadow">
                {/* Icon */}
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-semibold text-foreground">{advantage.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
