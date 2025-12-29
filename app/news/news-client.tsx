"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { useTranslations } from "@/hooks/use-translations"

interface NewsItem {
  id: string
  title_ru: string
  title_en: string
  title_zh: string
  excerpt_ru?: string
  excerpt_en?: string
  excerpt_zh?: string
  image_url?: string
  slug: string
  published_at: string
}

interface NewsClientProps {
  news: NewsItem[]
}

export function NewsClient({ news }: NewsClientProps) {
  const { language } = useLanguage()
  const t = useTranslations()

  const getLocalizedContent = (item: NewsItem, field: "title" | "excerpt") => {
    const fieldMap = {
      title: { ru: item.title_ru, en: item.title_en, zh: item.title_zh },
      excerpt: { ru: item.excerpt_ru, en: item.excerpt_en, zh: item.excerpt_zh },
    }
    return fieldMap[field][language] || fieldMap[field].ru
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("news.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("news.subtitle")}</p>
        </motion.div>

        {news.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">{t("news.noNews")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  {item.image_url && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={getLocalizedContent(item, "title")}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {new Date(item.published_at).toLocaleDateString(language)}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{getLocalizedContent(item, "title")}</h3>
                    {getLocalizedContent(item, "excerpt") && (
                      <p className="text-muted-foreground mb-4 flex-1">{getLocalizedContent(item, "excerpt")}</p>
                    )}
                    <Link href={`/news/${item.slug}`}>
                      <Button variant="outline" className="w-full group bg-transparent">
                        {t("news.readMore")}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
