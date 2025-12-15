import { createClient } from "@supabase/supabase-js"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from("production_carousel")
      .select("*")
      .eq("is_visible", true)
      .order("order_index", { ascending: true })

    if (error) {
      console.error("[v0] Error fetching production carousel:", error)
      return NextResponse.json({ items: [] })
    }

    console.log("[v0] Fetched production carousel items:", data?.length || 0)
    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error("[v0] Error in production carousel GET:", error)
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error: Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const body = await request.json()

    console.log("[v0] Creating production carousel item:", body)

    const { data, error } = await supabase
      .from("production_carousel")
      .insert({
        image_url: body.image_url,
        caption_ru: body.caption_ru,
        caption_en: body.caption_en,
        caption_zh: body.caption_zh,
        order_index: body.order_index || 0,
        is_visible: body.is_visible !== undefined ? body.is_visible : true,
        auto_slide_interval: body.auto_slide_interval || 3000,
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error creating production carousel item:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Created production carousel item:", data.id)
    return NextResponse.json({ item: data })
  } catch (error) {
    console.error("[v0] Error in production carousel POST:", error)
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 })
  }
}
