import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

function getSupabaseClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null
  }
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.error(" Missing Supabase environment variables")
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { id } = await params

    console.log(" Updating production carousel item:", id, body)

    const { error: updateError } = await supabase
      .from("production_carousel")
      .update({
        image_url: body.image_url,
        caption_ru: body.caption_ru,
        caption_en: body.caption_en,
        caption_zh: body.caption_zh,
        order_index: body.order_index,
        is_visible: body.is_visible,
        auto_slide_interval: body.auto_slide_interval,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (updateError) {
      console.error(" Error updating production carousel item:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const { data, error: fetchError } = await supabase.from("production_carousel").select("*").eq("id", id).single()

    if (fetchError || !data) {
      console.error(" Error fetching updated item:", fetchError)
      return NextResponse.json({ error: "Item not found after update" }, { status: 404 })
    }

    console.log(" Updated production carousel item:", id)
    return NextResponse.json({ item: data })
  } catch (error) {
    console.error(" Error in production carousel PUT:", error)
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.error(" Missing Supabase environment variables")
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const { id } = await params

    console.log(" Deleting production carousel item:", id)

    const { error } = await supabase.from("production_carousel").delete().eq("id", id)

    if (error) {
      console.error(" Error deleting production carousel item:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(" Deleted production carousel item:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Error in production carousel DELETE:", error)
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
