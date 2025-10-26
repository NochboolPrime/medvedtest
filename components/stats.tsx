const stats = [
  {
    value: "100+",
    label: "Успешно завершённых проектов",
  },
  {
    value: "11",
    label: (
      <>
        Регионов поставок
        <br />
        (Россия и СНГ)
      </>
    ),
  },
  {
    value: "10+",
    label: "Направлений работы",
  },
]

export function Stats() {
  return (
    <section className="py-20 bg-[#1a1a1a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#1a1a1a]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass-strong rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-3">{stat.value}</div>
              <div className="text-sm md:text-base text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
