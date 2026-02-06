import { createClient } from "@/lib/supabase/server"
import { NewsDetailClient } from "./news-detail-client"
import { notFound, redirect } from "next/navigation"

export const revalidate = 60

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Check if news is enabled
  const { data: settings } = await supabase.from("site_settings").select("*").eq("key", "news_enabled").single()

  if (!settings?.value) {
    redirect("/")
  }

  const { data: newsItem, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  console.log(" News detail - slug:", slug, "newsItem:", newsItem, "error:", error)

  if (!newsItem) {
    notFound()
  }

  return <NewsDetailClient newsItem={newsItem} />
}
