"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

interface NewsItem {
  id: string
  title_ru: string
  title_en: string
  title_zh: string
  content_ru: string
  content_en: string
  content_zh: string
  excerpt_ru?: string
  excerpt_en?: string
  excerpt_zh?: string
  image_url?: string
  slug: string
  is_published: boolean
  published_at: string
}

export function AdminNewsManager() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<Partial<NewsItem> | null>(null)
  const [languageTab, setLanguageTab] = useState<"ru" | "en" | "zh">("ru")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const response = await fetch("/api/news")
    const data = await response.json()
    setNews(data.news || [])
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (data.url) {
        setEditingNews((prev) => ({ ...prev, image_url: data.url }))
        toast.success("Изображение загружено")
      }
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
      toast.error("Ошибка загрузки изображения")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveNews = async () => {
    if (!editingNews) return

    // Generate slug if new item
    if (!editingNews.id && !editingNews.slug) {
      const slug = editingNews.title_ru
        ?.toLowerCase()
        .replace(/[^a-zа-я0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      editingNews.slug = slug
    }

    // Set published_at if publishing
    if (editingNews.is_published && !editingNews.published_at) {
      editingNews.published_at = new Date().toISOString()
    }

    const method = editingNews.id ? "PUT" : "POST"
    const response = await fetch("/api/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingNews),
    })

    if (response.ok) {
      toast.success(editingNews.id ? "Новость обновлена" : "Новость создана")
      fetchNews()
      setIsDialogOpen(false)
      setEditingNews(null)
    } else {
      toast.error("Ошибка сохранения")
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Удалить новость?")) return

    const response = await fetch(`/api/news?id=${id}`, { method: "DELETE" })
    if (response.ok) {
      toast.success("Новость удалена")
      fetchNews()
    } else {
      toast.error("Ошибка удаления")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Управление новостями</h2>
        <Button
          onClick={() => {
            setEditingNews({
              title_ru: "",
              title_en: "",
              title_zh: "",
              content_ru: "",
              content_en: "",
              content_zh: "",
              is_published: false,
            })
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить новость
        </Button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle>{item.title_ru}</CardTitle>
                  <CardDescription>
                    {item.published_at && new Date(item.published_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingNews(item)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteNews(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Switch checked={item.is_published} disabled />
                <Label>{item.is_published ? "Опубликовано" : "Черновик"}</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingNews?.id ? "Редактировать новость" : "Новая новость"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Изображение</Label>
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                {editingNews?.image_url && (
                  <img
                    src={editingNews.image_url || "/placeholder.svg"}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <Tabs value={languageTab} onValueChange={(v) => setLanguageTab(v as "ru" | "en" | "zh")}>
              <TabsList>
                <TabsTrigger value="ru">Русский</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="zh">中文</TabsTrigger>
              </TabsList>

              <TabsContent value="ru" className="space-y-4">
                <div className="space-y-2">
                  <Label>Заголовок (RU)</Label>
                  <Input
                    value={editingNews?.title_ru || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, title_ru: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Краткое описание (RU)</Label>
                  <Textarea
                    value={editingNews?.excerpt_ru || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, excerpt_ru: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Содержание (RU)</Label>
                  <Textarea
                    value={editingNews?.content_ru || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, content_ru: e.target.value })}
                    rows={10}
                  />
                </div>
              </TabsContent>

              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label>Title (EN)</Label>
                  <Input
                    value={editingNews?.title_en || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, title_en: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Excerpt (EN)</Label>
                  <Textarea
                    value={editingNews?.excerpt_en || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, excerpt_en: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content (EN)</Label>
                  <Textarea
                    value={editingNews?.content_en || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, content_en: e.target.value })}
                    rows={10}
                  />
                </div>
              </TabsContent>

              <TabsContent value="zh" className="space-y-4">
                <div className="space-y-2">
                  <Label>标题 (ZH)</Label>
                  <Input
                    value={editingNews?.title_zh || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, title_zh: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>摘要 (ZH)</Label>
                  <Textarea
                    value={editingNews?.excerpt_zh || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, excerpt_zh: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>内容 (ZH)</Label>
                  <Textarea
                    value={editingNews?.content_zh || ""}
                    onChange={(e) => setEditingNews({ ...editingNews, content_zh: e.target.value })}
                    rows={10}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingNews?.is_published || false}
                onCheckedChange={(checked) => setEditingNews({ ...editingNews, is_published: checked })}
              />
              <Label>Опубликовать</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSaveNews}>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
