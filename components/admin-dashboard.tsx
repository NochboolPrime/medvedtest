"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { LogOut, Plus, Edit, Trash2, Save, X, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminStatistics } from "@/components/admin-statistics"
import { AdminInstructions } from "@/components/admin-instructions"
import { AdminContentManager } from "@/components/admin-content-manager"
import { AdminAnnouncements } from "@/components/admin-announcements"
import { AdminProductionCarousel } from "@/components/admin-production-carousel"
import { AdminHeroBanner } from "@/components/admin-hero-banner"
import { AdminNewsManager } from "@/components/admin-news-manager"
import { NewsToggleSetting } from "@/components/news-toggle-setting"
import { YandexMetrikaSettings } from "@/components/yandex-metrika-settings"

interface Product {
  id: string
  title: string
  description: string
  slug: string
  category: string
  price: number
  image: string
  gallery: string[]
  features: string[]
  full_description: string
  specifications: Array<{ label: string; value: string }>
  advantages: string[]
  applications: string[]
  show_on_homepage: boolean
  title_en?: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  full_description_en?: string
  full_description_zh?: string
  features_en?: string[]
  features_zh?: string[]
  advantages_en?: string[]
  advantages_zh?: string[]
  applications_en?: string[]
  applications_zh?: string[]
  specifications_en?: Array<{ label: string; value: string }>
  specifications_zh?: Array<{ label: string; value: string }>
  video_url?: string
  specification_pdf_url?: string
}

export function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [previewPdf, setPreviewPdf] = useState("")

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error("[v0] Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  const handleSetPassword = async () => {
    if (!newPassword) return

    try {
      await fetch("/api/admin/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      })
      setNewPassword("")
      alert("Пароль успешно установлен")
    } catch (error) {
      console.error("[v0] Error setting password:", error)
      alert("Ошибка установки пароля")
    }
  }

  const handleSaveProduct = async (product: Product) => {
    try {
      const method = product.id ? "PUT" : "POST"
      await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })

      await loadProducts()
      setEditingProduct(null)
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error saving product:", error)
      alert("Ошибка сохранения товара")
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Удалить товар?")) return

    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      await loadProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Ошибка удаления товара")
    }
  }

  const handleToggleHomepage = async (product: Product) => {
    const homepageProducts = products.filter((p) => p.show_on_homepage)

    if (!product.show_on_homepage && homepageProducts.length >= 4) {
      alert("Максимум 4 товара могут отображаться на главной странице")
      return
    }

    const updated = { ...product, show_on_homepage: !product.show_on_homepage }
    await handleSaveProduct(updated)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Админ-панель</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Выход
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Товары</TabsTrigger>
            <TabsTrigger value="content">Контент сайта</TabsTrigger>
            <TabsTrigger value="production">Производство</TabsTrigger>
            <TabsTrigger value="hero">Главный баннер</TabsTrigger>
            <TabsTrigger value="announcements">Анонсы</TabsTrigger>
            <TabsTrigger value="news">Новости</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
            <TabsTrigger value="instructions">Инструкция</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Управление товарами</h2>
              <Button
                onClick={() => {
                  setEditingProduct({} as Product)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Добавить товар
              </Button>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(product)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.show_on_homepage}
                        onCheckedChange={() => handleToggleHomepage(product)}
                      />
                      <Label>Показывать на главной странице</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content">
            <AdminContentManager />
          </TabsContent>

          <TabsContent value="production">
            <AdminProductionCarousel />
          </TabsContent>

          <TabsContent value="hero">
            <AdminHeroBanner />
          </TabsContent>

          <TabsContent value="announcements">
            <AdminAnnouncements />
          </TabsContent>

          <TabsContent value="news">
            <AdminNewsManager />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <YandexMetrikaSettings />
          </TabsContent>

          <TabsContent value="statistics">
            <AdminStatistics />
          </TabsContent>

          <TabsContent value="instructions">
            <AdminInstructions />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <NewsToggleSetting />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct?.id ? "Редактировать товар" : "Добавить товар"}</DialogTitle>
            <DialogDescription>Заполните все поля для товара</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setEditingProduct(null)
                setIsDialogOpen(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product
  onSave: (product: Product) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(product)
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(formData.image || "")
  const [languageTab, setLanguageTab] = useState<"ru" | "en" | "zh">("ru")
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [previewPdf, setPreviewPdf] = useState("")

  const handleArrayInput = (field: keyof Product, value: string) => {
    setFormData({ ...formData, [field]: value.split("\n").filter((v) => v.trim()) })
  }

  const handleSpecificationsInput = (value: string, lang?: "en" | "zh") => {
    try {
      const lines = value.split("\n").filter((v) => v.trim())
      const specs = lines.map((line) => {
        const [label, ...valueParts] = line.split(":")
        return {
          label: label.trim(),
          value: valueParts.join(":").trim(),
        }
      })

      const field = lang === "en" ? "specifications_en" : lang === "zh" ? "specifications_zh" : "specifications"
      setFormData({ ...formData, [field]: specs })
    } catch (e) {
      console.error("[v0] Error parsing specifications:", e)
    }
  }

  const formatSpecifications = (specs?: Array<{ label: string; value: string }>) => {
    if (!specs || specs.length === 0) return ""
    return specs.map((spec) => `${spec.label}: ${spec.value}`).join("\n")
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }))
        setPreviewImage(data.url)
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Ошибка загрузки изображения")
    } finally {
      setUploading(false)
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPdf(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setFormData((prev) => ({ ...prev, specification_pdf_url: data.url }))
        setPreviewPdf(data.url)
      }
    } catch (error) {
      console.error("Error uploading PDF:", error)
      alert("Ошибка загрузки PDF")
    } finally {
      setUploadingPdf(false)
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={languageTab} onValueChange={(v) => setLanguageTab(v as "ru" | "en" | "zh")}>
        <TabsList>
          <TabsTrigger value="ru">Русский</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="zh">中文</TabsTrigger>
        </TabsList>

        <TabsContent value="ru" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Название</Label>
              <Input
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input value={formData.slug || ""} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Краткое описание</Label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Полное описание</Label>
            <Textarea
              value={formData.full_description || ""}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Ключевые особенности (по одной на строке)</Label>
            <Textarea
              value={formData.features?.join("\n") || ""}
              onChange={(e) => handleArrayInput("features", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Преимущества (по одному на строке)</Label>
            <Textarea
              value={formData.advantages?.join("\n") || ""}
              onChange={(e) => handleArrayInput("advantages", e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Области применения (по одной на строке)</Label>
            <Textarea
              value={formData.applications?.join("\n") || ""}
              onChange={(e) => handleArrayInput("applications", e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Технические характеристики (формат: Название: Значение, по одной на строке)</Label>
            <Textarea
              value={formatSpecifications(formData.specifications)}
              onChange={(e) => handleSpecificationsInput(e.target.value)}
              rows={6}
              placeholder="Максимальное давление: 70 МПа&#10;Производительность: До 2500 л/мин"
            />
          </div>
        </TabsContent>

        <TabsContent value="en" className="space-y-4">
          <div className="space-y-2">
            <Label>Title (English)</Label>
            <Input
              value={formData.title_en || ""}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Short Description (English)</Label>
            <Textarea
              value={formData.description_en || ""}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Full Description (English)</Label>
            <Textarea
              value={formData.full_description_en || ""}
              onChange={(e) => setFormData({ ...formData, full_description_en: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Key Features (one per line)</Label>
            <Textarea
              value={formData.features_en?.join("\n") || ""}
              onChange={(e) => handleArrayInput("features_en", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Advantages (one per line)</Label>
            <Textarea
              value={formData.advantages_en?.join("\n") || ""}
              onChange={(e) => handleArrayInput("advantages_en", e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Applications (one per line)</Label>
            <Textarea
              value={formData.applications_en?.join("\n") || ""}
              onChange={(e) => handleArrayInput("applications_en", e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>Technical Specifications (format: Name: Value, one per line)</Label>
            <Textarea
              value={formatSpecifications(formData.specifications_en)}
              onChange={(e) => handleSpecificationsInput(e.target.value, "en")}
              rows={6}
              placeholder="Maximum Pressure: 70 MPa&#10;Capacity: Up to 2500 l/min"
            />
          </div>
        </TabsContent>

        <TabsContent value="zh" className="space-y-4">
          <div className="space-y-2">
            <Label>标题 (Chinese)</Label>
            <Input
              value={formData.title_zh || ""}
              onChange={(e) => setFormData({ ...formData, title_zh: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>简短描述 (Chinese)</Label>
            <Textarea
              value={formData.description_zh || ""}
              onChange={(e) => setFormData({ ...formData, description_zh: e.target.value })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>完整描述 (Chinese)</Label>
            <Textarea
              value={formData.full_description_zh || ""}
              onChange={(e) => setFormData({ ...formData, full_description_zh: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>关键特性 (每行一个)</Label>
            <Textarea
              value={formData.features_zh?.join("\n") || ""}
              onChange={(e) => handleArrayInput("features_zh", e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>优势 (每行一个)</Label>
            <Textarea
              value={formData.advantages_zh?.join("\n") || ""}
              onChange={(e) => handleArrayInput("advantages_zh", e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>应用领域 (每行一个)</Label>
            <Textarea
              value={formData.applications_zh?.join("\n") || ""}
              onChange={(e) => handleArrayInput("applications_zh", e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label>技术规格 (格式: 名称: 值，每行一个)</Label>
            <Textarea
              value={formatSpecifications(formData.specifications_zh)}
              onChange={(e) => handleSpecificationsInput(e.target.value, "zh")}
              rows={6}
              placeholder="最大压力: 70 兆帕&#10;生产能力: 高达 2500 升/分钟"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Категория</Label>
          <Input
            value={formData.category || ""}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Цена (руб)</Label>
          <Input
            type="number"
            value={formData.price || 0}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Изображение</Label>
        <div className="space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="cursor-pointer"
          />
          {uploading && <p className="text-sm text-muted-foreground">Загрузка...</p>}
          {previewImage && (
            <div className="relative w-full h-48 rounded-md overflow-hidden border">
              <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <Input
            placeholder="Или введите URL изображения"
            value={formData.image || ""}
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.value })
              setPreviewImage(e.target.value)
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Видео (Rutube)</Label>
        <Input
          placeholder="Вставьте ссылку на видео с Rutube (например: https://rutube.ru/video/...)"
          value={formData.video_url || ""}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Вставьте полную ссылку на видео с Rutube. Видео будет отображаться на странице товара.
        </p>
      </div>

      <div className="space-y-2">
        <Label>PDF Спецификация</Label>
        <div className="space-y-2">
          <Input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            disabled={uploadingPdf}
            className="cursor-pointer"
          />
          {uploadingPdf && <p className="text-sm text-muted-foreground">Загрузка PDF...</p>}
          {previewPdf && (
            <div className="flex items-center gap-2 p-2 border rounded-md">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <a
                href={previewPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline flex-1 truncate"
              >
                {previewPdf}
              </a>
            </div>
          )}
          <Input
            placeholder="Или введите URL PDF файла"
            value={formData.specification_pdf_url || ""}
            onChange={(e) => {
              setFormData({ ...formData, specification_pdf_url: e.target.value })
              setPreviewPdf(e.target.value)
            }}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          Отмена
        </Button>
        <Button onClick={() => onSave(formData)}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </div>
    </div>
  )
}
