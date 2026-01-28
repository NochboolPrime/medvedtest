import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ items: [] })
    }

    const { data, error } = await supabase
      .from("production_carousel")
      .select("*")
      .eq("is_visible", true)
      .order("order_index", { ascending: true })

    if (error) {
      console.error("Error fetching production carousel:", error)
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json({ items: data || [] })
  } catch (error) {
    console.error("Error in production carousel GET:", error)
    return NextResponse.json({ items: [] })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const body = await request.json()

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
      console.error("Error creating production carousel item:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ item: data })
  } catch (error) {
    console.error("Error in production carousel POST:", error)
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 })
  }
}
