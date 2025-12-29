"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { BarChart3, Eye, MousePointer, LinkIcon, ShoppingCart, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function YandexMetrikaSettings() {
  const [metrikaId, setMetrikaId] = useState("")
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/site-settings")
      const { settings } = await response.json()

      setMetrikaId(settings?.yandex_metrika_id || "105746302")
      setEnabled(settings?.yandex_metrika_enabled !== false)
    } catch (error) {
      console.error("Failed to load Yandex Metrika settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      // Save Metrika ID
      await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "yandex_metrika_id",
          value: metrikaId,
        }),
      })

      // Save enabled state
      await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "yandex_metrika_enabled",
          value: enabled,
        }),
      })

      toast({
        title: "Настройки сохранены",
        description: "Яндекс.Метрика успешно настроена. Перезагрузите страницу для применения изменений.",
      })

      // Reload page to apply changes
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error("Failed to save Yandex Metrika settings:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle>Яндекс.Метрика</CardTitle>
              <CardDescription>
                Настройте счетчик для отслеживания посещаемости и поведения пользователей
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${enabled ? "bg-green-500/20" : "bg-gray-500/20"}`}>
                {enabled ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-gray-500" />}
              </div>
              <div>
                <Label htmlFor="metrika-enabled" className="text-base font-medium">
                  Включить Яндекс.Метрику
                </Label>
                <p className="text-sm text-muted-foreground">Счетчик будет активен на всех страницах сайта</p>
              </div>
            </div>
            <Switch id="metrika-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metrika-id">ID счетчика</Label>
            <Input
              id="metrika-id"
              placeholder="105746302"
              value={metrikaId}
              onChange={(e) => setMetrikaId(e.target.value)}
              className="font-mono"
            />
            <p className="text-sm text-muted-foreground">Найдите ID в настройках счетчика на metrika.yandex.ru</p>
          </div>

          <Button onClick={handleSave} className="w-full">
            Сохранить настройки
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Возможности Яндекс.Метрики</CardTitle>
          <CardDescription>Что отслеживает счетчик на вашем сайте</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Eye className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <div className="font-medium">Вебвизор</div>
                <p className="text-sm text-muted-foreground">Записи действий посетителей на сайте</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MousePointer className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <div className="font-medium">Карта кликов</div>
                <p className="text-sm text-muted-foreground">Тепловая карта действий пользователей</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <LinkIcon className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <div className="font-medium">Отслеживание ссылок</div>
                <p className="text-sm text-muted-foreground">Клики по внешним ссылкам</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <div className="font-medium">Электронная коммерция</div>
                <p className="text-sm text-muted-foreground">Отслеживание товаров и заказов</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {enabled && metrikaId && (
        <Card className="border-green-500/50 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-full">
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <div className="font-medium text-green-500">Яндекс.Метрика активна</div>
                <p className="text-sm text-muted-foreground">
                  Данные собираются и отображаются в вашем личном кабинете Яндекс.Метрики
                </p>
                <a
                  href={`https://metrika.yandex.ru/dashboard?id=${metrikaId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  Открыть статистику
                  <LinkIcon className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
