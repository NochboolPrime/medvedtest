"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (495) 777-56-60",
    href: "tel:+74957775660",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@aomedved.ru",
    href: "mailto:info@aomedved.ru",
  },
  {
    icon: MapPin,
    label: "Адрес",
    value: "107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3",
    href: "yandexnavi://build_route_on_map?lat_to=55.771899&lon_to=37.612267",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#1a1a1a] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#151515] via-[#1a1a1a] to-[#151515]" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl mb-6 font-extrabold">Свяжитесь с нами</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Готовы ответить на ваши вопросы и обсудить детали сотрудничества
          </p>
        </div>

        <div className="glass-strong rounded-2xl p-12 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8">Контактная информация</h3>
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                return (
                  <div key={index} className="flex items-start gap-6 group">
                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-white/60 mb-2">{method.label}</h4>
                      {method.href ? (
                        <a
                          href={method.href}
                          className="text-xl text-white hover:text-white/80 transition-colors font-medium"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-xl text-white font-medium">{method.value}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Отправить сообщение</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    placeholder="Ваше имя"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 text-lg"
                  />
                  <Input
                    placeholder="Компания"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 text-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    type="tel"
                    placeholder="Телефон"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 text-lg"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-14 text-lg"
                  />
                </div>
                <Textarea
                  placeholder="Ваше сообщение"
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none text-lg"
                />
                <Button
                  type="submit"
                  className="w-full bg-white text-[#1a1a1a] hover:bg-white/90 font-semibold text-lg h-14"
                >
                  Отправить
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
