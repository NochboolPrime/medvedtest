import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { TransportationDetail } from "@/components/transportation-detail"
import { BackButton } from "@/components/back-button"

export async function generateStaticParams() {
  try {
    const supabase = await createClient()
    const { data: products } = await supabase.from("products").select("slug")

    return (
      products?.map((product) => ({
        slug: product.slug,
      })) || []
    )
  } catch (error) {
    console.error(" Error generating static params:", error)
    return []
  }
}

export const dynamic = "force-dynamic"

export default async function TransportationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const supabase = await createClient()

    const { data: product, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error || !product) {
      notFound()
    }

    return (
      <>
        <BackButton />
        <TransportationDetail
          productId={product.id}
          transportationKey={slug}
          image={product.image}
          gallery={product.gallery || [product.image]}
          video_url={product.video_url}
          price={product.price}
          specification_pdf_url={product.specification_pdf_url} // Added PDF URL prop
          title={product.title}
          description={product.description}
          features={product.features}
          fullDescription={product.full_description}
          specifications={product.specifications}
          advantages={product.advantages}
          applications={product.applications}
          title_en={product.title_en}
          title_zh={product.title_zh}
          description_en={product.description_en}
          description_zh={product.description_zh}
          features_en={product.features_en}
          features_zh={product.features_zh}
          full_description_en={product.full_description_en}
          full_description_zh={product.full_description_zh}
          advantages_en={product.advantages_en}
          advantages_zh={product.advantages_zh}
          applications_en={product.applications_en}
          applications_zh={product.applications_zh}
          specifications_en={product.specifications_en}
          specifications_zh={product.specifications_zh}
        />
      </>
    )
  } catch (error) {
    console.error(" Error loading product:", error)
    notFound()
  }
}
