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

    const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching announcements:", error)
      return NextResponse.json([])
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("[v0] Error in announcements GET:", error)
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

    const announcement = await request.json()
    console.log("[v0] Creating announcement:", announcement)

    if (announcement.is_active) {
      const { error: updateError } = await supabase
        .from("announcements")
        .update({ is_active: false })
        .neq("id", "00000000-0000-0000-0000-000000000000")

      if (updateError) {
        console.error("[v0] Error deactivating other announcements:", updateError)
      }
    }

    const { data, error } = await supabase.from("announcements").insert(announcement).select().single()

    if (error) {
      console.error("[v0] Error creating announcement:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Created announcement:", data?.id)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating announcement:", error)
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
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

    const announcement = await request.json()
    console.log("[v0] Updating announcement:", announcement.id)

    if (announcement.is_active) {
      const { error: updateError } = await supabase
        .from("announcements")
        .update({ is_active: false })
        .neq("id", announcement.id)

      if (updateError) {
        console.error("[v0] Error deactivating other announcements:", updateError)
      }
    }

    const { data, error } = await supabase
      .from("announcements")
      .update({
        ...announcement,
        updated_at: new Date().toISOString(),
      })
      .eq("id", announcement.id)
      .select()
      .single()

    if (error) {
      console.error("[v0] Error updating announcement:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error updating announcement:", error)
    return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 })
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
      return NextResponse.json({ error: "Announcement ID required" }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const { error } = await supabase.from("announcements").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting announcement:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
