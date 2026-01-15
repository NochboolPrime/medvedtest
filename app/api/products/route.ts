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

    const mappedData = data?.map((product) => ({
      id: product.id,
      slug: product.slug,
      title: product.name_ru,
      title_en: product.name_en,
      title_zh: product.name_zh,
      description: product.description_ru,
      description_en: product.description_en,
      description_zh: product.description_zh,
      category: product.category || "",
      image: product.image_url,
      specifications: product.specifications,
      show_on_homepage: product.is_visible,
      specification_pdf_url: product.specification_pdf_url,
      price: 0,
      gallery: [],
      features: [],
      full_description: "",
      advantages: [],
      applications: [],
    }))

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
      specifications: product.specifications || {},
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

    const mappedData = {
      id: data.id,
      slug: data.slug,
      title: data.name_ru,
      title_en: data.name_en,
      title_zh: data.name_zh,
      description: data.description_ru,
      description_en: data.description_en,
      description_zh: data.description_zh,
      category: data.category || "",
      image: data.image_url,
      specifications: data.specifications,
      show_on_homepage: data.is_visible,
      specification_pdf_url: data.specification_pdf_url,
      price: 0,
      gallery: [],
      features: [],
      full_description: "",
      advantages: [],
      applications: [],
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
      specifications: product.specifications || {},
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

    const mappedData = {
      id: data.id,
      slug: data.slug,
      title: data.name_ru,
      title_en: data.name_en,
      title_zh: data.name_zh,
      description: data.description_ru,
      description_en: data.description_en,
      description_zh: data.description_zh,
      category: data.category || "",
      image: data.image_url,
      specifications: data.specifications,
      show_on_homepage: data.is_visible,
      specification_pdf_url: data.specification_pdf_url,
      price: 0,
      gallery: [],
      features: [],
      full_description: "",
      advantages: [],
      applications: [],
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
