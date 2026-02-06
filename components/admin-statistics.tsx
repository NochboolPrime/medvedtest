"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Eye, MousePointer, FileText } from "lucide-react"

interface ProductStat {
  id: string
  title: string
  views: number
  clicks: number
  detailViews: number
}

interface DailyStat {
  date: string
  views: number
  clicks: number
  detailViews: number
}

export function AdminStatistics() {
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")
  const [productStats, setProductStats] = useState<ProductStat[]>([])
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([])
  const [totalEvents, setTotalEvents] = useState(0)

  useEffect(() => {
    loadStatistics()
  }, [timeRange])

  const loadStatistics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics/stats?days=${timeRange}`)
      const data = await response.json()
      setProductStats(data.productStats || [])
      setDailyStats(data.dailyStats || [])
      setTotalEvents(data.totalEvents || 0)
    } catch (error) {
      console.error(" Error loading statistics:", error)
    } finally {
      setLoading(false)
    }
  }

  const topProduct = productStats[0]
  const totalViews = productStats.reduce((sum, p) => sum + p.views, 0)
  const totalClicks = productStats.reduce((sum, p) => sum + p.clicks, 0)
  const totalDetailViews = productStats.reduce((sum, p) => sum + p.detailViews, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Загрузка статистики...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Статистика и аналитика</h2>
          <p className="text-muted-foreground text-sm">Анализ интереса пользователей к товарам</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Последние 7 дней</SelectItem>
            <SelectItem value="30">Последние 30 дней</SelectItem>
            <SelectItem value="90">Последние 90 дней</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего просмотров</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">Карточки товаров</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Кликов на товары</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">Переходы на карточки</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Детальных просмотров</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDetailViews}</div>
            <p className="text-xs text-muted-foreground">Страниц товаров</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Самый популярный</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{topProduct?.title || "Нет данных"}</div>
            <p className="text-xs text-muted-foreground">
              {topProduct ? `${topProduct.views + topProduct.clicks} событий` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Активность по дням</CardTitle>
          <CardDescription>График просмотров, кликов и детальных просмотров</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" name="Просмотры" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" name="Клики" strokeWidth={2} />
              <Line type="monotone" dataKey="detailViews" stroke="#f59e0b" name="Детальные" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Топ-10 товаров по активности</CardTitle>
          <CardDescription>Самые просматриваемые и кликаемые товары</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productStats} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="title" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#3b82f6" name="Просмотры" />
              <Bar dataKey="clicks" fill="#10b981" name="Клики" />
              <Bar dataKey="detailViews" fill="#f59e0b" name="Детальные" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Детальная статистика по товарам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Название товара</th>
                  <th className="text-right p-2">Просмотры</th>
                  <th className="text-right p-2">Клики</th>
                  <th className="text-right p-2">Детальные</th>
                  <th className="text-right p-2">Конверсия</th>
                </tr>
              </thead>
              <tbody>
                {productStats.map((product) => {
                  const conversion = product.views > 0 ? ((product.clicks / product.views) * 100).toFixed(1) : "0"
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{product.title}</td>
                      <td className="text-right p-2">{product.views}</td>
                      <td className="text-right p-2">{product.clicks}</td>
                      <td className="text-right p-2">{product.detailViews}</td>
                      <td className="text-right p-2">{conversion}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
