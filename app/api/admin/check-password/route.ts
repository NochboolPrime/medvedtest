import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("admin_settings").select("password_hash").maybeSingle()

    if (error) {
      return NextResponse.json({ hasPassword: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ hasPassword: !!data?.password_hash })
  } catch (error) {
    console.error(" Error checking password:", error)
    return NextResponse.json({ hasPassword: false, error: "Failed to check password" }, { status: 500 })
  }
}
