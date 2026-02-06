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
    console.log(" AnnouncementPanel - Loading active announcement")
    fetch("/api/announcements/active")
      .then((res) => {
        console.log(" AnnouncementPanel - Response status:", res.status)
        return res.json()
      })
      .then((data) => {
        console.log(" AnnouncementPanel - Received data:", data)
        if (data.announcement) {
          console.log(" AnnouncementPanel - Setting announcement:", data.announcement)
          setAnnouncement(data.announcement)

          console.log(" AnnouncementPanel - Scheduling show after:", data.announcement.show_delay, "ms")
          setTimeout(() => {
            console.log(" AnnouncementPanel - Showing announcement")
            setIsVisible(true)
          }, data.announcement.show_delay)

          if (data.announcement.auto_hide_delay > 0) {
            console.log(" AnnouncementPanel - Scheduling hide after:", data.announcement.auto_hide_delay, "ms")
            setTimeout(() => {
              console.log(" AnnouncementPanel - Hiding announcement")
              setIsVisible(false)
            }, data.announcement.show_delay + data.announcement.auto_hide_delay)
          }
        } else {
          console.log(" AnnouncementPanel - No active announcement found")
        }
      })
      .catch((error) => {
        console.error(" AnnouncementPanel - Error loading announcement:", error)
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

  console.log(" AnnouncementPanel - Displaying with locale:", locale, { title, content })

  const handleAnnouncementClick = () => {
    console.log(" AnnouncementPanel - Navigating to catalog")
    router.push("/catalog")
  }

  return (
    <>
      <div
        className={`fixed right-2 sm:right-4 top-16 sm:top-20 z-50 w-72 sm:w-96 max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] transition-all duration-500 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
        }`}
      >
        <Card
          className="shadow-lg border-2 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={handleAnnouncementClick}
        >
          <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg leading-tight">{title}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsVisible(false)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            {announcement.image_url && (
              <div className="-mx-3 sm:-mx-6 -mt-3 sm:-mt-6 mb-2 sm:mb-3">
                <img
                  src={announcement.image_url || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-32 sm:h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            )}
            <CardDescription className="text-xs sm:text-sm whitespace-pre-wrap mt-0 line-clamp-4 sm:line-clamp-none">{content}</CardDescription>

            {announcement.link_url && linkText && (
              <Button
                className="w-full mt-2 sm:mt-3 text-sm sm:text-base"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(announcement.link_url, "_blank")
                }}
              >
                {linkText}
                <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
