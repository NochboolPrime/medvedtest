import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { productId, eventType } = await request.json()

    if (!productId || !eventType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase.from("product_analytics").insert({
      product_id: productId,
      event_type: eventType,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error tracking analytics:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
