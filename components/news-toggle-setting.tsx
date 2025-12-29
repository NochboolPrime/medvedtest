"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useTranslations } from "@/hooks/use-translations"
import { useRouter } from "next/navigation"

export function NewsToggleSetting() {
  const [newsEnabled, setNewsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const response = await fetch("/api/site-settings")
    const data = await response.json()
    setNewsEnabled(data.settings?.news_enabled ?? true)
  }

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true)

    console.log("[v0] Toggling news to:", checked)

    const response = await fetch("/api/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "news_enabled", value: checked }),
    })

    if (response.ok) {
      setNewsEnabled(checked)
      toast.success(
        checked
          ? t("news.admin.newsToggle") + " " + t("common.enabled", "включен")
          : t("news.admin.newsToggle") + " " + t("common.disabled", "отключен"),
      )

      console.log("[v0] News toggle successful, refreshing...")

      router.refresh()

      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      const errorData = await response.json()
      console.error("[v0] Error toggling news:", errorData)
      toast.error(t("common.error", "Ошибка обновления настроек"))
    }
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Switch checked={newsEnabled} onCheckedChange={handleToggle} disabled={isLoading} />
        <Label className="font-medium">{t("news.admin.newsToggle")}</Label>
      </div>
      <p className="text-sm text-muted-foreground">{t("news.admin.newsToggleDescription")}</p>
    </div>
  )
}
