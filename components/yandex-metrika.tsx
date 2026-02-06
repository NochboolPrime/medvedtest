"use client"

import { useEffect } from "react"

export function YandexMetrika() {
  useEffect(() => {
    const loadMetrika = async () => {
      try {
        const response = await fetch("/api/site-settings")
        const { settings } = await response.json()

        const metrikaEnabled = settings?.yandex_metrika_enabled === true
        const metrikaId = settings?.yandex_metrika_id

        // Проверяем что ID существует, является числом или строкой с числом
        const isValidId =
          metrikaId && !isNaN(Number(metrikaId)) && String(metrikaId) !== "false" && String(metrikaId) !== "true"

        if (!metrikaEnabled || !isValidId) {
          console.log(" Yandex Metrika disabled or invalid ID")
          return
        }

        const numericId = Number(metrikaId)

        // Load Yandex Metrika script
        ;((m: any, e: any, t: any, r: any, i: any, k?: any, a?: any) => {
          m[i] =
            m[i] ||
            (() => {
              ;(m[i].a = m[i].a || []).push(arguments)
            })
          m[i].l = Date.now()
          for (let j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
              return
            }
          }
          k = e.createElement(t)
          a = e.getElementsByTagName(t)[0]
          k.async = 1
          k.src = r
          if (a && a.parentNode) {
            a.parentNode.insertBefore(k, a)
          }
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")

        // Initialize Yandex Metrika with validated numeric ID
        ;(window as any).ym(numericId, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          ecommerce: "dataLayer",
        })

        console.log(" Yandex Metrika initialized with ID:", numericId)
      } catch (error) {
        console.error(" Failed to load Yandex Metrika:", error)
      }
    }

    loadMetrika()
  }, [])

  return null
}
