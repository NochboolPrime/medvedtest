"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function getSupabaseStorageClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createSupabaseClient(url, key)
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, Trash2, Eye, EyeOff, Plus, Upload } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import React from "react"

interface ContentItem {
  id: number
  section: string
  key: string
  content_type: string
  value_ru: string | null
  value_en: string | null
  value_zh: string | null
  metadata: any
  visible: boolean
  is_template: boolean
}

export function AdminContentManager() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([])
  const [selectedSection, setSelectedSection] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [uploading, setUploading] = React.useState<string | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  const sections = ["hero", "about", "services", "excellence", "contact", "footer", "certificates"]

  const sectionTranslations: Record<string, string> = {
    hero: "Главная секция",
    about: "О компании",
    services: "Услуги",
    excellence: "Превосходство",
    contact: "Контакты",
    footer: "Подвал",
    certificates: "Сертификаты",
  }

  useEffect(() => {
    loadContent()
  }, [])

  useEffect(() => {
    if (selectedSection === "all") {
      setFilteredContent(content)
    } else {
      setFilteredContent(content.filter((item) => item.section === selectedSection))
    }
  }, [selectedSection, content])

  async function loadContent() {
    try {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section", { ascending: true })
        .order("metadata->order", { ascending: true })

      if (error) throw error

      setContent(data || [])
    } catch (error) {
      console.error("Error loading content:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить контент",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(item: ContentItem) {
    setSaving(true)
    try {
      const { error } = await supabase
        .from("site_content")
        .update({
          value_ru: item.value_ru,
          value_en: item.value_en,
          value_zh: item.value_zh,
        })
        .eq("id", item.id)

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Контент обновлен",
      })

      await loadContent()
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить изменения",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleVisibility(item: ContentItem) {
    try {
      const { error } = await supabase.from("site_content").update({ visible: !item.visible }).eq("id", item.id)

      if (error) throw error

      toast({
        title: "Успешно",
        description: item.visible ? "Элемент скрыт" : "Элемент показан",
      })

      await loadContent()
    } catch (error) {
      console.error("Error toggling visibility:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось изменить видимость",
        variant: "destructive",
      })
    }
  }

  async function handleDuplicate(item: ContentItem) {
    try {
      const baseKey = item.key.replace(/\d+/, "")
      const sameKeyItems = content.filter((i) => i.section === item.section && i.key.startsWith(baseKey))
      const numbers = sameKeyItems
        .map((i) => {
          const match = i.key.match(/\d+/)
          return match ? Number.parseInt(match[0]) : 0
        })
        .filter((n) => !isNaN(n))
      const nextNumber = Math.max(...numbers, 0) + 1
      const newKey = baseKey + nextNumber

      const { error } = await supabase.from("site_content").insert({
        section: item.section,
        key: newKey,
        content_type: item.content_type,
        value_ru: item.value_ru,
        value_en: item.value_en,
        value_zh: item.value_zh,
        metadata: { ...item.metadata, order: nextNumber },
        visible: true,
        is_template: false,
      })

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Элемент добавлен",
      })

      await loadContent()
    } catch (error) {
      console.error("Error duplicating item:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось добавить элемент",
        variant: "destructive",
      })
    }
  }

  async function handleDelete(id: number) {
    try {
      const { error } = await supabase.from("site_content").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Успешно",
        description: "Элемент удален",
      })

      await loadContent()
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось удалить элемент",
        variant: "destructive",
      })
    } finally {
      setDeleteId(null)
    }
  }

  function updateContent(id: number, lang: "ru" | "en" | "zh", value: string) {
    setContent((prev) => prev.map((item) => (item.id === id ? { ...item, [`value_${lang}`]: value } : item)))
  }

  async function handleAddNew(section: string, template: "service" | "principle" | "strategy" | "certificate") {
    try {
      const sectionItems = content.filter((i) => i.section === section)
      const maxOrder = Math.max(...sectionItems.map((i) => (i.metadata?.order ? Number(i.metadata.order) : 0)), 0)
      const nextNumber = maxOrder + 1

      console.log("Adding new item:", { section, template, nextNumber, maxOrder })

      let newItems: any[] = []

      if (template === "service") {
        newItems = [
          {
            section,
            key: `service${nextNumber}Title`,
            content_type: "text",
            value_ru: `Новая услуга ${nextNumber}`,
            value_en: `New Service ${nextNumber}`,
            value_zh: `新服务 ${nextNumber}`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
          {
            section,
            key: `service${nextNumber}Description`,
            content_type: "text",
            value_ru: `Описание новой услуги ${nextNumber}`,
            value_en: `New service ${nextNumber} description`,
            value_zh: `新服务 ${nextNumber} 说明`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
        ]
      } else if (template === "principle") {
        newItems = [
          {
            section,
            key: `principle${nextNumber}Title`,
            content_type: "text",
            value_ru: `Новый принцип ${nextNumber}`,
            value_en: `New Principle ${nextNumber}`,
            value_zh: `新原则 ${nextNumber}`,
            metadata: { order: nextNumber, icon: "CheckCircle2" },
            visible: true,
            is_template: false,
          },
          {
            section,
            key: `principle${nextNumber}Description`,
            content_type: "text",
            value_ru: `Описание нового принципа ${nextNumber}`,
            value_en: `New principle ${nextNumber} description`,
            value_zh: `新原则 ${nextNumber} 说明`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
        ]
      } else if (template === "strategy") {
        newItems = [
          {
            section: "about",
            key: `strategy${nextNumber}`,
            content_type: "text",
            value_ru: `Новая стратегия развития ${nextNumber}`,
            value_en: `New development strategy ${nextNumber}`,
            value_zh: `新发展战略 ${nextNumber}`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
        ]
      } else if (template === "certificate") {
        newItems = [
          {
            section: "certificates",
            key: `certificate${nextNumber}Title`,
            content_type: "text",
            value_ru: `Новый сертификат ${nextNumber}`,
            value_en: `New Certificate ${nextNumber}`,
            value_zh: `新证书 ${nextNumber}`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
          {
            section: "certificates",
            key: `certificate${nextNumber}Description`,
            content_type: "text",
            value_ru: `Описание нового сертификата ${nextNumber}`,
            value_en: `New certificate ${nextNumber} description`,
            value_zh: `新证书 ${nextNumber} 说明`,
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
          {
            section: "certificates",
            key: `certificate${nextNumber}Image`,
            content_type: "image",
            value_ru: "/placeholder.svg?height=400&width=300",
            value_en: "/placeholder.svg?height=400&width=300",
            value_zh: "/placeholder.svg?height=400&width=300",
            metadata: { order: nextNumber },
            visible: true,
            is_template: false,
          },
        ]
      }

      const { error } = await supabase.from("site_content").insert(newItems)

      if (error) {
        console.error("Insert error:", error)
        throw error
      }

      toast({
        title: "Успешно",
        description: "Новый элемент добавлен",
      })

      await loadContent()
    } catch (error) {
      console.error("Error adding new item:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось добавить элемент",
        variant: "destructive",
      })
    }
  }

  async function handleImageUpload(
    itemId: string,
    lang: "ru" | "en" | "zh",
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
        variant: "destructive",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 10MB",
        variant: "destructive",
      })
      return
    }

    const storageClient = getSupabaseStorageClient()
    if (!storageClient) {
      toast({
        title: "Ошибка",
        description: "Supabase не настроен",
        variant: "destructive",
      })
      return
    }

    setUploading(itemId)
    try {
      // Generate unique filename
      const ext = file.name.split(".").pop() || "jpg"
      const fileName = `content-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

      // Upload directly to Supabase Storage
      const { data, error } = await storageClient.storage
        .from("images")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        throw new Error(error.message)
      }

      // Get public URL
      const { data: urlData } = storageClient.storage.from("images").getPublicUrl(data.path)

      if (urlData.publicUrl) {
        updateContent(itemId, lang, urlData.publicUrl)
        toast({
          title: "Успешно",
          description: "Изображение загружено",
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображение",
        variant: "destructive",
      })
    } finally {
      setUploading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Управление контентом сайта</h2>
          <p className="text-sm text-muted-foreground">Редактируйте текст на всех страницах сайта</p>
        </div>
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Выберите раздел" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все разделы</SelectItem>
            {sections.map((section) => (
              <SelectItem key={section} value={section}>
                {sectionTranslations[section] || section}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button onClick={() => handleAddNew("services", "service")} variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Добавить услугу
        </Button>
        <Button onClick={() => handleAddNew("excellence", "principle")} variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Добавить принцип
        </Button>
        <Button onClick={() => handleAddNew("about", "strategy")} variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Добавить стратегию
        </Button>
        <Button onClick={() => handleAddNew("certificates", "certificate")} variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Добавить сертификат
        </Button>
      </div>

      <div className="grid gap-6">
        {filteredContent.map((item) => (
          <Card key={item.id} className={!item.visible ? "opacity-50" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {item.section} / {item.key}
                    {!item.visible && <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </CardTitle>
                  <CardDescription>Тип: {item.content_type}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`visible-${item.id}`} className="text-sm cursor-pointer">
                      {item.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Label>
                    <Switch
                      id={`visible-${item.id}`}
                      checked={item.visible}
                      onCheckedChange={() => handleToggleVisibility(item)}
                    />
                  </div>
                  {!item.is_template &&
                    (() => {
                      const match = item.key.match(/(\d+)/)
                      const number = match ? Number.parseInt(match[1]) : 0
                      return number > 4
                    })() && (
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ru" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="ru">Русский</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="zh">中文</TabsTrigger>
                </TabsList>

                <TabsContent value="ru" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Текст на русском</Label>
                    {item.key.includes("Image") ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={item.value_ru || ""}
                            onChange={(e) => updateContent(item.id, "ru", e.target.value)}
                            placeholder="URL изображения"
                          />
                          <label htmlFor={`upload-ru-${item.id}`}>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={uploading === item.id.toString()}
                              asChild
                            >
                              <span className="cursor-pointer">
                                <Upload className="h-4 w-4" />
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`upload-ru-${item.id}`}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handleImageUpload(item.id.toString(), "ru", e)}
                          />
                        </div>
                        {item.value_ru && (
                          <div className="relative w-48 h-64 border rounded overflow-hidden">
                            <img
                              src={item.value_ru || "/placeholder.svg"}
                              alt="Preview"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    ) : item.content_type === "text" && item.value_ru && item.value_ru.length < 100 ? (
                      <Input
                        value={item.value_ru || ""}
                        onChange={(e) => updateContent(item.id, "ru", e.target.value)}
                      />
                    ) : (
                      <Textarea
                        value={item.value_ru || ""}
                        onChange={(e) => updateContent(item.id, "ru", e.target.value)}
                        rows={4}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text in English</Label>
                    {item.key.includes("Image") ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={item.value_en || ""}
                            onChange={(e) => updateContent(item.id, "en", e.target.value)}
                            placeholder="Image URL"
                          />
                          <label htmlFor={`upload-en-${item.id}`}>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={uploading === item.id.toString()}
                              asChild
                            >
                              <span className="cursor-pointer">
                                <Upload className="h-4 w-4" />
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`upload-en-${item.id}`}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handleImageUpload(item.id.toString(), "en", e)}
                          />
                        </div>
                        {item.value_en && (
                          <div className="relative w-48 h-64 border rounded overflow-hidden">
                            <img
                              src={item.value_en || "/placeholder.svg"}
                              alt="Preview"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    ) : item.content_type === "text" && item.value_en && item.value_en.length < 100 ? (
                      <Input
                        value={item.value_en || ""}
                        onChange={(e) => updateContent(item.id, "en", e.target.value)}
                      />
                    ) : (
                      <Textarea
                        value={item.value_en || ""}
                        onChange={(e) => updateContent(item.id, "en", e.target.value)}
                        rows={4}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="zh" className="space-y-4">
                  <div className="space-y-2">
                    <Label>中文文字</Label>
                    {item.key.includes("Image") ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            value={item.value_zh || ""}
                            onChange={(e) => updateContent(item.id, "zh", e.target.value)}
                            placeholder="图片网址"
                          />
                          <label htmlFor={`upload-zh-${item.id}`}>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={uploading === item.id.toString()}
                              asChild
                            >
                              <span className="cursor-pointer">
                                <Upload className="h-4 w-4" />
                              </span>
                            </Button>
                          </label>
                          <input
                            id={`upload-zh-${item.id}`}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => handleImageUpload(item.id.toString(), "zh", e)}
                          />
                        </div>
                        {item.value_zh && (
                          <div className="relative w-48 h-64 border rounded overflow-hidden">
                            <img
                              src={item.value_zh || "/placeholder.svg"}
                              alt="Preview"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    ) : item.content_type === "text" && item.value_zh && item.value_zh.length < 100 ? (
                      <Input
                        value={item.value_zh || ""}
                        onChange={(e) => updateContent(item.id, "zh", e.target.value)}
                      />
                    ) : (
                      <Textarea
                        value={item.value_zh || ""}
                        onChange={(e) => updateContent(item.id, "zh", e.target.value)}
                        rows={4}
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                <Button onClick={() => handleSave(item)} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить элемент?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Элемент будет удален навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
