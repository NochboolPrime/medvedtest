import { createClient } from "@/lib/supabase/server"
import { CatalogPageClient } from "./catalog-client"

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  image: string
  slug: string
  features: string[]
}

export const dynamic = "force-dynamic"

export default async function CatalogPage() {
  try {
    const supabase = await createClient()

    const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    return <CatalogPageClient products={products || []} />
  } catch (error) {
    console.error("[v0] Error loading products:", error)
    return <CatalogPageClient products={[]} />
  }
}
