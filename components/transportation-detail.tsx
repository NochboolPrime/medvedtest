"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, ShoppingCart, FileText } from "lucide-react"
import { ConsultationModal } from "@/components/consultation-modal"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"

interface TransportationDetailProps {
  productId?: string
  transportationKey: string
  image: string
  gallery: string[]
  video_url?: string
  price?: number
  specification_pdf_url?: string // Add PDF URL prop
  title?: string
  description?: string
  features?: string[]
  fullDescription?: string
  specifications?: Array<{ label: string; value: string }>
  advantages?: string[]
  applications?: string[]
  title_en?: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  features_en?: string[]
  features_zh?: string[]
  full_description_en?: string
  full_description_zh?: string
  advantages_en?: string[]
  advantages_zh?: string[]
  applications_en?: string[]
  applications_zh?: string[]
  specifications_en?: Array<{ label: string; value: string }>
  specifications_zh?: Array<{ label: string; value: string }>
}

export function TransportationDetail({
  productId,
  transportationKey,
  image,
  gallery,
  video_url,
  price,
  specification_pdf_url, // Add to destructuring
  title: propTitle,
  description: propDescription,
  features: propFeatures,
  fullDescription: propFullDescription,
  specifications: propSpecifications,
  advantages: propAdvantages,
  applications: propApplications,
  title_en,
  title_zh,
  description_en,
  description_zh,
  features_en,
  features_zh,
  full_description_en,
  full_description_zh,
  advantages_en,
  advantages_zh,
  applications_en,
  applications_zh,
  specifications_en,
  specifications_zh,
}: TransportationDetailProps) {
  const [selectedImage, setSelectedImage] = useState(image)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    if (productId) {
      trackDetailView(productId)
    }
  }, [productId])

  const trackDetailView = async (id: string) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id, eventType: "detail_view" }),
      })
    } catch (error) {
      console.error(" Error tracking detail view:", error)
    }
  }

  const getSpecifications = () => {
    if (locale === "en" && specifications_en && specifications_en.length > 0) {
      return specifications_en
    }
    if (locale === "zh" && specifications_zh && specifications_zh.length > 0) {
      return specifications_zh
    }
    if (propSpecifications && propSpecifications.length > 0) {
      return propSpecifications
    }

    try {
      const specsData = t(`transportationData.${transportationKey}.specifications`, { returnObjects: true })
      if (typeof specsData === "object" && specsData !== null) {
        return Object.values(specsData).filter(
          (spec) => spec && typeof spec === "object" && "label" in spec && "value" in spec,
        )
      }
    } catch (e) {
      // Silently fail, specs are optional
    }
    return []
  }

  const getLocalizedField = (ruValue: any, enValue: any, zhValue: any, fallbackKey?: string): any => {
    if (locale === "en" && enValue) return enValue
    if (locale === "zh" && zhValue) return zhValue
    if (ruValue) return ruValue
    if (fallbackKey) {
      const translationValue = t(`transportationData.${transportationKey}.${fallbackKey}`)
      if (Array.isArray(translationValue)) return translationValue
      return translationValue
    }
    return ruValue
  }

  const transportation = {
    id: 1,
    title: getLocalizedField(propTitle, title_en, title_zh, "title"),
    description: getLocalizedField(propDescription, description_en, description_zh, "description"),
    image: image,
    price: price || 0,
    features: getLocalizedField(propFeatures, features_en, features_zh, "features"),
    fullDescription: getLocalizedField(
      propFullDescription,
      full_description_en,
      full_description_zh,
      "fullDescription",
    ),
    specifications: getSpecifications(),
    advantages: getLocalizedField(propAdvantages, advantages_en, advantages_zh, "advantages"),
    applications: getLocalizedField(propApplications, applications_en, applications_zh, "applications"),
    gallery: gallery,
  }

  const getVideoEmbedUrl = (url?: string) => {
    if (!url) return null

    try {
      // Extract video ID from Rutube URL
      // Examples: https://rutube.ru/video/abc123/ or https://rutube.ru/video/abc123
      const videoIdMatch = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/)
      if (videoIdMatch && videoIdMatch[1]) {
        return `https://rutube.ru/play/embed/${videoIdMatch[1]}`
      }
    } catch (e) {
      console.error(" Error parsing video URL:", e)
    }
    return null
  }

  const videoEmbedUrl = getVideoEmbedUrl(video_url)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Link href="/catalog">
            <Button variant="ghost" className="text-foreground hover:text-accent hover:bg-accent/5">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("transportationDetail.backButton")}
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">{transportation.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">{transportation.description}</p>
          </div>
          <div className="mt-6">
            <Link href="/catalog">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("transportationDetail.goToCatalog")}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-4 bg-card">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt={transportation.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {transportation.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === img ? "border-accent" : "border-transparent hover:border-border"
                }`}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${transportation.title} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {videoEmbedUrl && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("transportationDetail.videoTitle")}</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card border border-border">
              <iframe
                src={videoEmbedUrl}
                frameBorder="0"
                allow="clipboard-write; autoplay"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </motion.section>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("transportationDetail.descriptionTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">{transportation.fullDescription}</p>
            </motion.section>

            {/* Specifications */}
            {transportation.specifications.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-6 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {t("transportationDetail.specificationsTitle")}
                </h2>
                <div className="space-y-3">
                  {transportation.specifications.map((spec: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">{spec.label}</span>
                      <span className="text-foreground font-medium text-sm">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Advantages */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("transportationDetail.advantagesTitle")}</h2>
              <ul className="space-y-3">
                {transportation.advantages.map((advantage, idx) => (
                  <li key={idx} className="flex items-start text-muted-foreground">
                    <span className="text-accent mr-2">•</span>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card border border-border p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("transportationDetail.applicationsTitle")}</h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {transportation.applications.map((application, idx) => (
                  <li key={idx} className="flex items-start text-muted-foreground text-lg">
                    <span className="text-accent mr-3">•</span>
                    <span>{application}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border-2 border-accent p-6 rounded-lg sticky top-24 shadow-lg"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">{t("transportationDetail.keyFeaturesTitle")}</h3>
              <ul className="space-y-3 mb-6">
                {transportation.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-muted-foreground">
                    <span className="text-accent mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {transportation.price > 0 && (
                <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t("catalog.price")}:</span>
                    <span className="text-2xl font-bold text-accent">{formatPrice(transportation.price)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground mb-3">{t("transportationDetail.contactTitle")}</h4>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t("transportationDetail.consultationButton")}
                </Button>
              </div>

              {specification_pdf_url && (
                <Button
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = specification_pdf_url
                    link.download = `${transportation.title}_specification.pdf`
                    link.target = "_blank"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t("transportationDetail.downloadSpecification")}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <ConsultationModal open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
    </div>
  )
}
