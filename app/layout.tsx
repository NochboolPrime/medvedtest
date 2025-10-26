import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const onestRegular = localFont({
  src: "../public/fonts/OnestRegular1602-hint.ttf",
  variable: "--font-onest-regular",
  weight: "400",
})

const onestMedium = localFont({
  src: "../public/fonts/OnestMedium1602-hint.ttf",
  variable: "--font-onest-medium",
  weight: "500",
})

const onestBold = localFont({
  src: "../public/fonts/OnestBold1602-hint.ttf",
  variable: "--font-onest-bold",
  weight: "700",
})

const onestLight = localFont({
  src: "../public/fonts/OnestLight1602-hint.ttf",
  variable: "--font-onest-light",
  weight: "300",
})

export const metadata: Metadata = {
  title: "ТД Медведь - Оборудование для нефтегазовой отрасли",
  description: "Надёжные решения для нефтегазовой отрасли и машиностроения",
  generator: "v0.app",
  icons: {
    icon: "/images/design-mode/%D0%9D%D0%BE%D1%80%D0%BC%202.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${onestRegular.variable} ${onestMedium.variable} ${onestBold.variable} ${onestLight.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
