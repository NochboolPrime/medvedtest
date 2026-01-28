"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

interface Announcement {
  id?: string
  title_ru: string
  title_en: string
  title_zh: string
  content_ru: string
  content_en: string
  content_zh: string
  image_url?: string
  link_url?: string
  link_text_ru?: string
  link_text_en?: string
  link_text_zh?: string
  is_active: boolean
  show_delay: number
  auto_hide_delay: number
}

export function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [languageTab, setLanguageTab] = useState<"ru" | "en" | "zh">("ru")
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements")
      const data = await response.json()
      setAnnouncements(data)
    } catch (error) {
      console.error("Error fetching announcements:", error)
    }
  }

  const handleSave = async () => {
    if (!editingAnnouncement) return

    try {
      const url = "/api/announcements"
      const method = editingAnnouncement.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAnnouncement),
      })

      if (response.ok) {
        await fetchAnnouncements()
        setEditingAnnouncement(null)
      } else {
        const errorText = await response.text()
        alert(`Ошибка сохранения: ${errorText}`)
      }
    } catch (error) {
      console.error("Error saving announcement:", error)
      alert("Ошибка сохранения анонса")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить анонс?")) return

    try {
      const response = await fetch(`/api/announcements?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchAnnouncements()
      }
    } catch (error) {
      console.error("Error deleting announcement:", error)
    }
  }

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      const response = await fetch("/api/announcements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...announcement,
          is_active: !announcement.is_active,
        }),
      })

      if (response.ok) {
        await fetchAnnouncements()
      }
    } catch (error) {
      console.error("Error toggling announcement:", error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingAnnouncement) return

    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, выберите файл изображения")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Размер файла не должен превышать 10MB")
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      alert("Supabase не настроен. Проверьте переменные окружения.")
      return
    }

    setIsUploadingImage(true)

    try {
      // Generate unique filename
      const ext = file.name.split(".").pop() || "jpg"
      const fileName = `announcement-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

      // Upload directly to Supabase Storage
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error("Supabase upload error:", error)
        alert(`Ошибка загрузки: ${error.message}`)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(data.path)

      if (urlData.publicUrl) {
        setEditingAnnouncement({
          ...editingAnnouncement,
          image_url: urlData.publicUrl,
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Ошибка загрузки изображения")
    } finally {
      setIsUploadingImage(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Управление анонсами</h2>
        <Button
          onClick={() =>
            setEditingAnnouncement({
              title_ru: "",
              title_en: "",
              title_zh: "",
              content_ru: "",
              content_en: "",
              content_zh: "",
              image_url: undefined,
              link_url: "",
              link_text_ru: "",
              link_text_en: "",
              link_text_zh: "",
              is_active: false,
              show_delay: 3000,
              auto_hide_delay: 10000,
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить анонс
        </Button>
      </div>

      <div className="grid gap-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle>{announcement.title_ru}</CardTitle>
                  <CardDescription>{announcement.content_ru.substring(0, 100)}...</CardDescription>
                  {announcement.image_url && (
                    <div className="mt-2">
                      <img
                        src={announcement.image_url || "/placeholder.svg"}
                        alt="Preview"
                        className="h-20 w-auto object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingAnnouncement(announcement)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => announcement.id && handleDelete(announcement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Switch checked={announcement.is_active} onCheckedChange={() => handleToggleActive(announcement)} />
                <Label>Активен</Label>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Показывать через: {announcement.show_delay / 1000}с | Скрывать через:{" "}
                {announcement.auto_hide_delay === 0 ? "вручную" : `${announcement.auto_hide_delay / 1000}с`}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingAnnouncement && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAnnouncement.id ? "Редактировать анонс" : "Новый анонс"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={languageTab} onValueChange={(v) => setLanguageTab(v as "ru" | "en" | "zh")}>
              <TabsList>
                <TabsTrigger value="ru">Русский</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="zh">中文</TabsTrigger>
              </TabsList>

              <TabsContent value="ru" className="space-y-4">
                <div className="space-y-2">
                  <Label>Заголовок (русский)</Label>
                  <Input
                    value={editingAnnouncement.title_ru}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        title_ru: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Содержание (русский)</Label>
                  <Textarea
                    value={editingAnnouncement.content_ru}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        content_ru: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Текст кнопки ссылки (русский)</Label>
                  <Input
                    value={editingAnnouncement.link_text_ru || ""}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        link_text_ru: e.target.value,
                      })
                    }
                    placeholder="Например: Подробнее"
                  />
                </div>
              </TabsContent>

              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input
                    value={editingAnnouncement.title_en}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        title_en: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content (English)</Label>
                  <Textarea
                    value={editingAnnouncement.content_en}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        content_en: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link Button Text (English)</Label>
                  <Input
                    value={editingAnnouncement.link_text_en || ""}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        link_text_en: e.target.value,
                      })
                    }
                    placeholder="E.g.: Learn More"
                  />
                </div>
              </TabsContent>

              <TabsContent value="zh" className="space-y-4">
                <div className="space-y-2">
                  <Label>标题 (中文)</Label>
                  <Input
                    value={editingAnnouncement.title_zh}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        title_zh: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>内容 (中文)</Label>
                  <Textarea
                    value={editingAnnouncement.content_zh}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        content_zh: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>链接按钮文本 (中文)</Label>
                  <Input
                    value={editingAnnouncement.link_text_zh || ""}
                    onChange={(e) =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        link_text_zh: e.target.value,
                      })
                    }
                    placeholder="例如：了解更多"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label>URL ссылки (одинаковый для всех языков)</Label>
              <Input
                value={editingAnnouncement.link_url || ""}
                onChange={(e) =>
                  setEditingAnnouncement({
                    ...editingAnnouncement,
                    link_url: e.target.value,
                  })
                }
                placeholder="https://example.com"
              />
              <p className="text-xs text-muted-foreground">Оставьте пустым если не нужна кнопка со ссылкой</p>
            </div>

            <div className="space-y-2">
              <Label>Изображение</Label>
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                  className="flex-1"
                />
                {isUploadingImage && <span className="text-sm text-muted-foreground">Загрузка...</span>}
              </div>
              {editingAnnouncement.image_url && (
                <div className="mt-2 relative">
                  <img
                    src={editingAnnouncement.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-40 object-cover rounded"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      setEditingAnnouncement({
                        ...editingAnnouncement,
                        image_url: undefined,
                      })
                    }
                  >
                    Удалить
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Задержка показа (мс)</Label>
                <Input
                  type="number"
                  value={editingAnnouncement.show_delay}
                  onChange={(e) =>
                    setEditingAnnouncement({
                      ...editingAnnouncement,
                      show_delay: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Авто-скрытие через (мс, 0 = вручную)</Label>
                <Input
                  type="number"
                  value={editingAnnouncement.auto_hide_delay}
                  onChange={(e) =>
                    setEditingAnnouncement({
                      ...editingAnnouncement,
                      auto_hide_delay: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingAnnouncement.is_active}
                onCheckedChange={(checked) =>
                  setEditingAnnouncement({
                    ...editingAnnouncement,
                    is_active: checked,
                  })
                }
              />
              <Label>Активен (только один может быть активным)</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>Сохранить</Button>
              <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
