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
      console.log(" Supabase not configured, returning empty news")
      return NextResponse.json({ news: [] }, { status: 200 })
    }

    const { data: news, error } = await supabase
      .from("news")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })

    if (error) {
      console.error(" Error fetching news:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ news })
  } catch (error) {
    console.error(" Unexpected error in news GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const body = await request.json()

    console.log(" Creating news article:", body.slug)

    const { data: news, error } = await supabase.from("news").insert([body]).select().single()

    if (error) {
      console.error(" Error creating news:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(" News article created successfully:", news.id)
    return NextResponse.json({ news })
  } catch (error) {
    console.error(" Unexpected error in news POST:", error)
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
    const { id, ...updates } = body

    console.log(" Updating news article:", id)

    const { data: news, error } = await supabase.from("news").update(updates).eq("id", id).select().single()

    if (error) {
      console.error(" Error updating news:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(" News article updated successfully")
    return NextResponse.json({ news })
  } catch (error) {
    console.error(" Unexpected error in news PUT:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    console.log(" Deleting news article:", id)

    const { error } = await supabase.from("news").delete().eq("id", id)

    if (error) {
      console.error(" Error deleting news:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(" News article deleted successfully")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Unexpected error in news DELETE:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
