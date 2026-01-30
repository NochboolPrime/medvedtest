"use client"

import React from "react"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ChevronRight, X } from "lucide-react"

interface Certificate {
  id: string
  title: string
  title_en: string
  title_zh: string
  description: string
  description_en: string
  description_zh: string
  main_image: string
  gallery: string[]
  pdf_url: string
}

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      const response = await fetch("/api/certificates")
      const data = await response.json()
      setCertificates(data)
    } catch (error) {
      console.error("Error loading certificates:", error)
    } finally {
      setLoading(false)
    }
  }

  const getLocalizedTitle = (cert: Certificate) => {
    if (locale === "en" && cert.title_en) return cert.title_en
    if (locale === "zh" && cert.title_zh) return cert.title_zh
    return cert.title
  }

  const getLocalizedDescription = (cert: Certificate) => {
    if (locale === "en" && cert.description_en) return cert.description_en
    if (locale === "zh" && cert.description_zh) return cert.description_zh
    return cert.description
  }

  const getAllImages = (cert: Certificate) => {
    const images = [cert.main_image]
    if (cert.gallery && cert.gallery.length > 0) {
      images.push(...cert.gallery)
    }
    return images.filter(Boolean)
  }

  const handleOpenCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert)
    setCurrentImageIndex(0)
  }

  const handleCloseCertificate = () => {
    setSelectedCertificate(null)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedCertificate) return
    const images = getAllImages(selectedCertificate)
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedCertificate) return
    const images = getAllImages(selectedCertificate)
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleDownloadPdf = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedCertificate?.pdf_url) {
      window.open(selectedCertificate.pdf_url, "_blank")
    }
  }

  // Fallback certificates if none in database
  const fallbackCertificates = [
    {
      id: "1",
      title: "ISO 9001:2015",
      title_en: "ISO 9001:2015",
      title_zh: "ISO 9001:2015",
      description: "Система менеджмента качества",
      description_en: "Quality Management System",
      description_zh: "质量管理体系",
      main_image: "/iso-9001-certificate.png",
      gallery: [],
      pdf_url: "",
    },
    {
      id: "2",
      title: "ISO 14001:2015",
      title_en: "ISO 14001:2015",
      title_zh: "ISO 14001:2015",
      description: "Система экологического менеджмента",
      description_en: "Environmental Management System",
      description_zh: "环境管理体系",
      main_image: "/iso-14001-certificate.png",
      gallery: [],
      pdf_url: "",
    },
    {
      id: "3",
      title: "ISO 45001:2018",
      title_en: "ISO 45001:2018",
      title_zh: "ISO 45001:2018",
      description: "Система менеджмента охраны труда",
      description_en: "Occupational Health and Safety",
      description_zh: "职业健康安全管理体系",
      main_image: "/iso-45001-certificate.jpg",
      gallery: [],
      pdf_url: "",
    },
    {
      id: "4",
      title: "Сертификат соответствия",
      title_en: "Certificate of Conformity",
      title_zh: "合格证书",
      description: "Техническому регламенту Таможенного союза",
      description_en: "Technical Regulations of the Customs Union",
      description_zh: "海关联盟技术法规",
      main_image: "/generic-certification-document.png",
      gallery: [],
      pdf_url: "",
    },
  ]

  const displayCertificates = certificates.length > 0 ? certificates : fallbackCertificates

  return (
    <section id="certificates" className="py-16 lg:py-8 2xl:py-16 px-4 bg-muted dark:bg-[#1a1f2e]">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="mb-8 lg:mb-4 2xl:mb-8 text-card-foreground text-5xl lg:text-4xl 2xl:text-5xl font-medium text-center">
            {t("about.certificatesTitle")}
          </h4>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-4 2xl:gap-6">
            {displayCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card dark:bg-[#1a1f2e] overflow-hidden border-l-4 border-primary"
              >
                <div className="flex flex-col md:flex-row gap-6 lg:gap-4 2xl:gap-6 p-8 lg:p-4 2xl:p-8 bg-input">
                  <div
                    className="flex-shrink-0 w-full md:w-32 lg:w-24 2xl:w-32 h-40 lg:h-32 2xl:h-40 relative bg-muted rounded cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleOpenCertificate(cert)}
                  >
                    <Image
                      src={cert.main_image || "/placeholder.svg"}
                      alt={getLocalizedTitle(cert)}
                      fill
                      className="object-cover rounded"
                    />
                    {(cert.gallery?.length > 0 || cert.pdf_url) && (
                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                        {cert.gallery?.length > 0 && `+${cert.gallery.length}`}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-lg lg:text-base 2xl:text-lg font-semibold text-foreground mb-2 lg:mb-1 2xl:mb-2">
                      {getLocalizedTitle(cert)}
                    </h5>
                    <p className="text-base lg:text-sm 2xl:text-base font-normal leading-relaxed text-card-foreground">
                      {getLocalizedDescription(cert)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal for certificate viewing */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
          onClick={handleCloseCertificate}
        >
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <div className="text-white">
              <h3 className="text-xl font-semibold">{getLocalizedTitle(selectedCertificate)}</h3>
              <p className="text-gray-400 text-sm">{getLocalizedDescription(selectedCertificate)}</p>
            </div>
            <div className="flex items-center gap-2">
              {selectedCertificate.pdf_url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPdf}
                  className="bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {locale === "en" ? "Download PDF" : locale === "zh" ? "下载PDF" : "Скачать PDF"}
                </Button>
              )}
              <button
                onClick={handleCloseCertificate}
                className="text-white text-3xl hover:text-primary transition-colors p-2"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative max-w-4xl w-full h-[70vh] mt-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={getAllImages(selectedCertificate)[currentImageIndex] || "/placeholder.svg"}
              alt={getLocalizedTitle(selectedCertificate)}
              fill
              className="object-contain"
            />

            {/* Navigation arrows */}
            {getAllImages(selectedCertificate).length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {getAllImages(selectedCertificate).length > 1 && (
            <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
              {getAllImages(selectedCertificate).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-20 rounded overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image counter */}
          {getAllImages(selectedCertificate).length > 1 && (
            <div className="text-white/70 text-sm mt-2">
              {currentImageIndex + 1} / {getAllImages(selectedCertificate).length}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
