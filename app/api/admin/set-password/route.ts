import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAdminSession, createAdminSession } from "@/lib/admin-session"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Проверяем, установлен ли уже пароль
    const { data: existingSettings } = await supabase.from("admin_settings").select("id, password_hash").maybeSingle()
    const hasPassword = !!existingSettings?.password_hash
    
    // Если пароль уже установлен, требуем авторизацию для его изменения
    if (hasPassword) {
      const isAdmin = await getAdminSession()
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const { password } = await request.json()
    
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "Пароль должен содержать минимум 6 символов" }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    if (existingSettings) {
      const { error } = await supabase
        .from("admin_settings")
        .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
        .eq("id", existingSettings.id)

      if (error) throw error
    } else {
      const { error } = await supabase.from("admin_settings").insert({ password_hash: passwordHash })

      if (error) throw error
    }

    // Устанавливаем сессию после установки пароля
    await createAdminSession()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Set password error:", error)
    return NextResponse.json({ error: "Ошибка установки пароля" }, { status: 500 })
  }
}
