"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, Mail, User, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "@/hooks/use-translations"

interface ConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const generateCaptchaText = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let captcha = ""
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return captcha
}

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const { toast } = useToast()
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  })

  const [showCaptchaModal, setShowCaptchaModal] = useState(false)
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaText, setCaptchaText] = useState("")
  const [captchaImage, setCaptchaImage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const generateCaptchaImage = (text: string): string => {
    if (typeof window === "undefined") return ""

    try {
      const canvas = document.createElement("canvas")
      canvas.width = 180
      canvas.height = 60
      const ctx = canvas.getContext("2d")

      if (!ctx) return ""

      // Background
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Random lines for noise
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
      }

      // Draw text with rotation
      ctx.font = "bold 32px Arial"
      ctx.textBaseline = "middle"

      for (let i = 0; i < text.length; i++) {
        ctx.save()
        const x = 20 + i * 25
        const y = canvas.height / 2
        const angle = (Math.random() - 0.5) * 0.4

        ctx.translate(x, y)
        ctx.rotate(angle)
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 40%)`
        ctx.fillText(text[i], 0, 0)
        ctx.restore()
      }

      return canvas.toDataURL()
    } catch (error) {
      console.error("[v0] ConsultationModal - Canvas error:", error)
      return ""
    }
  }

  useEffect(() => {
    const newText = generateCaptchaText()
    setCaptchaText(newText)
    const newImage = generateCaptchaImage(newText)
    setCaptchaImage(newImage)
  }, [])

  const regenerateCaptcha = () => {
    const newText = generateCaptchaText()
    setCaptchaText(newText)
    const newImage = generateCaptchaImage(newText)
    setCaptchaImage(newImage)
    setCaptchaInput("")
    setErrors({})
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t("consultationModal.errorName")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("consultationModal.errorPhone")
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      if (phoneDigits.length < 10) {
        newErrors.phone = t("consultationModal.errorPhoneMin")
      } else if (phoneDigits.length > 15) {
        newErrors.phone = t("consultationModal.errorPhoneMax")
      }
    }

    if (!formData.consent) {
      newErrors.consent = t("consultationModal.errorConsent")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setShowCaptchaModal(true)
  }

  const handleCaptchaSubmit = async () => {
    if (!captchaInput.trim()) {
      setErrors({ captcha: t("consultationModal.errorCaptchaEmpty") })
      return
    }

    if (captchaInput.toUpperCase() !== captchaText) {
      setErrors({ captcha: t("consultationModal.errorCaptchaWrong") })
      regenerateCaptcha()
      return
    }

    setIsSubmitting(true)
    setShowCaptchaModal(false)

    try {
      // EmailJS configuration - send email to sales@medved-neftegaz.ru
      const EMAILJS_SERVICE_ID = "service_rhoqg4t"
      const EMAILJS_TEMPLATE_ID = "template_2x0a9bi"
      const EMAILJS_PUBLIC_KEY = "tAREkKW0-VSuNcVgm"

      const templateParams = {
        to_email: "sales@medved-neftegaz.ru",
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email || "Не указан",
        message: formData.message || "Запрос консультации",
        reply_to: formData.email || "noreply@medved-neftegaz.ru",
      }

      // Send via EmailJS REST API
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: templateParams,
        }),
      })

      if (!response.ok) {
        // Fallback to mailto if EmailJS fails
        const subject = encodeURIComponent(`Запрос консультации от ${formData.name}`)
        const body = encodeURIComponent(
          `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email || "Не указан"}\n\nСообщение:\n${formData.message || "Запрос консультации"}`
        )
        window.open(`mailto:sales@medved-neftegaz.ru?subject=${subject}&body=${body}`, "_blank")
      }

      toast({
        title: t("consultationModal.successTitle"),
        description: t("consultationModal.successDescription"),
      })

      onOpenChange(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        consent: false,
      })
      setCaptchaInput("")
      setErrors({})
      regenerateCaptcha()
    } catch (error) {
      // Fallback: open mailto link if EmailJS is not configured
      const subject = encodeURIComponent(`Запрос консультации от ${formData.name}`)
      const body = encodeURIComponent(
        `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email || "Не указан"}\n\nСообщение:\n${formData.message || "Запрос консультации"}`
      )
      window.open(`mailto:sales@medved-neftegaz.ru?subject=${subject}&body=${body}`, "_blank")

      toast({
        title: t("consultationModal.emailSentTitle"),
        description: t("consultationModal.emailSentDescription"),
      })

      onOpenChange(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        consent: false,
      })
      setCaptchaInput("")
      setErrors({})
      regenerateCaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">{t("consultationModal.title")}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t("consultationModal.description")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                {t("consultationModal.nameLabel")} <span className="text-white">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder={t("consultationModal.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                {t("consultationModal.phoneLabel")} <span className="text-white">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("consultationModal.phonePlaceholder")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("consultationModal.emailLabel")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("consultationModal.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                {t("consultationModal.messageLabel")}
              </label>
              <Textarea
                id="message"
                placeholder={t("consultationModal.messagePlaceholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="consent"
                  className="text-[11px] text-muted-foreground opacity-60 leading-snug cursor-pointer flex-1"
                >
                  {t("consultationModal.consentText")}{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {t("consultationModal.privacyPolicyLink")}
                  </Link>
                  .
                </Label>
              </div>
              {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                {t("consultationModal.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSubmitting ? t("consultationModal.sending") : t("consultationModal.submit")}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCaptchaModal} onOpenChange={setShowCaptchaModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("consultationModal.captchaTitle")}</DialogTitle>
            <DialogDescription>{t("consultationModal.captchaDescription")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2 items-center justify-center">
              {captchaImage ? (
                <img
                  src={captchaImage || "/placeholder.svg"}
                  alt="Captcha"
                  className="border border-border rounded"
                  width={180}
                  height={60}
                />
              ) : (
                <div className="w-[180px] h-[60px] border border-border rounded flex items-center justify-center text-muted-foreground">
                  {t("consultationModal.loading")}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={regenerateCaptcha}
                className="h-[60px] w-[60px] bg-transparent"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2">
              <Input
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value)
                  setErrors({})
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCaptchaSubmit()
                  }
                }}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground h-14 text-lg text-center"
                placeholder={t("consultationModal.captchaPlaceholder")}
                autoFocus
              />
              {errors.captcha && <p className="text-red-500 text-sm text-center">{errors.captcha}</p>}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowCaptchaModal(false)
                  setCaptchaInput("")
                  setErrors({})
                }}
                className="flex-1"
              >
                {t("consultationModal.cancel")}
              </Button>
              <Button
                type="button"
                onClick={handleCaptchaSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-accent text-accent-foreground"
              >
                {t("consultationModal.confirm")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
