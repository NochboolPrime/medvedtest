"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowLeft, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ConsultationModal } from "@/components/consultation-modal"
import { useTranslations } from "@/hooks/use-translations"

interface ProductDetailProps {
  productKey: string
  images: string[]
  specificationPdfUrl?: string // Add PDF URL prop
}

export function ProductDetail({ productKey, images, specificationPdfUrl }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const t = useTranslations()

  const getSpecifications = () => {
    try {
      const specsData = t(`productData.${productKey}.specifications`, { returnObjects: true })
      if (typeof specsData === "object" && specsData !== null) {
        return Object.values(specsData).filter(
          (spec) => spec && typeof spec === "object" && "label" in spec && "value" in spec,
        )
      }
    } catch (e) {
      console.log("[v0] No specifications found for product:", productKey)
    }
    return []
  }

  const product = {
    title: t(`productData.${productKey}.title`),
    description: t(`productData.${productKey}.description`),
    longDescription: t(`productData.${productKey}.longDescription`),
    images: images,
    specifications: getSpecifications(),
    features: t.array(`productData.${productKey}.features`),
    applications: t.array(`productData.${productKey}.applications`),
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleDownloadSpecification = () => {
    if (specificationPdfUrl) {
      const link = document.createElement("a")
      link.href = specificationPdfUrl
      link.download = `${product.title}_specification.pdf`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Fallback to catalog
      const link = document.createElement("a")
      link.href = "/catalog.pdf"
      link.download = "catalog.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Back button */}
        <Link href="/#products">
          <Button variant="ghost" className="mb-8 text-foreground hover:bg-accent/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("productDetail.backButton")}
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">{product.title}</h1>
          <p className="text-xl text-muted-foreground">{product.description}</p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image carousel */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${product.title} - ${t("productDetail.goToImage")} ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />

              {/* Navigation buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-card transition-colors border border-border"
                    aria-label={t("productDetail.prevImage")}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 text-foreground hover:bg-card transition-colors border border-border"
                    aria-label={t("productDetail.nextImage")}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image indicators */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex ? "w-8 bg-accent" : "w-2 bg-muted-foreground/50"
                    }`}
                    aria-label={`${t("productDetail.goToImage")} ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description and CTA */}
          <div className="flex flex-col">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">{t("productDetail.descriptionTitle")}</h2>
              <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
            </div>

            <div className="bg-card border-2 border-accent rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-4">{t("productDetail.consultationTitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("productDetail.consultationDescription")}</p>

              {/* Download specification button */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  {t("productDetail.contactButton")}
                </Button>

                {specificationPdfUrl && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent/10 bg-transparent"
                    onClick={handleDownloadSpecification}
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    {t("productDetail.downloadSpecification")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("productDetail.specificationsTitle")}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.specifications.map((spec: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">{spec.label}</span>
                  <span className="text-foreground font-medium text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features and Applications */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Features */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("productDetail.featuresTitle")}</h2>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">{t("productDetail.applicationsTitle")}</h2>
            <ul className="space-y-4">
              {product.applications.map((application, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <span className="text-foreground">{application}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal open={isConsultationOpen} onOpenChange={setIsConsultationOpen} />
    </div>
  )
}
