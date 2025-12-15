"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Upload, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

interface CarouselItem {
  id: string
  image_url: string
  caption_ru: string
  caption_en: string
  caption_zh: string
  order_index: number
  is_visible: boolean
  auto_slide_interval: number
}

export function AdminProductionCarousel() {
  const [items, setItems] = useState<CarouselItem[]>([])
  const [editingItem, setEditingItem] = useState<Partial<CarouselItem> | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploadingLang, setUploadingLang] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/production-carousel")
      const data = await res.json()
      setItems(data.items || [])
      console.log("[v0] Loaded production carousel items:", data.items?.length || 0)
    } catch (error) {
      console.error("[v0] Error loading production carousel:", error)
    }
  }

  const handleSave = async () => {
    if (!editingItem) return

    try {
      console.log("[v0] Saving carousel item:", editingItem)

      const method = editingItem.id ? "PUT" : "POST"
      const url = editingItem.id ? `/api/production-carousel/${editingItem.id}` : "/api/production-carousel"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      })

      if (res.ok) {
        const result = await res.json()
        console.log("[v0] Saved successfully:", result)

        setIsDialogOpen(false)
        setEditingItem(null)

        setTimeout(() => {
          fetchItems()
        }, 100)
      } else {
        console.error("[v0] Save failed:", await res.text())
      }
    } catch (error) {
      console.error("[v0] Error saving carousel item:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту фотографию?")) return

    try {
      const res = await fetch(`/api/production-carousel/${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        await fetchItems()
      }
    } catch (error) {
      console.error("[v0] Error deleting carousel item:", error)
    }
  }

  const handleUploadImage = async (file: File, lang: string) => {
    try {
      setUploadingLang(lang)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload-certificate", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.url) {
        setEditingItem((prev) => ({
          ...prev,
          image_url: data.url,
        }))
      }
    } catch (error) {
      console.error("[v0] Error uploading image:", error)
    } finally {
      setUploadingLang(null)
    }
  }

  const handleMoveUp = async (item: CarouselItem, index: number) => {
    if (index === 0) return

    const newItems = [...items]
    newItems[index] = items[index - 1]
    newItems[index - 1] = item

    // Update order_index
    await updateOrder(newItems)
  }

  const handleMoveDown = async (item: CarouselItem, index: number) => {
    if (index === items.length - 1) return

    const newItems = [...items]
    newItems[index] = items[index + 1]
    newItems[index + 1] = item

    // Update order_index
    await updateOrder(newItems)
  }

  const updateOrder = async (newItems: CarouselItem[]) => {
    try {
      const updates = newItems.map((item, idx) => ({
        ...item,
        order_index: idx + 1,
      }))

      await Promise.all(
        updates.map((item) =>
          fetch(`/api/production-carousel/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }),
        ),
      )

      console.log("[v0] Order updated successfully")

      setTimeout(() => {
        fetchItems()
      }, 100)
    } catch (error) {
      console.error("[v0] Error updating order:", error)
    }
  }

  const handleToggleVisibility = async (item: CarouselItem) => {
    try {
      console.log("[v0] Toggling visibility for:", item.id, !item.is_visible)

      const res = await fetch(`/api/production-carousel/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_visible: !item.is_visible }),
      })

      if (res.ok) {
        console.log("[v0] Visibility toggled successfully")
        setTimeout(() => {
          fetchItems()
        }, 100)
      }
    } catch (error) {
      console.error("[v0] Error toggling visibility:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Управление каруселью производства</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Управляйте фотографиями, подписями и порядком отображения в карусели
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingItem({
              image_url: "",
              caption_ru: "",
              caption_en: "",
              caption_zh: "",
              order_index: items.length + 1,
              is_visible: true,
              auto_slide_interval: 3000,
            })
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить фото
        </Button>
      </div>

      <div className="grid gap-4">
        {items.map((item, index) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4 flex-1">
                  {item.image_url && (
                    <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.caption_ru}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{item.caption_ru}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      Порядок: {item.order_index} • Интервал: {item.auto_slide_interval}мс
                      {!item.is_visible && <span className="text-destructive">• Скрыто</span>}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => handleMoveUp(item, index)} disabled={index === 0}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleMoveDown(item, index)}
                    disabled={index === items.length - 1}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleVisibility(item)}
                    title={item.is_visible ? "Скрыть" : "Показать"}
                  >
                    {item.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingItem(item)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? "Редактировать фото" : "Добавить фото"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Изображение</Label>
              <div className="flex gap-2">
                <Input
                  value={editingItem?.image_url || ""}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="URL изображения"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "image/*"
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) handleUploadImage(file, "image")
                    }
                    input.click()
                  }}
                  disabled={!!uploadingLang}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingLang === "image" ? "Загрузка..." : "Загрузить"}
                </Button>
              </div>
              {editingItem?.image_url && (
                <div className="relative w-full h-48 rounded overflow-hidden mt-2">
                  <Image
                    src={editingItem.image_url || "/placeholder.svg"}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Captions in multiple languages */}
            <Tabs defaultValue="ru">
              <TabsList>
                <TabsTrigger value="ru">Русский</TabsTrigger>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="zh">中文</TabsTrigger>
              </TabsList>

              <TabsContent value="ru" className="space-y-4">
                <div className="space-y-2">
                  <Label>Подпись (Русский)</Label>
                  <Input
                    value={editingItem?.caption_ru || ""}
                    onChange={(e) => setEditingItem((prev) => ({ ...prev, caption_ru: e.target.value }))}
                    placeholder="Описание фотографии"
                  />
                </div>
              </TabsContent>

              <TabsContent value="en" className="space-y-4">
                <div className="space-y-2">
                  <Label>Caption (English)</Label>
                  <Input
                    value={editingItem?.caption_en || ""}
                    onChange={(e) => setEditingItem((prev) => ({ ...prev, caption_en: e.target.value }))}
                    placeholder="Photo description"
                  />
                </div>
              </TabsContent>

              <TabsContent value="zh" className="space-y-4">
                <div className="space-y-2">
                  <Label>标题 (中文)</Label>
                  <Input
                    value={editingItem?.caption_zh || ""}
                    onChange={(e) => setEditingItem((prev) => ({ ...prev, caption_zh: e.target.value }))}
                    placeholder="照片说明"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Порядок</Label>
                <Input
                  type="number"
                  value={editingItem?.order_index || 0}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, order_index: Number(e.target.value) }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Интервал автопрокрутки (мс)</Label>
                <Input
                  type="number"
                  value={editingItem?.auto_slide_interval || 3000}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, auto_slide_interval: Number(e.target.value) }))}
                  placeholder="3000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={editingItem?.is_visible !== false}
                onCheckedChange={(checked) => setEditingItem((prev) => ({ ...prev, is_visible: checked }))}
              />
              <Label>Показывать на сайте</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
