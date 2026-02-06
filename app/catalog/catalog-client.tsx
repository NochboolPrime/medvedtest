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
  category_en?: string
  category_zh?: string
}

interface CatalogPdfData {
  pdf_url: string
  title: string
  title_en: string
  title_zh: string
}

interface CatalogPageClientProps {
  products: Product[]
}

export function CatalogPageClient({ products: allProducts }: CatalogPageClientProps) {
  const t = useTranslations()
  const { locale } = useLanguage()
  const [catalogPdf, setCatalogPdf] = useState<CatalogPdfData | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    loadCatalogPdf()
  }, [])

  const loadCatalogPdf = async () => {
    try {
      const response = await fetch("/api/catalog-pdf")
      const data = await response.json()
      if (data && data.pdf_url) {
        setCatalogPdf(data)
      }
    } catch (error) {
      console.error("Error loading catalog PDF:", error)
    }
  }

  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories with their translations
  const categoryMap = useMemo(() => {
    const map = new Map<string, { ru: string; en?: string; zh?: string }>()
    allProducts.forEach((p) => {
      if (!map.has(p.category)) {
        map.set(p.category, {
          ru: p.category,
          en: p.category_en,
          zh: p.category_zh,
        })
      }
    })
    return map
  }, [allProducts])

  const categories = ["all", ...Array.from(categoryMap.keys())]

  const getLocalizedCategoryByKey = (categoryKey: string): string => {
    if (categoryKey === "all") return t("catalog.filters.allCategories")
    const cat = categoryMap.get(categoryKey)
    if (!cat) return categoryKey
    if (locale === "en" && cat.en) return cat.en
    if (locale === "zh" && cat.zh) return cat.zh
    return cat.ru
  }

  const getLocalizedTitle = (product: Product): string => {
    if (locale === "en" && product.title_en) return product.title_en
    if (locale === "zh" && product.title_zh) return product.title_zh
    return product.title
  }

  const getLocalizedDescription = (product: Product): string => {
    if (locale === "en" && product.description_en) return product.description_en
    if (locale === "zh" && product.description_zh) return product.description_zh
    return product.description
  }

  const getLocalizedFeatures = (product: Product): string[] => {
    if (locale === "en" && product.features_en) return product.features_en
    if (locale === "zh" && product.features_zh) return product.features_zh
    return product.features
  }

  const getLocalizedCategory = (product: Product): string => {
    if (locale === "en" && product.category_en) return product.category_en
    if (locale === "zh" && product.category_zh) return product.category_zh
    return product.category
  }

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const localizedTitle = getLocalizedTitle(product)
      const localizedDescription = getLocalizedDescription(product)

      const matchesSearch =
        localizedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        localizedDescription.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

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
      console.error(" Error tracking click:", error)
    }
  }

  const getCatalogPdfTitle = () => {
    if (!catalogPdf) return t("catalog.downloadPDF")
    if (locale === "en" && catalogPdf.title_en) return catalogPdf.title_en
    if (locale === "zh" && catalogPdf.title_zh) return catalogPdf.title_zh
    return catalogPdf.title || t("catalog.downloadPDF")
  }

  const downloadCatalogPdf = () => {
    if (!catalogPdf?.pdf_url) return
    window.open(catalogPdf.pdf_url, "_blank")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <Button variant="ghost" onClick={() => router.push('/')} className="text-foreground hover:bg-muted">
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
              {catalogPdf?.pdf_url && (
                <Button
                  onClick={downloadCatalogPdf}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 hidden md:flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {getCatalogPdfTitle()}
                </Button>
              )}
            </div>
            <p className="text-muted-foreground text-lg">{t("catalog.subtitle")}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {catalogPdf?.pdf_url && (
          <div className="mb-4 md:hidden">
            <Button onClick={downloadCatalogPdf} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Download className="mr-2 h-4 w-4" />
              {getCatalogPdfTitle()}
            </Button>
          </div>
        )}

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
                        {getLocalizedCategoryByKey(category)}
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
                  {getLocalizedCategoryByKey(selectedCategory)}
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
              const localizedCategory = getLocalizedCategory(product)

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
                          {localizedCategory}
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
