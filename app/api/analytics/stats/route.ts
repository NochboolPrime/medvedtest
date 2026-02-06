import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    const supabase = await createClient()

    // Get date range
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get product stats
    const { data: analytics, error } = await supabase
      .from("product_analytics")
      .select("product_id, event_type, created_at")
      .gte("created_at", startDate.toISOString())

    if (error) throw error

    // Get products info
    const { data: products, error: productsError } = await supabase.from("products").select("id, title")

    if (productsError) throw productsError

    // Process stats
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
          title: product?.title || "Unknown",
          views: 0,
          clicks: 0,
          detailViews: 0,
        })
      }

      const stats = productStats.get(productId)
      if (event.event_type === "view") stats.views++
      if (event.event_type === "click") stats.clicks++
      if (event.event_type === "detail_view") stats.detailViews++

      // Daily stats
      if (!dailyStats.has(date)) {
        dailyStats.set(date, { date, views: 0, clicks: 0, detailViews: 0 })
      }
      const dayStats = dailyStats.get(date)
      if (event.event_type === "view") dayStats.views++
      if (event.event_type === "click") dayStats.clicks++
      if (event.event_type === "detail_view") dayStats.detailViews++
    })

    return NextResponse.json({
      productStats: Array.from(productStats.values())
        .sort((a, b) => b.views + b.clicks - (a.views + a.clicks))
        .slice(0, 10),
      dailyStats: Array.from(dailyStats.values()).sort((a, b) => a.date.localeCompare(b.date)),
      totalEvents: analytics?.length || 0,
    })
  } catch (error) {
    console.error(" Error getting analytics:", error)
    return NextResponse.json({ error: "Failed to get statistics" }, { status: 500 })
  }
}
