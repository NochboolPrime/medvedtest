"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, X, ArrowLeft, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"

interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  image: string
  slug: string
  features: string[]
  title_en?: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  features_en?: string[]
  features_zh?: string[]
}

interface CatalogPageClientProps {
  products: Product[]
}

export function CatalogPageClient({ products: allProducts }: CatalogPageClientProps) {
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["all", ...Array.from(new Set(allProducts.filter((p) => p.category).map((p) => p.category)))]

  const getLocalizedTitle = (product: Product): string => {
    if (locale === "en" && product.title_en) return product.title_en
    if (locale === "zh" && product.title_zh) return product.title_zh
    return product.title || ""
  }

  const getLocalizedDescription = (product: Product): string => {
    if (locale === "en" && product.description_en) return product.description_en
    if (locale === "zh" && product.description_zh) return product.description_zh
    return product.description || ""
  }

  const getLocalizedFeatures = (product: Product): string[] => {
    if (locale === "en" && product.features_en) return product.features_en
    if (locale === "zh" && product.features_zh) return product.features_zh
    return product.features
  }

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const localizedTitle = getLocalizedTitle(product)
      const localizedDescription = getLocalizedDescription(product)
      const productCategory = product.category || ""

      const matchesSearch =
        localizedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        localizedDescription.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || productCategory === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, allProducts, locale])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const trackClick = async (productId: string) => {
    try {
      await fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, eventType: "click" }),
      })
    } catch (error) {
      console.error("[v0] Error tracking click:", error)
    }
  }

  const generatePDF = async () => {
    try {
      // Dynamically import html2pdf
      const html2pdf = (await import("html2pdf.js")).default

      // Create PDF content
      const pdfContent = document.createElement("div")
      pdfContent.style.cssText =
        "width: 210mm; padding: 15mm; font-family: Arial, sans-serif; background: white; color: black;"

      // Title page
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding: 40px 0; background: linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%); color: white; border-radius: 8px;">
          <h1 style="font-size: 28px; margin-bottom: 8px; font-weight: bold;">${t("header.companyName") || "ТД МЕДВЕДЬ"}</h1>
          <p style="font-size: 16px; margin-bottom: 8px; color: #B19D76;">${t("catalog.pdfTitle") || t("catalog.title") || "Каталог оборудования"}</p>
          <p style="font-size: 12px; color: #cbd5e0;">${new Date().toLocaleDateString(locale === "ru" ? "ru-RU" : locale === "zh" ? "zh-CN" : "en-US")}</p>
        </div>
      `

      // Add products
      filteredProducts.forEach((product, index) => {
        const localizedTitle = getLocalizedTitle(product)
        const localizedDescription = getLocalizedDescription(product)
        const localizedFeatures = getLocalizedFeatures(product)

        const productHtml = `
          <div style="margin-bottom: 25px; page-break-inside: avoid; ${index > 0 ? "margin-top: 25px;" : ""}">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="display: inline-block; width: 4px; height: 20px; background: #B19D76; margin-right: 8px;"></span>
              <span style="color: #718096; font-size: 11px;">${index + 1}. ${product.category}</span>
            </div>
            
            <h2 style="font-size: 18px; margin-bottom: 6px; color: #1a1f2e; font-weight: bold;">${localizedTitle}</h2>
            
            ${
              product.price > 0
                ? `
              <div style="background: #f7fafc; padding: 8px 12px; border-left: 3px solid #B19D76; margin-bottom: 12px;">
                <p style="font-size: 14px; color: #B19D76; margin: 0; font-weight: bold;">
                  ${t("catalog.price")}: ${formatPrice(product.price)}
                </p>
              </div>
            `
                : ""
            }
            
            ${
              localizedDescription
                ? `
              <div style="margin-bottom: 12px;">
                <h3 style="font-size: 13px; margin-bottom: 4px; color: #2d3748; font-weight: 600;">${t("catalog.pdfDescription") || "Описание"}</h3>
                <p style="font-size: 11px; line-height: 1.5; color: #4a5568; margin: 0;">${localizedDescription}</p>
              </div>
            `
                : ""
            }
            
            ${
              localizedFeatures && localizedFeatures.length > 0
                ? `
              <div style="margin-bottom: 12px;">
                <h3 style="font-size: 13px; margin-bottom: 4px; color: #2d3748; font-weight: 600;">${t("catalog.pdfKeyFeatures") || "Ключевые особенности"}</h3>
                <ul style="margin: 0; padding-left: 18px; font-size: 11px; line-height: 1.6; color: #4a5568;">
                  ${localizedFeatures.map((feature) => `<li style="margin-bottom: 2px;">${feature}</li>`).join("")}
                </ul>
              </div>
            `
                : ""
            }
            
            <div style="border-bottom: 1px solid #e2e8f0; margin-top: 15px;"></div>
          </div>
        `
        pdfContent.innerHTML += productHtml
      })

      // Generate PDF with proper options for Cyrillic support
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${t("catalog.pdfTitle") || "Каталог"}-${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }

      // Generate and download PDF
      await html2pdf().set(opt).from(pdfContent).save()
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert(t("catalog.pdfError") || "Ошибка при создании PDF")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <Button variant="ghost" onClick={() => router.back()} className="text-foreground hover:bg-muted">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("catalog.backButton")}
          </Button>
        </div>
      </div>

      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-16 bg-accent"></div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("catalog.title")}</h1>
              </div>
              <Button
                onClick={generatePDF}
                className="bg-accent text-accent-foreground hover:bg-accent/90 hidden md:flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {t("catalog.downloadPDF")}
              </Button>
            </div>
            <p className="text-muted-foreground text-lg">{t("catalog.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-4 md:hidden">
          <Button onClick={generatePDF} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Download className="mr-2 h-4 w-4" />
            {t("catalog.downloadPDF")}
          </Button>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("catalog.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-base bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full md:hidden bg-card text-foreground border-border hover:bg-muted"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {showFilters ? t("catalog.filters.hideFilters") : t("catalog.filters.showFilters")}
          </Button>

          <motion.div
            initial={false}
            animate={{ height: showFilters || window.innerWidth >= 768 ? "auto" : 0 }}
            className="overflow-hidden md:overflow-visible"
          >
            <div className="grid grid-cols-1 gap-4 p-4 md:p-0 bg-card md:bg-transparent rounded-lg border border-border md:border-0">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t("catalog.filters.categories")}</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-card border-border text-foreground">
                    <SelectValue placeholder={t("catalog.filters.allCategories")} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="text-foreground">
                      {t("catalog.filters.allCategories")}
                    </SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category} className="text-foreground">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {(searchQuery || selectedCategory !== "all") && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">{t("catalog.filters.activeFilters")}:</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors"
                >
                  {searchQuery}
                  <X className="h-3 w-3" />
                </button>
              )}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors"
                >
                  {selectedCategory}
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            {t("catalog.foundProducts")}:{" "}
            <span className="font-semibold text-foreground">{filteredProducts.length}</span>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => {
              const localizedTitle = getLocalizedTitle(product)
              const localizedDescription = getLocalizedDescription(product)
              const localizedFeatures = getLocalizedFeatures(product)

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group h-full"
                >
                  <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                    <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={localizedTitle}
                        fill
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex flex-col flex-1">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{localizedTitle}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{localizedDescription}</p>
                      </div>

                      <div className="space-y-2 flex-1">
                        {localizedFeatures.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-start text-sm text-muted-foreground">
                            <span className="text-accent mr-2">•</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border mt-auto">
                        {product.price > 0 && (
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-muted-foreground">{t("catalog.price")}:</span>
                            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
                          </div>
                        )}
                        <Link href={`/transportation/${product.slug}`} onClick={() => trackClick(product.id)}>
                          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            {t("catalog.viewDetails")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{t("catalog.noResults")}</h3>
            <p className="text-muted-foreground mb-6">{t("catalog.noResultsDescription")}</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
            >
              {t("catalog.filters.reset")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
