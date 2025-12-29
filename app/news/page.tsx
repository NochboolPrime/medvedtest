import { createClient } from "@/lib/supabase/server"
import { NewsClient } from "./news-client"
import { redirect } from "next/navigation"

export const revalidate = 60

export default async function NewsPage() {
  const supabase = await createClient()

  // Check if news is enabled
  const { data: settings } = await supabase.from("site_settings").select("*").eq("key", "news_enabled").single()

  if (!settings?.value) {
    redirect("/")
  }

  // Fetch news
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  return <NewsClient news={news || []} />
}
