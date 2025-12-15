export type Locale = 'ru' | 'en' | 'zh'

export const locales: Locale[] = ['ru', 'en', 'zh']
export const defaultLocale: Locale = 'ru'

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  zh: '中文',
}
