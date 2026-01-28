"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Upload, X, FileText, ImageIcon } from "lucide-react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"

interface Certificate {
  id: string
  title: string
  title_en: string
  title_zh: string
  description: string
  description_en: string
  description_zh: string
  main_image: string
  gallery: string[]
  pdf_url: string
  sort_order: number
  is_active: boolean
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    loadCertificates()
  }, [])

  const loadCertificates = async () => {
    try {
      const response = await fetch("/api/certificates")
      const data = await response.json()
      setCertificates(data)
    } catch (error) {
      console.error("Error loading certificates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (certificate: Certificate) => {
    try {
      const method = certificate.id ? "PUT" : "POST"
      const response = await fetch("/api/certificates", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificate),
      })

      if (response.ok) {
        await loadCertificates()
        setEditingCertificate(null)
        setIsDialogOpen(false)
        alert("Сертификат сохранен")
      } else {
        const error = await response.json()
        alert(`Ошибка: ${error.error}`)
      }
    } catch (error) {
      console.error("Error saving certificate:", error)
      alert("Ошибка сохранения")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить сертификат?")) return

    try {
      const response = await fetch(`/api/certificates?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        await loadCertificates()
      } else {
        alert("Ошибка удаления")
      }
    } catch (error) {
      console.error("Error deleting certificate:", error)
      alert("Ошибка удаления")
    }
  }

  const createNewCertificate = (): Certificate => ({
    id: "",
    title: "",
    title_en: "",
    title_zh: "",
    description: "",
    description_en: "",
    description_zh: "",
    main_image: "",
    gallery: [],
    pdf_url: "",
    sort_order: certificates.length,
    is_active: true,
  })

  if (loading) {
    return <div className="p-4">Загрузка...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Управление сертификатами</h2>
        <Button
          onClick={() => {
            setEditingCertificate(createNewCertificate())
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Добавить сертификат
        </Button>
      </div>

      <div className="grid gap-4">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  {cert.main_image && (
                    <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={cert.main_image || "/placeholder.svg"}
                        alt={cert.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <CardTitle>{cert.title || "Без названия"}</CardTitle>
                    <CardDescription>{cert.description}</CardDescription>
                    <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                      {cert.gallery.length > 0 && (
                        <span className="flex items-center gap-1">
                          <ImageIcon className="h-4 w-4" />
                          {cert.gallery.length + 1} фото
                        </span>
                      )}
                      {cert.pdf_url && (
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          PDF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCertificate(cert)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(cert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Switch checked={cert.is_active} disabled />
                <Label>Активен</Label>
              </div>
            </CardContent>
          </Card>
        ))}

        {certificates.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Нет сертификатов. Нажмите "Добавить сертификат" чтобы создать первый.
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCertificate?.id ? "Редактировать сертификат" : "Добавить сертификат"}
            </DialogTitle>
            <DialogDescription>
              Заполните информацию о сертификате
            </DialogDescription>
          </DialogHeader>
          {editingCertificate && (
            <CertificateForm
              certificate={editingCertificate}
              onSave={handleSave}
              onCancel={() => {
                setEditingCertificate(null)
                setIsDialogOpen(false)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CertificateForm({
  certificate,
  onSave,
  onCancel,
}: {
  certificate: Certificate
  onSave: (certificate: Certificate) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Certificate>(certificate)
  const [uploading, setUploading] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [uploadingPdf, setUploadingPdf] = useState(false)
  const [languageTab, setLanguageTab] = useState<"ru" | "en" | "zh">("ru")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "gallery") => {
    const file = e.target.files?.[0]
    if (!file) return

    const supabase = getSupabaseClient()
    if (!supabase) {
      alert("Supabase не настроен")
      return
    }

    if (type === "main") {
      setUploading(true)
    } else {
      setUploadingGallery(true)
    }

    try {
      const fileName = `cert-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split(".").pop()}`

      const { data, error } = await supabase.storage
        .from("certificates")
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        alert(`Ошибка загрузки: ${error.message}`)
        return
      }

      const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(data.path)

      if (type === "main") {
        setFormData((prev) => ({ ...prev, main_image: urlData.publicUrl }))
      } else {
        setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, urlData.publicUrl] }))
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Ошибка загрузки изображения")
    } finally {
      if (type === "main") {
        setUploading(false)
      } else {
        setUploadingGallery(false)
      }
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Выберите PDF файл")
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      alert("Supabase не настроен")
      return
    }

    setUploadingPdf(true)

    try {
      const fileName = `cert-pdf-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`

      const { data, error } = await supabase.storage
        .from("certificates")
        .upload(fileName, file, {
          contentType: "application/pdf",
          upsert: false,
        })

      if (error) {
        alert(`Ошибка загрузки: ${error.message}`)
        return
      }

      const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(data.path)
      setFormData((prev) => ({ ...prev, pdf_url: urlData.publicUrl }))
    } catch (error) {
      console.error("Error uploading PDF:", error)
      alert("Ошибка загрузки PDF")
    } finally {
      setUploadingPdf(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      <Tabs value={languageTab} onValueChange={(v) => setLanguageTab(v as "ru" | "en" | "zh")}>
        <TabsList>
          <TabsTrigger value="ru">Русский</TabsTrigger>
          <TabsTrigger value="en">English</TabsTrigger>
          <TabsTrigger value="zh">中文</TabsTrigger>
        </TabsList>

        <TabsContent value="ru" className="space-y-4">
          <div className="space-y-2">
            <Label>Название</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="ISO 9001:2015"
            />
          </div>
          <div className="space-y-2">
            <Label>Описание</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Система менеджмента качества"
            />
          </div>
        </TabsContent>

        <TabsContent value="en" className="space-y-4">
          <div className="space-y-2">
            <Label>Title (English)</Label>
            <Input
              value={formData.title_en}
              onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              placeholder="ISO 9001:2015"
            />
          </div>
          <div className="space-y-2">
            <Label>Description (English)</Label>
            <Textarea
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              rows={3}
              placeholder="Quality Management System"
            />
          </div>
        </TabsContent>

        <TabsContent value="zh" className="space-y-4">
          <div className="space-y-2">
            <Label>标题 (Chinese)</Label>
            <Input
              value={formData.title_zh}
              onChange={(e) => setFormData({ ...formData, title_zh: e.target.value })}
              placeholder="ISO 9001:2015"
            />
          </div>
          <div className="space-y-2">
            <Label>描述 (Chinese)</Label>
            <Textarea
              value={formData.description_zh}
              onChange={(e) => setFormData({ ...formData, description_zh: e.target.value })}
              rows={3}
              placeholder="质量管理体系"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Main Image */}
      <div className="space-y-2">
        <Label>Титульное изображение</Label>
        <div className="flex gap-4 items-start">
          {formData.main_image && (
            <div className="relative w-32 h-44 overflow-hidden rounded border">
              <Image
                src={formData.main_image || "/placeholder.svg"}
                alt="Main"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, main_image: "" })}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "main")}
              disabled={uploading}
              className="w-auto"
            />
            {uploading && <p className="text-sm text-muted-foreground mt-1">Загрузка...</p>}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-2">
        <Label>Дополнительные изображения (галерея)</Label>
        <div className="flex flex-wrap gap-4">
          {formData.gallery.map((img, index) => (
            <div key={index} className="relative w-24 h-32 overflow-hidden rounded border">
              <Image
                src={img || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <div className="flex items-center">
            <label className="cursor-pointer flex flex-col items-center justify-center w-24 h-32 border-2 border-dashed rounded hover:bg-muted transition-colors">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mt-1">Добавить</span>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "gallery")}
                disabled={uploadingGallery}
                className="hidden"
              />
            </label>
          </div>
        </div>
        {uploadingGallery && <p className="text-sm text-muted-foreground">Загрузка...</p>}
      </div>

      {/* PDF */}
      <div className="space-y-2">
        <Label>PDF версия сертификата</Label>
        <div className="flex gap-4 items-center">
          {formData.pdf_url && (
            <div className="flex items-center gap-2 p-2 bg-muted rounded">
              <FileText className="h-5 w-5" />
              <a
                href={formData.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Открыть PDF
              </a>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pdf_url: "" })}
                className="text-destructive hover:text-destructive/80"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          <div>
            <Input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              disabled={uploadingPdf}
              className="w-auto"
            />
            {uploadingPdf && <p className="text-sm text-muted-foreground mt-1">Загрузка...</p>}
          </div>
        </div>
      </div>

      {/* Sort Order & Active */}
      <div className="flex gap-6">
        <div className="space-y-2">
          <Label>Порядок сортировки</Label>
          <Input
            type="number"
            value={formData.sort_order}
            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
            className="w-24"
          />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Label>Активен</Label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={() => onSave(formData)}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
