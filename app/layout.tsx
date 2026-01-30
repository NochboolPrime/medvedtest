import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeDesignHelper } from "@/components/theme-design-helper"
import { LanguageProvider } from "@/components/language-provider"
import { YandexMetrika } from "@/components/yandex-metrika"

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
  metadataBase: new URL("https://tdmedved.com"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "ТД Медведь - Оборудование для нефтегазовой отрасли",
    description: "Надёжные решения для нефтегазовой отрасли и машиностроения",
    url: "https://tdmedved.com",
    siteName: "ТД Медведь",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ТД Медведь",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ТД Медведь - Оборудование для нефтегазовой отрасли",
    description: "Надёжные решения для нефтегазовой отрасли и машиностроения",
    images: ["/og-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${onestRegular.variable} ${onestMedium.variable} ${onestBold.variable} ${onestLight.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            <YandexMetrika />
            <ThemeDesignHelper />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
