# Система тем для сайта ТД Медведь

## Обзор
Сайт использует библиотеку `next-themes` для переключения между светлой и тёмной темой с автоматическим сохранением выбора в `localStorage`.

## Архитектура

### 1. ThemeProvider (components/theme-provider.tsx)
Оборачивает всё приложение и предоставляет контекст темы:
- Использует `next-themes` для управления темой
- Сохраняет выбор в localStorage автоматически
- Предотвращает flash при загрузке страницы

### 2. CSS переменные (app/globals.css)

#### Темная тема (по умолчанию - :root)
```css
:root {
  --background: #1a1f2e;     /* Основной фон */
  --foreground: #edf1f7;     /* Основной текст */
  --card: #1a1f2e;           /* Фон карточек */
  --primary: #1e375c;        /* Основной цвет */
  --secondary: #b7c5db;      /* Вторичный цвет */
  --muted: #1a1f2e;          /* Приглушенные элементы */
  --accent: #b19d76;         /* Акцентный цвет (бежевый) */
  --border: rgba(183, 197, 219, 0.1);  /* Границы */
}
```

#### Светлая тема (.light класс)
```css
.light {
  --background: #ffffff;     /* Белый фон */
  --foreground: #1c2433;     /* Темный текст */
  --card: #f8f9fa;           /* Светло-серые карточки */
  --primary: #1e375c;        /* Темно-синий */
  --secondary: #e8ecf2;      /* Светло-серый */
  --muted: #f1f3f5;          /* Приглушенный фон */
  --accent: #b19d76;         /* Акцентный цвет (бежевый) */
  --border: rgba(28, 36, 51, 0.1);  /* Границы */
}
```

### 3. Tailwind CSS интеграция
Все CSS переменные доступны через Tailwind классы:
- `bg-background` → использует var(--background)
- `text-foreground` → использует var(--foreground)
- `bg-card` → использует var(--card)
- `bg-primary` → использует var(--primary)
- `text-muted-foreground` → использует var(--muted-foreground)
- и т.д.

### 4. Кнопка переключения темы (components/theme-toggle.tsx)
- Отображает иконку солнца в светлой теме
- Отображает иконку луны в темной теме
- Плавная анимация при переключении
- Использует `useTheme()` хук из next-themes

## Как использовать в компонентах

### ✅ ПРАВИЛЬНО - используйте семантические токены:
```tsx
<div className="bg-background text-foreground">
  <div className="bg-card border-border">
    <h1 className="text-primary">Заголовок</h1>
    <p className="text-muted-foreground">Описание</p>
    <button className="bg-accent text-accent-foreground">Кнопка</button>
  </div>
</div>
```

### ❌ НЕПРАВИЛЬНО - не используйте жёстко заданные цвета:
```tsx
<div className="bg-blue-500 text-white">  {/* ❌ Не будет меняться с темой */}
  <div className="bg-gray-900">           {/* ❌ Не адаптируется */}
    <h1 className="text-blue-600">Заголовок</h1>
  </div>
</div>
```

## Модификаторы темы в Tailwind

### dark: модификатор
Применяется только в темной теме:
```tsx
<div className="bg-white dark:bg-[#1a1f2e]">
  {/* Белый фон в светлой теме, темно-синий в темной */}
</div>
```

### light: модификатор (кастомный)
Применяется только в светлой теме:
```tsx
<div className="bg-[#1a1f2e] light:bg-white">
  {/* Темно-синий фон в темной теме, белый в светлой */}
</div>
```

## Компоненты и их цветовая адаптация

### Header (components/header.tsx)
- **Темная тема**: bg-[#2c3e50] (темно-синий)
- **Светлая тема**: bg-white/95 (полупрозрачный белый)
- Текст автоматически адаптируется

### Hero (components/hero.tsx)
- **Темная тема**: bg-[#1a1f2e] (темно-синий фон)
- **Светлая тема**: bg-white (белый фон)
- Кнопки используют bg-primary (темно-синий в обеих темах)

### About (components/about.tsx)
- **Темная тема**: bg-[#1a1f2e]
- **Светлая тема**: bg-muted (светло-серый #f1f3f5)
- Карточки: темная - #1a1f2e, светлая - #f8f9fa

### Services (components/services.tsx)
- Использует семантические токены
- **Темная тема**: bg-background (#1a1f2e)
- **Светлая тема**: bg-background (#ffffff)

### Equipment Section (components/equipment-section.tsx)
- Карточки используют явные цвета:
- **Темная тема**: bg-[#2c3e50] (темно-синий)
- **Светлая тема**: bg-white

### Contact (components/contact.tsx)
- **Темная тема**: bg-[#1a1f2e]
- **Светлая тема**: bg-white
- Форма: темная - #1a1f2e, светлая - bg-card

### Footer (components/footer.tsx)
- **Темная тема**: bg-[#1a1f2e]
- **Светлая тема**: bg-muted (#f1f3f5)

## Изменение цветов в Design-режиме

### Для изменения только темной темы:
Редактируйте переменные в `:root` блоке `app/globals.css`:
```css
:root {
  --background: #новый-цвет;  /* Изменится только в темной теме */
}
```

### Для изменения только светлой темы:
Редактируйте переменные в `.light` блоке `app/globals.css`:
```css
.light {
  --background: #новый-цвет;  /* Изменится только в светлой теме */
}
```

### Для добавления нового цвета:
1. Добавьте CSS переменную в обе секции:
```css
:root {
  --my-color: #1a2b3c;
}
.light {
  --my-color: #f0f0f0;
}
```

2. Добавьте в @theme inline:
```css
@theme inline {
  --color-my-color: var(--my-color);
}
```

3. Используйте в компонентах:
```tsx
<div className="bg-my-color text-my-color">
```

## Сохранение темы

Библиотека `next-themes` автоматически:
- ✅ Сохраняет выбранную тему в localStorage
- ✅ Восстанавливает тему при перезагрузке страницы
- ✅ Синхронизирует тему между вкладками
- ✅ Предотвращает flash неправильной темы

Ключ в localStorage: `theme`
Возможные значения: `"dark"` | `"light"`

## Настройка по умолчанию

В `app/layout.tsx`:
```tsx
<ThemeProvider
  attribute="class"           // Использует класс .dark/.light
  defaultTheme="dark"         // Темная тема по умолчанию
  enableSystem={false}        // Не использует системную тему
  disableTransitionOnChange   // Отключает анимацию при смене темы
>
```

## Проверка текущей темы в компонентах

```tsx
"use client"
import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div>
      <p>Текущая тема: {theme}</p>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Переключить
      </button>
    </div>
  )
}
```

## Отладка

Если тема не переключается:
1. Проверьте что `suppressHydrationWarning` есть на `<html>` теге
2. Убедитесь что компонент обернут в `"use client"`
3. Проверьте что ThemeProvider обернут вокруг всего приложения
4. Проверьте localStorage в DevTools (должен быть ключ `theme`)

## Цветовая палитра проекта

### Темная тема (фирменные цвета)
- Основной фон: `#1a1f2e` (темно-синий)
- Акцент: `#b19d76` (бежевый)
- Вторичный: `#b7c5db` (светло-голубой)
- Primary: `#1e375c` (темно-синий)

### Светлая тема
- Основной фон: `#ffffff` (белый)
- Карточки: `#f8f9fa` (светло-серый)
- Приглушенный: `#f1f3f5` (светло-серый)
- Primary: `#1e375c` (темно-синий - сохраняется)
- Акцент: `#b19d76` (бежевый - сохраняется)
