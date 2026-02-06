import { NextResponse } from "next/server"
import { deleteAdminSession } from "@/lib/admin-session"

export async function POST() {
  try {
    await deleteAdminSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Logout error:", error)
    return NextResponse.json({ error: "Ошибка выхода" }, { status: 500 })
  }
}
