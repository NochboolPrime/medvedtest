import Image from "next/image"

export function EquipmentGallery() {
  const equipment = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759479_y-eK02YrFkD1Qf5xscDS3uYNm1Z0oCpS.jpg",
      alt: "Цементировочный агрегат 1",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759475_y-NKbaasU6vUDHg4dfBRQSb4UDV1l27t.jpg",
      alt: "Цементировочный агрегат 2",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759476_y-L78Y5178SXiuEJKpF1MjyQxpzzouRa.jpg",
      alt: "Оборудование для ГРП",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759478_y-DT0q16j50seChhkn1kytET7TDNFsxM.jpg",
      alt: "Мобильная установка",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759477_y-OnujmTYlD8N1eQPCjkvA3Pr1DtMZvf.jpg",
      alt: "Насосное оборудование",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759472_y-KmQz1i8UcX3IsuM3UI5TjGUIv8kVpA.jpg",
      alt: "Промышленное оборудование",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Наше оборудование</h2>
        <p className="text-xl text-muted-foreground">Современные решения для нефтегазовой отрасли</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item, index) => (
          <div key={index} className="relative h-[550px] rounded-[2rem] overflow-hidden group cursor-pointer">
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg">{item.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Large showcase image */}
      <div className="mt-6 relative h-[700px] rounded-[2.5rem] overflow-hidden">
        <Image
          src="/images/design-mode/photo_5460756544556759489_y.jpg"
          alt="Промышленное оборудование ТД Медведь"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}
