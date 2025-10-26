import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const equipmentData = [
  {
    id: 1,
    name: "Цементировочный агрегат ЦА-320",
    category: "Цементировочное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 2,
    name: "Цементировочный агрегат ЦА-320М",
    category: "Цементировочное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 3,
    name: "Блок манифольдов БМ-700",
    category: "Цементировочное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 4,
    name: "Установка приготовления тампонажного раствора",
    category: "Цементировочное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 5,
    name: "Агрегат для гидроразрыва пласта АГ-2500",
    category: "Оборудование для ГРП",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 6,
    name: "Блендер для приготовления жидкости разрыва",
    category: "Оборудование для ГРП",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 7,
    name: "Установка дозирования проппанта",
    category: "Оборудование для ГРП",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 8,
    name: "Насосный агрегат НА-1000",
    category: "Насосное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 9,
    name: "Насосный агрегат НА-600",
    category: "Насосное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 10,
    name: "Установка подготовки нефти УПН-100",
    category: "Нефтепромысловое оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 11,
    name: "Установка комплексной подготовки газа УКПГ-50",
    category: "Газопромысловое оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 12,
    name: "Передвижная паровая установка ППУ-1600",
    category: "Теплотехническое оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 13,
    name: "Азотная станция АС-50",
    category: "Компрессорное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 14,
    name: "Установка для испытания скважин УИС-32",
    category: "Испытательное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 15,
    name: "Агрегат кислотной обработки АКО-150",
    category: "Оборудование для ОПЗ",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 16,
    name: "Установка для промывки скважин УПС-60",
    category: "Промывочное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 17,
    name: "Передвижная компрессорная станция ПКС-5",
    category: "Компрессорное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 18,
    name: "Установка для закачки метанола УЗМ-20",
    category: "Вспомогательное оборудование",
    image: "https://blob.v0.app/Ks8Aw.jpg",
  },
  {
    id: 19,
    name: "Агрегат для депарафинизации АДП-100",
    category: "Оборудование для ОПЗ",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759490_y-atQRfA9ItKCprACkuVd4DT2jgQHtkJ.jpg",
  },
  {
    id: 20,
    name: "Установка электроцентробежного насоса УЭЦН",
    category: "Насосное оборудование",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759491_y-D24mtI35q5tSMekMJKNojHsLj9xErM.jpg",
  },
  {
    id: 21,
    name: "Блок контроля и управления БКУ-01",
    category: "Системы управления",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759492_y-6LPspjxe79RuZFJkXV7xMV9AfUMQ0z.jpg",
  },
]

export default function EquipmentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться на главную
        </Link>

        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Наше оборудование</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Современное нефтегазовое оборудование с 3D визуализацией
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentData.map((item, index) => (
            <div
              key={item.id}
              className="equipment-card group"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="equipment-card-inner">
                <div className="equipment-image-container">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="equipment-image" />
                  <div className="equipment-glow" />
                </div>
                <div className="equipment-info">
                  <span className="equipment-category">{item.category}</span>
                  <h3 className="equipment-name">{item.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
