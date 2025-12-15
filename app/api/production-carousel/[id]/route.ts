import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const body = await request.json()
    const { id } = params

    console.log("[v0] Updating production carousel item:", id, body)

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
      console.error("[v0] Error updating production carousel item:", updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    const { data, error: fetchError } = await supabase.from("production_carousel").select("*").eq("id", id).single()

    if (fetchError || !data) {
      console.error("[v0] Error fetching updated item:", fetchError)
      return NextResponse.json({ error: "Item not found after update" }, { status: 404 })
    }

    console.log("[v0] Updated production carousel item:", id)
    return NextResponse.json({ item: data })
  } catch (error) {
    console.error("[v0] Error in production carousel PUT:", error)
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { id } = params

    console.log("[v0] Deleting production carousel item:", id)

    const { error } = await supabase.from("production_carousel").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting production carousel item:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Deleted production carousel item:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in production carousel DELETE:", error)
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}
