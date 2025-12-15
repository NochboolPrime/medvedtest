import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Award, Users, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"
import { useTranslations } from "@/hooks/use-translations"
import { use } from "react"

interface ServiceDetail {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  benefits: string[]
  process: {
    step: number
    title: string
    description: string
  }[]
  whyUs: string[]
}

const serviceDetails: Record<string, ServiceDetail> = {
  "cementirovanie": {
    id: 1,
    title: "Цементировочные агрегаты",
    description: "Проектирование и изготовление мобильных цементировочных установок",
    fullDescription:
      "Мы специализируемся на проектировании, изготовлении и поставке современных цементировочных агрегатов для нефтегазовой отрасли. Наше оборудование отвечает самым высоким стандартам качества и надежности, обеспечивая эффективное выполнение операций по цементированию скважин в любых климатических условиях.",
    image: "/images/truck-1.png",
    benefits: [
      "Использование комплектующих ведущих мировых производителей",
      "Собственная система управления в ручном и автоматическом режиме",
      "Полное гарантийное и сервисное обслуживание",
      "Соответствие международным стандартам безопасности",
      "Возможность работы при температурах от -45°C до +50°C",
      "Быстрая окупаемость благодаря высокой надежности",
    ],
    process: [
      {
        step: 1,
        title: "Консультация и анализ потребностей",
        description: "Изучаем ваши требования и условия эксплуатации оборудования",
      },
      {
        step: 2,
        title: "Проектирование решения",
        description: "Разрабатываем техническое задание и проект оборудования",
      },
      {
        step: 3,
        title: "Производство и контроль качества",
        description: "Изготовление с соблюдением всех стандартов и многоступенчатым контролем",
      },
      {
        step: 4,
        title: "Поставка и ввод в эксплуатацию",
        description: "Доставка, монтаж, пусконаладка и обучение персонала",
      },
    ],
    whyUs: [
      "Более 15 лет опыта в нефтегазовом машиностроении",
      "Собственное производство и инженерный центр",
      "Гарантия качества на все оборудование",
      "Квалифицированная техническая поддержка 24/7",
    ],
  },
  "grp": {
    id: 2,
    title: "Оборудование для ГРП",
    description: "Комплексные решения для гидроразрыва пласта",
    fullDescription:
      "Предоставляем полный комплекс оборудования для проведения операций гидроразрыва пласта (ГРП). Наши установки оснащены современными системами управления и контроля, обеспечивающими максимальную эффективность и безопасность процесса. Работаем как с новым оборудованием, так и с модернизацией существующего.",
    image: "/images/truck-3.png",
    benefits: [
      "Высокоточная автоматизированная система управления",
      "Непрерывный мониторинг всех параметров процесса",
      "Многоуровневая система безопасности",
      "Возможность дистанционного контроля операций",
      "Энергоэффективная конструкция",
      "Совместимость с различными типами проппанта и жидкостей",
    ],
    process: [
      {
        step: 1,
        title: "Технико-экономическое обоснование",
        description: "Анализ геологических условий и подбор оптимального оборудования",
      },
      {
        step: 2,
        title: "Комплектация и подготовка",
        description: "Формирование комплекта оборудования под конкретные задачи",
      },
      {
        step: 3,
        title: "Монтаж и настройка",
        description: "Установка оборудования и настройка всех систем управления",
      },
      {
        step: 4,
        title: "Обучение и сопровождение",
        description: "Подготовка персонала и техническое сопровождение операций",
      },
    ],
    whyUs: [
      "Комплексный подход к решению задач ГРП",
      "Опыт работы на сложных месторождениях",
      "Современное высокотехнологичное оборудование",
      "Полное сервисное обслуживание на весь срок эксплуатации",
    ],
  },
  "nasosnoe": {
    id: 3,
    title: "Насосное оборудование",
    description: "Поставка и модернизация насосных агрегатов",
    fullDescription:
      "Поставляем широкий ассортимент насосного оборудования высокого давления для нефтегазовой отрасли. Работаем напрямую с ведущими производителями, что позволяет предлагать конкурентные цены при сохранении высокого качества. Также осуществляем модернизацию и капитальный ремонт существующего оборудования.",
    image: "/images/truck-2.png",
    benefits: [
      "Прямые поставки от ведущих производителей",
      "Широкий ассортимент насосов различной производительности",
      "Полная техническая документация и сертификаты",
      "Наличие запасных частей на складе",
      "Сервисное обслуживание и ремонт",
      "Гарантия на все поставляемое оборудование",
    ],
    process: [
      {
        step: 1,
        title: "Определение требований",
        description: "Анализ технических требований и условий эксплуатации",
      },
      {
        step: 2,
        title: "Подбор оборудования",
        description: "Выбор оптимального насосного оборудования под задачу",
      },
      {
        step: 3,
        title: "Поставка и монтаж",
        description: "Доставка, установка и пусконаладочные работы",
      },
      {
        step: 4,
        title: "Обслуживание",
        description: "Регулярное техническое обслуживание и поддержка",
      },
    ],
    whyUs: [
      "Прямые договоры с производителями оборудования",
      "Собственный склад запасных частей",
      "Команда опытных сервисных инженеров",
      "Гибкие условия поставки и оплаты",
    ],
  },
  "modernizaciya": {
    id: 4,
    title: "Модернизация и ремонт",
    description: "Капитальный ремонт и модернизация оборудования",
    fullDescription:
      "Предоставляем услуги по капитальному ремонту и модернизации нефтегазового оборудования. Наш опыт позволяет значительно продлить срок службы техники, улучшить её технические характеристики и снизить эксплуатационные расходы. Работаем с оборудованием любых производителей.",
    image: "/images/truck-4.png",
    benefits: [
      "Комплексная диагностика технического состояния",
      "Замена изношенных узлов и агрегатов",
      "Модернизация систем управления и автоматики",
      "Увеличение срока службы оборудования",
      "Улучшение технических характеристик",
      "Снижение эксплуатационных расходов",
    ],
    process: [
      {
        step: 1,
        title: "Техническая диагностика",
        description: "Полная оценка текущего состояния оборудования",
      },
      {
        step: 2,
        title: "Разработка программы работ",
        description: "Составление плана ремонта и модернизации с расчетом стоимости",
      },
      {
        step: 3,
        title: "Выполнение работ",
        description: "Ремонт и модернизация в соответствии с утвержденным планом",
      },
      {
        step: 4,
        title: "Испытания и ввод в эксплуатацию",
        description: "Контрольные испытания и передача оборудования заказчику",
      },
    ],
    whyUs: [
      "Опыт работы с оборудованием различных производителей",
      "Собственная производственная база",
      "Наличие необходимых запасных частей",
      "Гарантия на выполненные работы",
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = serviceDetails[slug]

  if (!service) {
    return {
      title: "Услуга не найдена",
    }
  }

  return {
    title: `${service.title} - ТД Медведь`,
    description: service.description,
  }
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const t = useTranslations()
  const resolvedParams = use(params)
  const { slug } = resolvedParams
  
  const serviceKey = slug as 'cementirovanie' | 'grp' | 'nasosnoe' | 'modernizaciya'
  const service = t.object(`services.details.${serviceKey}`)

  if (!service) {
    notFound()
  }

  const benefits = t.array(`services.details.${serviceKey}.benefits`)
  const process = t.array(`services.details.${serviceKey}.process`)
  const whyUs = t.array(`services.details.${serviceKey}.whyUs`)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackButton />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{service.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Description & Image */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">{t('serviceDetail.aboutServiceTitle')}</h2>
              <p className="text-lg text-foreground leading-relaxed mb-6">{service.fullDescription}</p>
              
              <div className="flex gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{t('serviceDetail.guaranteeBadge')}</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{t('serviceDetail.teamBadge')}</span>
                </div>
                <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{t('serviceDetail.supportBadge')}</span>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden bg-card border border-border">
              <Image
                src={`/images/truck-${slug === 'cementirovanie' ? '1' : slug === 'grp' ? '3' : slug === 'nasosnoe' ? '2' : '4'}.png`}
                alt={service.title}
                fill
                className="object-contain p-8"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('serviceDetail.benefitsTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-card p-5 rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">{t('serviceDetail.processTitle')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((step: any, index) => (
                <div key={index} className="relative">
                  <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-accent/50 transition-colors">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Why Us */}
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">{t('serviceDetail.whyUsTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {whyUs.map((reason, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                  <span className="text-foreground font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t('serviceDetail.ctaTitle')}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('serviceDetail.ctaDescription')}
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {t('serviceDetail.ctaButton')}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
