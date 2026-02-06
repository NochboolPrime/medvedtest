import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log(" API - Fetching active announcement")
    const supabase = await createClient()

    const { data, error } = await supabase.from("announcements").select("*").eq("is_active", true).single()

    if (error) {
      console.log(" API - No active announcement or error:", error.message)
      return NextResponse.json({ announcement: null })
    }

    console.log(" API - Found active announcement:", data)
    return NextResponse.json({ announcement: data })
  } catch (error) {
    console.error(" API - Error fetching active announcement:", error)
    return NextResponse.json({ announcement: null })
  }
}
