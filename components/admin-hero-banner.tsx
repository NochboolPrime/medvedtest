"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

interface HeroBanner {
  id: string
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export function AdminHeroBanner() {
  const [banner, setBanner] = useState<HeroBanner | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanner()
  }, [])

  const fetchBanner = async () => {
    try {
      const response = await fetch("/api/hero-banner")
      const data = await response.json()

      if (data.banner) {
        setBanner(data.banner)
        setImageUrl(data.banner.image_url)
      }
    } catch (error) {
      console.error("Error fetching hero banner:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, выберите изображение")
      return
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("Размер файла не должен превышать 10MB")
      return
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      alert("Supabase не настроен. Проверьте переменные окружения.")
      return
    }

    setUploading(true)

    try {
      // Generate unique filename
      const ext = file.name.split(".").pop() || "jpg"
      const fileName = `hero-banner-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

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
        setImageUrl(urlData.publicUrl)
      }
    } catch (error) {
      console.error("Error uploading hero banner image:", error)
      alert("Ошибка при загрузке изображения")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!imageUrl) {
      alert("Пожалуйста, загрузите изображение")
      return
    }

    setSaving(true)

    try {
      const response = await fetch("/api/hero-banner", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to save banner")
      }

      const data = await response.json()
      console.log("Hero banner saved:", data)
      setBanner(data.banner)
      alert("Баннер успешно сохранен!")
    } catch (error) {
      console.error("Error saving hero banner:", error)
      alert("Ошибка при сохранении баннера")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Главный баннер</h2>
        <p className="text-muted-foreground">Управление изображением главного баннера на домашней странице</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Изображение баннера</CardTitle>
          <CardDescription>
            Загрузите изображение для главного баннера (рекомендуемый размер: 1920x1080px)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {imageUrl && (
            <div className="relative w-full h-64 rounded-lg overflow-hidden border">
              <Image src={imageUrl || "/placeholder.svg"} alt="Hero Banner Preview" fill className="object-cover" />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="banner-upload">Загрузить изображение</Label>
            <div className="flex gap-2">
              <Input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="flex-1"
              />
              <Button disabled={uploading} variant="outline" size="icon">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">URL изображения</Label>
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <Button onClick={handleSave} disabled={saving || !imageUrl} className="w-full">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Сохранение...
              </>
            ) : (
              "Сохранить баннер"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
