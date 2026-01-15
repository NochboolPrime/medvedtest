import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase/server"
import { getAdminSession } from "@/lib/admin-session"

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("[v0] Supabase not configured")
      return NextResponse.json([])
    }

    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching products:", error)
      return NextResponse.json([])
    }

    const mappedData = data?.map((product) => {
      const specs = product.specifications || {}

      return {
        id: product.id,
        slug: product.slug,
        title: product.name_ru,
        title_en: product.name_en,
        title_zh: product.name_zh,
        description: product.description_ru,
        description_en: product.description_en,
        description_zh: product.description_zh,
        full_description: specs.full_description_ru || "",
        full_description_en: specs.full_description_en || "",
        full_description_zh: specs.full_description_zh || "",
        features: specs.features_ru || [],
        features_en: specs.features_en || [],
        features_zh: specs.features_zh || [],
        advantages: specs.advantages_ru || [],
        advantages_en: specs.advantages_en || [],
        advantages_zh: specs.advantages_zh || [],
        applications: specs.applications_ru || [],
        applications_en: specs.applications_en || [],
        applications_zh: specs.applications_zh || [],
        specifications: specs.technical_specs_ru || [],
        specifications_en: specs.technical_specs_en || [],
        specifications_zh: specs.technical_specs_zh || [],
        category: product.category || "",
        image: product.image_url,
        show_on_homepage: product.is_visible,
        specification_pdf_url: product.specification_pdf_url,
        video_url: specs.video_url || "",
        price: 0,
        gallery: [],
      }
    })

    console.log("[v0] Fetched products:", mappedData?.length)
    return NextResponse.json(mappedData || [])
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const product = await request.json()
    console.log("[v0] Creating product:", product)

    const specifications = {
      full_description_ru: product.full_description || "",
      full_description_en: product.full_description_en || "",
      full_description_zh: product.full_description_zh || "",
      features_ru: product.features || [],
      features_en: product.features_en || [],
      features_zh: product.features_zh || [],
      advantages_ru: product.advantages || [],
      advantages_en: product.advantages_en || [],
      advantages_zh: product.advantages_zh || [],
      applications_ru: product.applications || [],
      applications_en: product.applications_en || [],
      applications_zh: product.applications_zh || [],
      technical_specs_ru: product.specifications || [],
      technical_specs_en: product.specifications_en || [],
      technical_specs_zh: product.specifications_zh || [],
      video_url: product.video_url || "",
    }

    const dbProduct = {
      slug: product.slug || `product-${Date.now()}`,
      name_ru: product.title || "",
      name_en: product.title_en || "",
      name_zh: product.title_zh || "",
      description_ru: product.description || "",
      description_en: product.description_en || "",
      description_zh: product.description_zh || "",
      category: product.category || "",
      image_url: product.image || "",
      specifications: specifications,
      is_visible: product.show_on_homepage !== undefined ? product.show_on_homepage : true,
      specification_pdf_url: product.specification_pdf_url || null,
      order_index: 0,
    }

    console.log("[v0] Inserting product to DB:", dbProduct)

    const { data, error } = await supabase.from("products").insert(dbProduct).select().single()

    if (error) {
      console.error("[v0] Error creating product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Created product:", data?.id)

    const specs = data.specifications || {}
    const mappedData = {
      id: data.id,
      slug: data.slug,
      title: data.name_ru,
      title_en: data.name_en,
      title_zh: data.name_zh,
      description: data.description_ru,
      description_en: data.description_en,
      description_zh: data.description_zh,
      full_description: specs.full_description_ru || "",
      full_description_en: specs.full_description_en || "",
      full_description_zh: specs.full_description_zh || "",
      features: specs.features_ru || [],
      features_en: specs.features_en || [],
      features_zh: specs.features_zh || [],
      advantages: specs.advantages_ru || [],
      advantages_en: specs.advantages_en || [],
      advantages_zh: specs.advantages_zh || [],
      applications: specs.applications_ru || [],
      applications_en: specs.applications_en || [],
      applications_zh: specs.applications_zh || [],
      specifications: specs.technical_specs_ru || [],
      specifications_en: specs.technical_specs_en || [],
      specifications_zh: specs.technical_specs_zh || [],
      category: data.category || "",
      image: data.image_url,
      show_on_homepage: data.is_visible,
      specification_pdf_url: data.specification_pdf_url,
      video_url: specs.video_url || "",
      price: 0,
      gallery: [],
    }

    return NextResponse.json(mappedData)
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const product = await request.json()
    console.log("[v0] Updating product:", product.id)

    const specifications = {
      full_description_ru: product.full_description || "",
      full_description_en: product.full_description_en || "",
      full_description_zh: product.full_description_zh || "",
      features_ru: product.features || [],
      features_en: product.features_en || [],
      features_zh: product.features_zh || [],
      advantages_ru: product.advantages || [],
      advantages_en: product.advantages_en || [],
      advantages_zh: product.advantages_zh || [],
      applications_ru: product.applications || [],
      applications_en: product.applications_en || [],
      applications_zh: product.applications_zh || [],
      technical_specs_ru: product.specifications || [],
      technical_specs_en: product.specifications_en || [],
      technical_specs_zh: product.specifications_zh || [],
      video_url: product.video_url || "",
    }

    const dbProduct = {
      slug: product.slug || "",
      name_ru: product.title || "",
      name_en: product.title_en || "",
      name_zh: product.title_zh || "",
      description_ru: product.description || "",
      description_en: product.description_en || "",
      description_zh: product.description_zh || "",
      category: product.category || "",
      image_url: product.image || "",
      specifications: specifications,
      is_visible: product.show_on_homepage !== undefined ? product.show_on_homepage : true,
      specification_pdf_url: product.specification_pdf_url || null,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("products").update(dbProduct).eq("id", product.id).select().single()

    if (error) {
      console.error("[v0] Error updating product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Updated product:", data?.id)

    const specs = data.specifications || {}
    const mappedData = {
      id: data.id,
      slug: data.slug,
      title: data.name_ru,
      title_en: data.name_en,
      title_zh: data.name_zh,
      description: data.description_ru,
      description_en: data.description_en,
      description_zh: data.description_zh,
      full_description: specs.full_description_ru || "",
      full_description_en: specs.full_description_en || "",
      full_description_zh: specs.full_description_zh || "",
      features: specs.features_ru || [],
      features_en: specs.features_en || [],
      features_zh: specs.features_zh || [],
      advantages: specs.advantages_ru || [],
      advantages_en: specs.advantages_en || [],
      advantages_zh: specs.advantages_zh || [],
      applications: specs.applications_ru || [],
      applications_en: specs.applications_en || [],
      applications_zh: specs.applications_zh || [],
      specifications: specs.technical_specs_ru || [],
      specifications_en: specs.technical_specs_en || [],
      specifications_zh: specs.technical_specs_zh || [],
      category: data.category || "",
      image: data.image_url,
      show_on_homepage: data.is_visible,
      specification_pdf_url: data.specification_pdf_url,
      video_url: specs.video_url || "",
      price: 0,
      gallery: [],
    }

    return NextResponse.json(mappedData)
  } catch (error) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting product:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
