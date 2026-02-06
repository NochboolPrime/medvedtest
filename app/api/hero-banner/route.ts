import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

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

export async function GET() {
  try {
    console.log(" Fetching hero banner")

    const supabase = getSupabaseClient()
    if (!supabase) {
      console.log(" Supabase not configured, returning null")
      return NextResponse.json({ banner: null }, { status: 200 })
    }

    const { data, error } = await supabase.from("hero_banner").select("*").eq("is_active", true).single()

    if (error) {
      console.error(" Error fetching hero banner:", error)
      return NextResponse.json({ banner: null }, { status: 200 })
    }

    console.log(" Hero banner fetched:", data)
    return NextResponse.json({ banner: data })
  } catch (error) {
    console.error(" Error in hero banner GET:", error)
    return NextResponse.json({ banner: null }, { status: 200 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const { image_url } = await request.json()

    console.log(" Updating hero banner with image:", image_url)

    // First, deactivate all existing banners
    await supabase.from("hero_banner").update({ is_active: false }).neq("id", "00000000-0000-0000-0000-000000000000")

    // Then insert or update the new active banner
    const { data: existing } = await supabase.from("hero_banner").select("id").eq("is_active", true).maybeSingle()

    let result
    if (existing) {
      result = await supabase
        .from("hero_banner")
        .update({
          image_url,
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single()
    } else {
      result = await supabase
        .from("hero_banner")
        .insert({
          image_url,
          is_active: true,
        })
        .select()
        .single()
    }

    if (result.error) {
      console.error(" Error updating hero banner:", result.error)
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    console.log(" Hero banner updated:", result.data)
    return NextResponse.json({ banner: result.data })
  } catch (error) {
    console.error(" Error in hero banner PUT:", error)
    return NextResponse.json({ error: "Failed to update banner" }, { status: 500 })
  }
}
