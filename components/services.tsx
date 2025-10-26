"use client"

const services = [
  {
    title: "Цементирование скважин",
    description:
      "Проектирование и изготовление оборудования для цементирования скважин, в том числе комплексов для цементирования.",
  },
  {
    title: "Гидроразрыв пласта",
    description: "Проектирование и изготовление оборудования для гидроразрыва пласта.",
  },
  {
    title: "Насосное оборудование",
    description:
      "Поставка насосного оборудования (плунжерных насосов высокого давления) для решения задач при освоении скважин и задач по интенсификации добычи.",
  },
  {
    title: "Модернизация и ремонт",
    description:
      "Модернизация, капитальный ремонт, продление сроков эксплуатации (в том числе программного комплекса) для тампонажного оборудования и оборудования для гидроразрыва пласта.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h2 className="tracking-wider uppercase text-center mb-8 text-5xl font-extrabold">Наши услуги</h2>
        </div>

        <div className="max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className="py-6 flex gap-8 items-start group cursor-pointer transition-all duration-500 px-8 -mx-8 hover:px-10 hover:shadow-2xl hover:shadow-primary/10"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.5s ease, box-shadow 0.5s ease, padding 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateZ(40px) rotateX(-2deg) scale(1.02)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateZ(0px) rotateX(0deg) scale(1)"
                }}
              >
                <span className="text-4xl md:text-5xl font-bold text-muted-foreground/40 min-w-[6rem] group-hover:text-white transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground max-w-5xl leading-relaxed">{service.description}</p>
                </div>
              </div>
              {index < services.length - 1 && <div className="border-t border-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
