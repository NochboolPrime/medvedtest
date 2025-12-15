"use client"

import { useLanguage } from "@/components/language-provider"
import ruMessages from "@/messages/ru.json"
import enMessages from "@/messages/en.json"
import zhMessages from "@/messages/zh.json"

const messages = {
  ru: ruMessages,
  en: enMessages,
  zh: zhMessages,
}

type Messages = typeof ruMessages

export function useTranslations() {
  const { locale } = useLanguage()
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = messages[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to Russian if translation not found
        value = messages.ru
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const tArray = (key: string): string[] => {
    const keys = key.split('.')
    let value: any = messages[locale]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return []
      }
    }
    
    return Array.isArray(value) ? value : []
  }

  return Object.assign(t, { array: tArray })
}
