"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Mail, MapPin, RefreshCw } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useSiteContent } from "@/hooks/use-site-content"

const generateCaptchaText = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let captcha = ""
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return captcha
}

export function Contact() {
  const t = useTranslations()
  const { toast } = useToast()
  const { get } = useSiteContent("contact")

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
  const [isMounted, setIsMounted] = useState(false)

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
      console.error("[v0] Contact - Canvas error:", error)
      return ""
    }
  }

  useEffect(() => {
    setIsMounted(true)
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
      newErrors.name = t("contact.form.required")
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contact.form.required")
    } else {
      // Remove all non-digit characters for validation
      const phoneDigits = formData.phone.replace(/\D/g, "")

      // Check if phone has at least 10 digits (minimum valid phone number)
      if (phoneDigits.length < 10) {
        newErrors.phone = "Введите корректный номер телефона (минимум 10 цифр)"
      } else if (phoneDigits.length > 15) {
        newErrors.phone = "Номер телефона слишком длинный (максимум 15 цифр)"
      }
    }

    if (!formData.consent) {
      newErrors.consent = t("contact.form.errorConsent")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log("[v0] Contact - Opening captcha modal")
    setShowCaptchaModal(true)
  }

  const handleCaptchaSubmit = async () => {
    if (!captchaInput.trim()) {
      setErrors({ captcha: t("contact.form.required") })
      return
    }

    if (captchaInput.toUpperCase() !== captchaText) {
      setErrors({ captcha: t("contact.form.errorCaptcha") })
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
        message: formData.message || "Запрос обратного звонка",
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
        // If EmailJS fails, try fallback mailto link
        const subject = encodeURIComponent(`Заявка с сайта от ${formData.name}`)
        const body = encodeURIComponent(
          `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email || "Не указан"}\n\nСообщение:\n${formData.message || "Запрос обратного звонка"}`
        )
        window.open(`mailto:sales@medved-neftegaz.ru?subject=${subject}&body=${body}`, "_blank")
      }

      toast({
        title: t("contact.form.success"),
        description: t("contact.description"),
      })

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
      const subject = encodeURIComponent(`Заявка с сайта от ${formData.name}`)
      const body = encodeURIComponent(
        `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email || "Не указан"}\n\nСообщение:\n${formData.message || "Запрос обратного звонка"}`
      )
      window.open(`mailto:sales@medved-neftegaz.ru?subject=${subject}&body=${body}`, "_blank")
      
      toast({
        title: t("contact.form.success"),
        description: "Открыто окно для отправки email",
      })

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

  const contactMethods = [
    {
      icon: Phone,
      label: get("phoneLabel") || t("contact.info.phone"),
      value: get("phone") || "+7 (495) 777-56-60",
      href: `tel:${(get("phone") || "+7 (495) 777-56-60").replace(/\D/g, "")}`,
    },
    {
      icon: Mail,
      label: get("emailLabel") || t("contact.info.email"),
      value: get("email") || "info@aomedved.ru",
      href: `mailto:${get("email") || "info@aomedved.ru"}`,
    },
    {
      icon: MapPin,
      label: get("addressLabel") || t("contact.info.address"),
      value:
        get("address") ||
        "107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3",
      href: `https://yandex.ru/maps/?text=${encodeURIComponent(get("address") || "107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3")}`,
    },
  ]

  const title = get("title") || t("contact.title")
  const description = get("description") || t("contact.description")
  const formTitle = get("formTitle") || t("contact.form.message")
  const address =
    get("address") ||
    "107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3"

  return (
    <section id="contact" className="py-6 lg:py-4 2xl:py-12 relative bg-background">
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-6 lg:mb-3 2xl:mb-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-3xl 2xl:text-5xl mb-4 lg:mb-2 2xl:mb-4 font-extrabold text-foreground">
            {title}
          </h2>
          <p className="text-lg lg:text-base 2xl:text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-3 2xl:gap-6">
            <div className="space-y-3 lg:space-y-2 2xl:space-y-3">
              <h3 className="text-2xl lg:text-xl 2xl:text-2xl font-bold text-foreground mb-6 lg:mb-3 2xl:mb-6">
                {get("contactInfoTitle") || t("contact.info.address")}
              </h3>
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div key={index} className="flex items-start gap-4 lg:gap-3 2xl:gap-4 group">
                    <div className="w-12 h-12 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-muted transition-colors">
                      <Icon className="h-6 w-6 lg:h-5 lg:w-5 2xl:h-6 2xl:w-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm lg:text-xs 2xl:text-sm font-medium text-muted-foreground mb-1 lg:mb-0.5 2xl:mb-1">
                        {method.label}
                      </h4>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-lg lg:text-sm 2xl:text-lg text-foreground hover:text-accent transition-colors font-medium"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-lg lg:text-sm 2xl:text-lg text-foreground font-medium">{method.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}

              <div className="mt-6 lg:mt-3 2xl:mt-6 rounded-lg overflow-hidden border border-border">
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=37.610398,55.770006&mode=search&text=${encodeURIComponent(address)}&z=16&l=map`}
                  width="100%"
                  className="w-full h-[240px] md:h-[240px] lg:h-[240px] xl:h-[240px] 2xl:h-[240px]"
                  frameBorder="0"
                  allowFullScreen
                  style={{ border: 0 }}
                  title="Yandex Map"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl lg:text-xl 2xl:text-2xl font-bold text-foreground mb-6 lg:mb-3 2xl:mb-6">
                {formTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-3 2xl:space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground text-sm lg:text-xs 2xl:text-sm">
                    {t("contact.form.name")} <span className="text-white">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 lg:h-9 2xl:h-12 text-base lg:text-sm 2xl:text-base"
                    placeholder={t("contact.form.name")}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-foreground text-sm lg:text-xs 2xl:text-sm">
                    {t("contact.form.phone")} <span className="text-white">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 lg:h-9 2xl:h-12 text-base lg:text-sm 2xl:text-base"
                    placeholder={t("contact.form.phone")}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground text-sm lg:text-xs 2xl:text-sm">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 lg:h-9 2xl:h-12 text-base lg:text-sm 2xl:text-base"
                    placeholder={t("contact.form.email")}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground text-sm lg:text-xs 2xl:text-sm">
                    {t("contact.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none text-base lg:text-sm 2xl:text-base"
                    placeholder={t("contact.form.message")}
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
                      Присоединяясь к настоящему Соглашению и оставляя свои данные, я подтверждаю, что все
                      указанныеданные данные принадлежат лично мне, и даю согласие на обработку моих персональных данных
                      в соответствии с политикой конфиденциальности{" "}
                      <Link
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 underline transition-colors text-accent"
                      >
                        политикой конфиденциальности
                      </Link>
                      .
                    </Label>
                  </div>
                  {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:opacity-90 font-semibold text-base lg:text-sm 2xl:text-base h-12 lg:h-9 2xl:h-12"
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showCaptchaModal} onOpenChange={setShowCaptchaModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("contact.form.captcha")}</DialogTitle>
            <DialogDescription>{t("contact.form.captcha")}</DialogDescription>
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
                  Loading...
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
                placeholder={t("contact.form.captcha")}
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
                {t("contact.form.cancel") || "Отмена"}
              </Button>
              <Button
                type="button"
                onClick={handleCaptchaSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-accent text-accent-foreground"
              >
                {t("contact.form.submit")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
