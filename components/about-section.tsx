import { CheckCircle2 } from "lucide-react"

export function AboutSection() {
  const advantages = [
    "Собственное производство",
    "Гибкие условия сотрудничества",
    "Индивидуальный подход к каждому проекту",
    "Полный цикл: от проектирования до монтажа",
    "Гарантийное и постгарантийное обслуживание",
  ]

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* About Card */}
        <div className="bg-[oklch(0.18_0.01_250)] rounded-[2.5rem] p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании</h2>
          <p className="text-lg text-white/80 leading-relaxed text-pretty">
            ТД Медведь — ведущий производитель оборудования для нефтегазовой отрасли. Мы специализируемся на
            проектировании и изготовлении цементировочных агрегатов, оборудования для гидроразрыва пласта и насосного
            оборудования. Наша продукция соответствует самым высоким стандартам качества и надежности.
          </p>
        </div>

        {/* Advantages Card */}
        <div className="bg-[oklch(0.18_0.01_250)] rounded-[2.5rem] p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Почему выбирают нас?</h2>
          <ul className="space-y-4">
            {advantages.map((advantage, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <span className="text-lg text-white/80">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
