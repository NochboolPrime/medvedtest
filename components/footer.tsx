"use client"

import type React from "react"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/logo"

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <footer className="bg-[#1C2433] text-white mt-20">
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-12 w-12 items-center justify-center text-white">
                <Logo className="w-full h-full" />
              </div>
              <span className="text-xl font-semibold">ТД Медведь</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Надёжные решения для нефтегазовой отрасли и машиностроения
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Навигация</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#hero"
                  onClick={(e) => scrollToSection(e, "#hero")}
                  className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                >
                  Главная
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, "#about")}
                  className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                >
                  О компании
                </a>
              </li>
              <li>
                <a
                  href="#equipment"
                  onClick={(e) => scrollToSection(e, "#equipment")}
                  className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                >
                  Продукция
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, "#services")}
                  className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                >
                  Услуги
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="text-sm text-white/70 transition-colors hover:text-white cursor-pointer"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Услуги</h3>
            <ul className="space-y-3">
              <li className="text-sm text-white/70">Цементировочные агрегаты</li>
              <li className="text-sm text-white/70">Оборудование для ГРП</li>
              <li className="text-sm text-white/70">Насосное оборудование</li>
              <li className="text-sm text-white/70">Модернизация и ремонт</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+74957775660"
                  className="flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  +7 (495) 777-56-60
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aomedved.ru"
                  className="flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                  info@aomedved.ru
                </a>
              </li>
              <li>
                <a
                  href="https://yandex.ru/maps/?text=107031%2C%20г.%20Москва%2C%20ВН.ТЕР.Г.%20Муниципальный%20округ%20Тверской%2C%20ул.%20Дмитровка%20Б.%2C%20д.%2032%2C%20стр.%209%2C%20пом.%203"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    107031, г. Москва, ВН.ТЕР.Г. Муниципальный округ Тверской, ул. Дмитровка Б., д. 32, стр. 9, пом. 3
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 md:flex-row">
            <p>© 2025 ТД Медведь. Все права защищены.</p>
            <div className="flex gap-6">
              <Link href="#" className="transition-colors hover:text-white">
                Политика конфиденциальности
              </Link>
              <Link href="#" className="transition-colors hover:text-white">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
