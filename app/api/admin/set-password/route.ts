import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminSession } from "@/lib/admin-session"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const isAdmin = await getAdminSession()
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { password } = await request.json()
    const supabase = await createClient()

    const passwordHash = await bcrypt.hash(password, 10)

    // Check if settings exist
    const { data: existing } = await supabase.from("admin_settings").select("id").maybeSingle()

    if (existing) {
      const { error } = await supabase
        .from("admin_settings")
        .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
        .eq("id", existing.id)

      if (error) throw error
    } else {
      const { error } = await supabase.from("admin_settings").insert({ password_hash: passwordHash })

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Set password error:", error)
    return NextResponse.json({ error: "Ошибка установки пароля" }, { status: 500 })
  }
}
