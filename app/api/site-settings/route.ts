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
    const supabase = getSupabaseClient()
    if (!supabase) {
      console.log("[v0] Supabase not configured, returning empty settings")
      return NextResponse.json({ settings: {} }, { status: 200 })
    }

    const { data: settings, error } = await supabase.from("site_settings").select("*")

    if (error) {
      console.error("[v0] Error fetching site settings:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Convert array to object for easier access
    const settingsObj =
      settings?.reduce(
        (acc, setting) => {
          acc[setting.key] = setting.value
          return acc
        },
        {} as Record<string, any>,
      ) || {}

    return NextResponse.json({ settings: settingsObj })
  } catch (error) {
    console.error("[v0] Unexpected error in site-settings GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { key, value } = body

    console.log("[v0] Updating site setting:", key, "to:", value)

    const { data: setting, error } = await supabase
      .from("site_settings")
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating site setting:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Site setting updated successfully:", setting)
    return NextResponse.json({ setting })
  } catch (error) {
    console.error("[v0] Unexpected error in site-settings PUT:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
