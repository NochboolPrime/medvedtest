import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"
import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"
import { getSupabaseClient } from "@/lib/supabase/server"
import { ProductDetailDynamic } from "@/components/product-detail-dynamic"

interface ProductData {
  title: string
  description: string
  longDescription: string
  images: string[]
  specifications: { label: string; value: string }[]
  features: string[]
  applications: string[]
}

const productImages: Record<string, string[]> = {
  tsementirovaniye: [
    "/images/photo-5460756544556759479-y.jpg",
    "/images/photo-5460756544556759475-y.jpg",
    "/images/photo-5460756544556759476-y.jpg",
    "/images/photo-5460756544556759478-y.jpg",
  ],
  grp: [
    "/images/photo-5460756544556759477-y.jpg",
    "/images/photo-5460756544556759472-y.jpg",
    "/images/photo-5460756544556759474-y.jpg",
    "/images/photo-5460756544556759473-y.jpg",
  ],
  nasos: [
    "/images/photo-5460756544556759489-y.jpg",
    "/images/photo-5460756544556759481-y.jpg",
    "/images/photo-5460756544556759485-y.jpg",
    "/images/photo-5460756544556759487-y.jpg",
  ],
}

const productSlugs = [
  "tsementirovaniye",
  "grp",
  "nasos",
  "ca-320",
  "nasosnaya-stantsiya",
  "kompleks-grp",
  "mnogofunktsionalnaya",
]

export async function generateStaticParams() {
  return productSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params

  return {
    title: `Продукт - ТД Медведь`,
    description: "Высококачественное оборудование для нефтегазовой промышленности",
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = getSupabaseClient()

  if (!supabase) {
    notFound()
  }

  const { data: product, error } = await supabase.from("products").select("*").eq("slug", resolvedParams.slug).single()

  if (error || !product) {
    console.error("[v0] Error fetching product:", error)
    notFound()
  }

  const specs = product.specifications || {}

  const productData = {
    id: product.id,
    slug: product.slug,
    name_ru: product.name_ru || "",
    name_en: product.name_en || "",
    name_zh: product.name_zh || "",
    description_ru: product.description_ru || "",
    description_en: product.description_en || "",
    description_zh: product.description_zh || "",
    full_description_ru: specs.full_description_ru || "",
    full_description_en: specs.full_description_en || "",
    full_description_zh: specs.full_description_zh || "",
    features_ru: specs.features_ru || [],
    features_en: specs.features_en || [],
    features_zh: specs.features_zh || [],
    advantages_ru: specs.advantages_ru || [],
    advantages_en: specs.advantages_en || [],
    advantages_zh: specs.advantages_zh || [],
    applications_ru: specs.applications_ru || [],
    applications_en: specs.applications_en || [],
    applications_zh: specs.applications_zh || [],
    technical_specs_ru: specs.technical_specs_ru || [],
    technical_specs_en: specs.technical_specs_en || [],
    technical_specs_zh: specs.technical_specs_zh || [],
    image_url: product.image_url,
    category: product.category,
    specification_pdf_url: product.specification_pdf_url,
    video_url: specs.video_url || "",
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BackButton />
      <ProductDetailDynamic product={productData} />
      <Contact />
      <Footer />
    </main>
  )
}
