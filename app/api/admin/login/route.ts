import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminSession } from "@/lib/admin-session"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const supabase = await createClient()

    // Check if password exists
    const { data: settings, error } = await supabase.from("admin_settings").select("password_hash").maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // If no password set, allow login
    if (!settings?.password_hash) {
      await createAdminSession()
      return NextResponse.json({ success: true })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, settings.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 })
    }

    await createAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Ошибка входа" }, { status: 500 })
  }
}
