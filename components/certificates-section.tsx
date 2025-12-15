"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useMemo } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"

export function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const t = useTranslations()
  const { get: getCert, getItems: getCertItems, loading: certLoading } = useSiteContent("certificates")

  console.log("[v0] CertificatesSection - Component rendering")
  console.log("[v0] CertificatesSection - certLoading:", certLoading)

  const dynamicCertificates = useMemo(() => {
    const certItems = getCertItems("^certificate\\d+")
    console.log("[v0] CertificatesSection - Loading certificates from certificates section:", certItems)

    // Group by certificate number
    const certMap = new Map<number, { title?: string; description?: string; image?: string }>()

    certItems.forEach((item) => {
      const match = item.key.match(/certificate(\d+)(Title|Description|Image)/)
      if (match) {
        const num = Number.parseInt(match[1])
        const field = match[2].toLowerCase()

        if (!certMap.has(num)) {
          certMap.set(num, {})
        }

        const cert = certMap.get(num)!
        if (field === "title") cert.title = item.value
        if (field === "description") cert.description = item.value
        if (field === "image") cert.image = item.value
      }
    })

    const certs = Array.from(certMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([_, cert]) => ({
        title: cert.title || "",
        description: cert.description || "",
        image: cert.image || "/placeholder.svg",
      }))
      .filter((cert) => cert.title || cert.description)

    console.log("[v0] CertificatesSection - Processed certificates:", certs)
    return certs
  }, [getCertItems])

  const certificates =
    dynamicCertificates.length > 0
      ? dynamicCertificates
      : [
          {
            title: t("about.certificates.iso9001.title"),
            description: t("about.certificates.iso9001.description"),
            image: "/iso-9001-certificate.png",
          },
          {
            title: t("about.certificates.iso14001.title"),
            description: t("about.certificates.iso14001.description"),
            image: "/iso-14001-certificate.png",
          },
          {
            title: t("about.certificates.iso45001.title"),
            description: t("about.certificates.iso45001.description"),
            image: "/iso-45001-certificate.jpg",
          },
          {
            title: t("about.certificates.compliance.title"),
            description: t("about.certificates.compliance.description"),
            image: "/generic-certification-document.png",
          },
        ]

  console.log("[v0] CertificatesSection - Final certificates to display:", certificates)

  return (
    <section id="certificates" className="py-16 lg:py-8 2xl:py-16 px-4 bg-muted dark:bg-[#1a1f2e]">
      <div className="container mx-auto max-w-6xl">
        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h4 className="mb-8 lg:mb-4 2xl:mb-8 text-card-foreground text-5xl lg:text-4xl 2xl:text-5xl font-medium">
            {t("about.certificatesTitle")}
          </h4>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-4 2xl:gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-card dark:bg-[#1a1f2e] overflow-hidden border-l-4 border-primary"
              >
                <div className="flex flex-col md:flex-row gap-6 lg:gap-4 2xl:gap-6 p-8 lg:p-4 2xl:p-8 bg-input">
                  <div
                    className="flex-shrink-0 w-full md:w-32 lg:w-24 2xl:w-32 h-40 lg:h-32 2xl:h-40 relative bg-muted rounded cursor-pointer transition-transform hover:scale-105"
                    onClick={() => setSelectedCertificate(cert.image)}
                  >
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h5 className="text-lg lg:text-base 2xl:text-lg font-semibold text-foreground mb-2 lg:mb-1 2xl:mb-2">
                      {cert.title}
                    </h5>
                    <p className="text-base lg:text-sm 2xl:text-base font-normal leading-relaxed text-card-foreground">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal for certificate images */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div className="relative max-w-4xl w-full h-[80vh]">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-[#B19D76] transition-colors"
              aria-label={t("about.close")}
            >
              ×
            </button>
            <Image
              src={selectedCertificate || "/placeholder.svg"}
              alt={t("about.certificatesTitle")}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
