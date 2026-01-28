import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ pdf_url: "", title: "", title_en: "", title_zh: "" })
    }

    const { data, error } = await supabase
      .from("catalog_pdf")
      .select("*")
      .eq("id", "00000000-0000-0000-0000-000000000001")
      .single()

    if (error) {
      console.error("Error fetching catalog PDF:", error)
      return NextResponse.json({ pdf_url: "", title: "", title_en: "", title_zh: "" })
    }

    return NextResponse.json(data || { pdf_url: "", title: "", title_en: "", title_zh: "" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ pdf_url: "", title: "", title_en: "", title_zh: "" })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { pdf_url, title, title_en, title_zh } = body

    // Use upsert to create or update the record
    const { data, error } = await supabase
      .from("catalog_pdf")
      .upsert(
        {
          id: "00000000-0000-0000-0000-000000000001",
          pdf_url: pdf_url || "",
          title: title || "Каталог продукции",
          title_en: title_en || "Product Catalog",
          title_zh: title_zh || "产品目录",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      )
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("catalog-pdf PUT error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
