import { createClient } from "@/lib/supabase/server"
import { ProductsClient } from "./products-client"

interface EquipmentItem {
  id: string
  title: string
  description: string
  slug: string
  image: string
  features: string[]
  title_en?: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  features_en?: string[]
  features_zh?: string[]
}

export async function Products() {
  try {
    const supabase = await createClient()

    const { data: products } = await supabase
      .from("products")
      .select(
        "id, title, description, slug, image, features, title_en, title_zh, description_en, description_zh, features_en, features_zh, show_on_homepage, created_at",
      )
      .eq("show_on_homepage", true)
      .order("created_at", { ascending: true })
      .limit(4)

    const mappedProducts = (products || []).map((p) => ({
      id: p.id.toString(),
      title: p.title,
      description: p.description,
      slug: p.slug,
      image: p.image,
      features: p.features || [],
      title_en: p.title_en,
      title_zh: p.title_zh,
      description_en: p.description_en,
      description_zh: p.description_zh,
      features_en: p.features_en || [],
      features_zh: p.features_zh || [],
    }))

    return <ProductsClient products={mappedProducts} />
  } catch (error) {
    console.error("[v0] Error loading products:", error)
    return <ProductsClient products={[]} />
  }
}
