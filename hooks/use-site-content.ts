"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { createClient } from "@/lib/supabase/client"

interface ContentItem {
  key: string
  value_ru: string | null
  value_en: string | null
  value_zh: string | null
  visible: boolean
  metadata: any
}

type ContentMap = Record<string, string>

export function useSiteContent(section: string) {
  const { locale } = useLanguage()
  const [content, setContent] = useState<ContentMap>({})
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadContent()
  }, [section, locale])

  async function loadContent() {
    try {
      console.log(` useSiteContent - Loading section: ${section}, locale: ${locale}`)

      const { data, error } = await supabase
        .from("site_content")
        .select("key, value_ru, value_en, value_zh, visible, metadata")
        .eq("section", section)
        .eq("visible", true)
        .order("metadata->order", { ascending: true })

      if (error) {
        console.error(` useSiteContent - Database error:`, error)
        throw error
      }

      console.log(` useSiteContent - Loaded ${data?.length || 0} items for section ${section}:`, data)

      const contentMap: ContentMap = {}
      const itemsList: ContentItem[] = []

      data?.forEach((item: ContentItem) => {
        const value =
          locale === "en"
            ? item.value_en || item.value_ru
            : locale === "zh"
              ? item.value_zh || item.value_ru
              : item.value_ru

        if (value) {
          contentMap[item.key] = value
          itemsList.push({ ...item })
        }
      })

      console.log(` useSiteContent - Content map for ${section}:`, contentMap)
      console.log(` useSiteContent - Items list for ${section}:`, itemsList)

      setContent(contentMap)
      setItems(itemsList)
    } catch (error) {
      console.error(` Error loading content for section ${section}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const get = (key: string, fallback = "") => {
    return content[key] || fallback
  }

  const getItems = (keyPattern: string) => {
    return items
      .filter((item) => item.key.match(new RegExp(keyPattern)))
      .map((item) => {
        const value =
          locale === "en"
            ? item.value_en || item.value_ru
            : locale === "zh"
              ? item.value_zh || item.value_ru
              : item.value_ru
        return { key: item.key, value: value || "", metadata: item.metadata }
      })
  }

  return { content, get, getItems, items, loading }
}
