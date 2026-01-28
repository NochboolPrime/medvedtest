"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, ExternalLink, Save, Loader2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

interface CatalogPdfData {
  pdf_url: string
  title: string
  title_en: string
  title_zh: string
}

// Create Supabase client for direct uploads
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export function AdminCatalogPdf() {
  const [data, setData] = useState<CatalogPdfData>({
    pdf_url: "",
    title: "Каталог продукции",
    title_en: "Product Catalog",
    title_zh: "产品目录",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch("/api/catalog-pdf")
      if (!response.ok) {
        console.error("Error loading catalog PDF data: HTTP", response.status)
        return
      }
      const result = await response.json()
      if (result) {
        setData({
          pdf_url: result.pdf_url || "",
          title: result.title || "Каталог продукции",
          title_en: result.title_en || "Product Catalog",
          title_zh: result.title_zh || "产品目录",
        })
      }
    } catch (error) {
      console.error("Error loading catalog PDF data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/catalog-pdf", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        alert("Настройки каталога сохранены")
      } else {
        const errorData = await response.json().catch(() => ({}))
        alert(`Ошибка сохранения: ${errorData.error || response.status}`)
      }
    } catch (error) {
      console.error("Error saving:", error)
      alert("Ошибка сохранения")
    } finally {
      setSaving(false)
    }
  }

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Пожалуйста, выберите PDF файл")
      return
    }

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      alert("Файл слишком большой. Максимальный размер: 50MB")
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      alert("Supabase не настроен. Проверьте переменные окружения NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY")
      return
    }

    setUploading(true)
    try {
      // Generate unique filename
      const fileName = `catalog-${Date.now()}-${Math.random().toString(36).substring(7)}.pdf`

      // Upload directly to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(fileName, file, {
          contentType: "application/pdf",
          upsert: false,
        })

      if (uploadError) {
        console.error("Supabase upload error:", uploadError)
        alert(`Ошибка загрузки: ${uploadError.message}. Убедитесь что bucket "documents" создан в Supabase Storage.`)
        return
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(uploadData.path)

      if (urlData.publicUrl) {
        setData((prev) => ({ ...prev, pdf_url: urlData.publicUrl }))
        alert("PDF успешно загружен!")
      } else {
        alert("Ошибка получения URL файла")
      }
    } catch (error) {
      console.error("Error uploading PDF:", error)
      alert("Ошибка загрузки PDF. Проверьте консоль для деталей.")
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          PDF Каталог для скачивания
        </CardTitle>
        <CardDescription>
          Загрузите PDF файл каталога, который пользователи смогут скачать со страницы каталога
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>PDF файл каталога</Label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                disabled={uploading}
                className="flex-1"
              />
              {uploading && <Loader2 className="h-5 w-5 animate-spin self-center" />}
            </div>
            {data.pdf_url && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>PDF загружен</span>
                <a
                  href={data.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  Открыть <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Или укажите URL напрямую</Label>
            <Input
              value={data.pdf_url}
              onChange={(e) => setData((prev) => ({ ...prev, pdf_url: e.target.value }))}
              placeholder="https://example.com/catalog.pdf"
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <h4 className="font-medium">Название кнопки скачивания</h4>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Русский</Label>
              <Input
                value={data.title}
                onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Каталог продукции"
              />
            </div>
            <div className="space-y-2">
              <Label>English</Label>
              <Input
                value={data.title_en}
                onChange={(e) => setData((prev) => ({ ...prev, title_en: e.target.value }))}
                placeholder="Product Catalog"
              />
            </div>
            <div className="space-y-2">
              <Label>中文</Label>
              <Input
                value={data.title_zh}
                onChange={(e) => setData((prev) => ({ ...prev, title_zh: e.target.value }))}
                placeholder="产品目录"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Сохранить настройки каталога
            </>
          )}
        </Button>

        {!data.pdf_url && (
          <p className="text-sm text-amber-600 dark:text-amber-400">
            PDF файл не загружен. Пока PDF не загружен, кнопка скачивания на странице каталога будет скрыта.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
