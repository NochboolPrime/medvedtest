import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminSession } from "@/lib/admin-session"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error(" Error fetching announcements:", error)
      return NextResponse.json([])
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error(" Error in announcements GET:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const announcement = await request.json()
    const supabase = await createClient()

    if (announcement.is_active) {
      await supabase
        .from("announcements")
        .update({ is_active: false })
        .neq("id", "00000000-0000-0000-0000-000000000000")
    }

    const { data, error } = await supabase.from("announcements").insert(announcement).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error(" Error creating announcement:", error)
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const announcement = await request.json()
    const supabase = await createClient()

    if (announcement.is_active) {
      await supabase.from("announcements").update({ is_active: false }).neq("id", announcement.id)
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

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error(" Error updating announcement:", error)
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

    const supabase = await createClient()

    const { error } = await supabase.from("announcements").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
