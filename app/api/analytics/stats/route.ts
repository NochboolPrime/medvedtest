import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    const supabase = getSupabaseClient()

    if (!supabase) {
      console.error("[v0] Supabase not configured")
      return NextResponse.json({
        productStats: [],
        dailyStats: [],
        totalEvents: 0,
      })
    }

    // Instead it has event_type field with values: 'view', 'click', 'detail_view'
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data: analytics, error } = await supabase
      .from("product_analytics")
      .select("product_id, created_at")
      .gte("created_at", startDate.toISOString())

    if (error) {
      console.error("[v0] Error fetching analytics:", error)
      return NextResponse.json({
        productStats: [],
        dailyStats: [],
        totalEvents: 0,
      })
    }

    // Get products info
    const { data: products, error: productsError } = await supabase.from("products").select("id, name_ru")

    if (productsError) {
      console.error("[v0] Error fetching products for analytics:", productsError)
    }

    // Count all analytics entries as views for now
    const productStats = new Map()
    const dailyStats = new Map()

    analytics?.forEach((event) => {
      const productId = event.product_id
      const date = new Date(event.created_at).toISOString().split("T")[0]

      // Product stats
      if (!productStats.has(productId)) {
        const product = products?.find((p) => p.id === productId)
        productStats.set(productId, {
          id: productId,
          title: product?.name_ru || "Unknown",
          views: 0,
          clicks: 0,
          detailViews: 0,
        })
      }

      const stats = productStats.get(productId)
      stats.views++ // Count all as views for simplicity

      // Daily stats
      if (!dailyStats.has(date)) {
        dailyStats.set(date, { date, views: 0, clicks: 0, detailViews: 0 })
      }
      const dayStats = dailyStats.get(date)
      dayStats.views++
    })

    return NextResponse.json({
      productStats: Array.from(productStats.values())
        .sort((a, b) => b.views - a.views)
        .slice(0, 10),
      dailyStats: Array.from(dailyStats.values()).sort((a, b) => a.date.localeCompare(b.date)),
      totalEvents: analytics?.length || 0,
    })
  } catch (error) {
    console.error("[v0] Error getting analytics:", error)
    return NextResponse.json(
      {
        productStats: [],
        dailyStats: [],
        totalEvents: 0,
      },
      { status: 500 },
    )
  }
}
