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

    const { data: dbProducts } = await supabase
      .from("products")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false })

    const products =
      dbProducts?.map((product) => ({
        id: product.id,
        slug: product.slug,
        title: product.name_ru || "",
        title_en: product.name_en || "",
        title_zh: product.name_zh || "",
        description: product.description_ru || "",
        description_en: product.description_en || "",
        description_zh: product.description_zh || "",
        category: product.category || "",
        image: product.image_url || "",
        price: 0,
        features: [],
      })) || []

    return <CatalogPageClient products={products} />
  } catch (error) {
    console.error("[v0] Error loading products:", error)
    return <CatalogPageClient products={[]} />
  }
}
