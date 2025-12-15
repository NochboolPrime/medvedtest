"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo({ className = "" }: { className?: string }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "dark"
  const logoSrc =
    currentTheme === "light" ? "/images/logo-light.png" : "/images/design-mode/%D0%9D%D0%BE%D1%80%D0%BC%202.png"

  return (
    <div className={`relative flex items-center ${className}`}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="Медведь Логотип"
        width={120}
        height={120}
        className="w-30 h-30 object-contain transition-opacity duration-300"
        priority
      />
    </div>
  )
}
