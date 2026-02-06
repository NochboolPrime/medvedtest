'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

/**
 * Компонент для автоматического применения изменений CSS-переменных
 * только к активной теме при работе в design-режиме
 */
export function ThemeDesignHelper() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // Получаем текущую активную тему
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    
    // Добавляем data-атрибут для определения активной темы
    document.documentElement.setAttribute('data-active-theme', currentTheme || 'dark')
    
    // Функция для перехвата изменений CSS-переменных
    const handleStyleMutation = (mutations: MutationRecord[]) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const target = mutation.target as HTMLElement
          const style = target.style
          
          // Проверяем, изменились ли CSS-переменные
          if (style.cssText.includes('--')) {
            console.log(' CSS-переменные изменены в design-режиме для темы:', currentTheme)
            
            // Применяем изменения к правильному селектору темы
            applyThemeSpecificChanges(style, currentTheme || 'dark')
          }
        }
      })
    }

    // Создаем observer для отслеживания изменений
    const observer = new MutationObserver(handleStyleMutation)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style']
    })

    return () => observer.disconnect()
  }, [theme, resolvedTheme])

  return null
}

/**
 * Применяет изменения CSS-переменных только к активной теме
 */
function applyThemeSpecificChanges(style: CSSStyleDeclaration, activeTheme: string) {
  const root = document.documentElement
  const cssVariables: Record<string, string> = {}
  
  // Собираем все CSS-переменные из inline стилей
  for (let i = 0; i < style.length; i++) {
    const prop = style[i]
    if (prop.startsWith('--')) {
      cssVariables[prop] = style.getPropertyValue(prop)
    }
  }
  
  // Применяем переменные к правильному контексту темы
  if (activeTheme === 'light') {
    // Для светлой темы добавляем класс .light
    root.classList.add('light')
    root.classList.remove('dark')
  } else {
    // Для темной темы используем :root без класса
    root.classList.remove('light')
    root.classList.add('dark')
  }
  
  // Применяем CSS-переменные
  Object.entries(cssVariables).forEach(([prop, value]) => {
    root.style.setProperty(prop, value)
  })
  
  console.log(' Применены изменения к теме:', activeTheme, cssVariables)
}
