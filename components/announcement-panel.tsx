"use client"

import { useEffect, useState } from "react"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"

interface Announcement {
  id: string
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

export function AnnouncementPanel() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isImageFullscreen, setIsImageFullscreen] = useState(false)
  const { locale } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] AnnouncementPanel - Loading active announcement")
    fetch("/api/announcements/active")
      .then((res) => {
        console.log("[v0] AnnouncementPanel - Response status:", res.status)
        return res.json()
      })
      .then((data) => {
        console.log("[v0] AnnouncementPanel - Received data:", data)
        if (data.announcement) {
          console.log("[v0] AnnouncementPanel - Setting announcement:", data.announcement)
          setAnnouncement(data.announcement)

          console.log("[v0] AnnouncementPanel - Scheduling show after:", data.announcement.show_delay, "ms")
          setTimeout(() => {
            console.log("[v0] AnnouncementPanel - Showing announcement")
            setIsVisible(true)
          }, data.announcement.show_delay)

          if (data.announcement.auto_hide_delay > 0) {
            console.log("[v0] AnnouncementPanel - Scheduling hide after:", data.announcement.auto_hide_delay, "ms")
            setTimeout(() => {
              console.log("[v0] AnnouncementPanel - Hiding announcement")
              setIsVisible(false)
            }, data.announcement.show_delay + data.announcement.auto_hide_delay)
          }
        } else {
          console.log("[v0] AnnouncementPanel - No active announcement found")
        }
      })
      .catch((error) => {
        console.error("[v0] AnnouncementPanel - Error loading announcement:", error)
      })
  }, [])

  if (!announcement || !isVisible) {
    return null
  }

  const title =
    locale === "ru" ? announcement.title_ru : locale === "en" ? announcement.title_en : announcement.title_zh

  const content =
    locale === "ru" ? announcement.content_ru : locale === "en" ? announcement.content_en : announcement.content_zh

  const linkText =
    locale === "ru"
      ? announcement.link_text_ru
      : locale === "en"
        ? announcement.link_text_en
        : announcement.link_text_zh

  console.log("[v0] AnnouncementPanel - Displaying with locale:", locale, { title, content })

  const handleAnnouncementClick = () => {
    console.log("[v0] AnnouncementPanel - Navigating to catalog")
    router.push("/catalog")
  }

  return (
    <>
      <div
        className={`fixed right-4 top-20 z-50 w-96 max-w-[calc(100vw-2rem)] transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
        }`}
      >
        <Card
          className="shadow-lg border-2 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={handleAnnouncementClick}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVisible(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {announcement.image_url && (
              <div className="-mx-6 -mt-6 mb-3">
                <img
                  src={announcement.image_url || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            )}
            <CardDescription className="text-sm whitespace-pre-wrap mt-0">{content}</CardDescription>

            {announcement.link_url && linkText && (
              <Button
                className="w-full mt-3"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(announcement.link_url, "_blank")
                }}
              >
                {linkText}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
