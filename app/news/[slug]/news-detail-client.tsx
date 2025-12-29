"use client"

import { motion } from "framer-motion"
import { Calendar, ArrowLeft } from "lucide-react"
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
  content_ru: string
  content_en: string
  content_zh: string
  image_url?: string
  published_at: string
}

interface NewsDetailClientProps {
  newsItem: NewsItem
}

export function NewsDetailClient({ newsItem }: NewsDetailClientProps) {
  const { language } = useLanguage()
  const t = useTranslations()

  const title = newsItem[`title_${language}`] || newsItem.title_ru
  const content = newsItem[`content_${language}`] || newsItem.content_ru

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/news">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("news.backToNews")}
          </Button>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg shadow-lg overflow-hidden"
        >
          {newsItem.image_url && (
            <div className="relative h-96 w-full">
              <Image src={newsItem.image_url || "/placeholder.svg"} alt={title} fill className="object-cover" />
            </div>
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              {new Date(newsItem.published_at).toLocaleDateString(language, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-6">{title}</h1>
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </motion.article>
      </div>
    </div>
  )
}
