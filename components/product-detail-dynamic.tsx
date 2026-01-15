"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ConsultationModal } from "@/components/consultation-modal"
import { useLanguage } from "@/components/language-provider"

interface ProductData {
  id: string
  slug: string
  name_ru: string
  name_en: string
  name_zh: string
  description_ru: string
  description_en: string
  description_zh: string
  full_description_ru: string
  full_description_en: string
  full_description_zh: string
  features_ru: string[]
  features_en: string[]
  features_zh: string[]
  advantages_ru: string[]
  advantages_en: string[]
  advantages_zh: string[]
  applications_ru: string[]
  applications_en: string[]
  applications_zh: string[]
  technical_specs_ru: Array<{ label: string; value: string }>
  technical_specs_en: Array<{ label: string; value: string }>
  technical_specs_zh: Array<{ label: string; value: string }>
  image_url: string
  category: string
  specification_pdf_url?: string
  video_url?: string
}

interface ProductDetailDynamicProps {
  product: ProductData
}

export function ProductDetailDynamic({ product }: ProductDetailDynamicProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const { language } = useLanguage()

  // Get localized content
  const getName = () => {
    if (language === "en") return product.name_en || product.name_ru
    if (language === "zh") return product.name_zh || product.name_ru
    return product.name_ru
  }

  const getDescription = () => {
    if (language === "en") return product.description_en || product.description_ru
    if (language === "zh") return product.description_zh || product.description_ru
    return product.description_ru
  }

  const getFullDescription = () => {
    if (language === "en") return product.full_description_en || product.full_description_ru
    if (language === "zh") return product.full_description_zh || product.full_description_ru
    return product.full_description_ru
  }

  const getFeatures = () => {
    if (language === "en") return product.features_en?.length ? product.features_en : product.features_ru
    if (language === "zh") return product.features_zh?.length ? product.features_zh : product.features_ru
    return product.features_ru || []
  }

  const getAdvantages = () => {
    if (language === "en") return product.advantages_en?.length ? product.advantages_en : product.advantages_ru
    if (language === "zh") return product.advantages_zh?.length ? product.advantages_zh : product.advantages_ru
    return product.advantages_ru || []
  }

  const getApplications = () => {
    if (language === "en") return product.applications_en?.length ? product.applications_en : product.applications_ru
    if (language === "zh") return product.applications_zh?.length ? product.applications_zh : product.applications_ru
    return product.applications_ru || []
  }

  const getSpecs = () => {
    if (language === "en")
      return product.technical_specs_en?.length ? product.technical_specs_en : product.technical_specs_ru
    if (language === "zh")
      return product.technical_specs_zh?.length ? product.technical_specs_zh : product.technical_specs_ru
    return product.technical_specs_ru || []
  }

  const images = product.image_url ? [product.image_url] : []

  const handleDownloadSpecification = () => {
    if (product.specification_pdf_url) {
      const link = document.createElement("a")
      link.href = product.specification_pdf_url
      link.download = `${getName()}_specification.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const features = getFeatures()
  const advantages = getAdvantages()
  const applications = getApplications()
  const specs = getSpecs()

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Back button */}
        <Link href="/catalog">
          <Button variant="ghost" className="mb-8 text-foreground hover:bg-accent/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "en" ? "Back to Catalog" : language === "zh" ? "返回目录" : "Вернуться в каталог"}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{getName()}</h1>
          <p className="text-xl text-muted-foreground">{getDescription()}</p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          {images.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <Image
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={getName()}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Description and CTA */}
          <div className="flex flex-col">
            {getFullDescription() && (
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {language === "en" ? "Description" : language === "zh" ? "描述" : "Описание"}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{getFullDescription()}</p>
              </div>
            )}

            <div className="bg-card border-2 border-accent rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-4">
                {language === "en" ? "Request Consultation" : language === "zh" ? "请求咨询" : "Запросить консультацию"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === "en"
                  ? "Get professional advice from our specialists"
                  : language === "zh"
                    ? "从我们的专家那里获得专业建议"
                    : "Получите профессиональную консультацию от наших специалистов"}
              </p>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  {language === "en" ? "Contact Us" : language === "zh" ? "联系我们" : "Связаться с нами"}
                </Button>

                {product.specification_pdf_url && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent/10 bg-transparent"
                    onClick={handleDownloadSpecification}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    {language === "en"
                      ? "Download Specification"
                      : language === "zh"
                        ? "下载规格"
                        : "Скачать спецификацию"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {specs.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === "en"
                ? "Technical Specifications"
                : language === "zh"
                  ? "技术规格"
                  : "Технические характеристики"}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {specs.map((spec: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground text-sm">{spec.label}</span>
                  <span className="text-foreground font-medium text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features and Applications */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features or Advantages */}
          {(features.length > 0 || advantages.length > 0) && (
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {features.length > 0
                  ? language === "en"
                    ? "Key Features"
                    : language === "zh"
                      ? "关键特性"
                      : "Ключевые особенности"
                  : language === "en"
                    ? "Advantages"
                    : language === "zh"
                      ? "优势"
                      : "Преимущества"}
              </h2>
              <ul className="space-y-4">
                {(features.length > 0 ? features : advantages).map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Applications */}
          {applications.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === "en" ? "Applications" : language === "zh" ? "应用领域" : "Области применения"}
              </h2>
              <ul className="space-y-4">
                {applications.map((application, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                    <span className="text-foreground">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <ConsultationModal open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
    </div>
  )
}
