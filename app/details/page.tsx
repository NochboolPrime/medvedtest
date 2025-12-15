import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-foreground hover:text-accent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад на главную
            </Button>
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Подробная информация
              </h1>
              <p className="text-xl text-muted-foreground">
                Эта страница демонстрирует сохранение темы при навигации
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                О сохранении темы
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Тема автоматически сохраняется благодаря библиотеке next-themes с настройками:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Использование attribute="class" для переключения классов темы</li>
                  <li>Сохранение выбора в localStorage браузера</li>
                  <li>Автоматическое применение темы при загрузке страницы</li>
                  <li>Семантические CSS-переменные (--background, --foreground, --primary)</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Светлая тема
                </h3>
                <p className="text-muted-foreground">
                  Светлая тема использует белый фон (#ffffff) и темный текст для комфортного чтения в хорошо освещенных помещениях.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Темная тема
                </h3>
                <p className="text-muted-foreground">
                  Темная тема использует темно-синий фон (#1a1f2e) и светлый текст для снижения нагрузки на глаза в условиях низкой освещенности.
                </p>
              </div>
            </div>

            <div className="bg-accent/10 rounded-lg p-6 border border-accent/20">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Технические детали
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>ThemeProvider: attribute="class", enableSystem=false</p>
                <p>Хранилище: localStorage ('theme')</p>
                <p>Цветовая схема: CSS переменные в globals.css</p>
                <p>Навигация: Next.js Link без потери состояния</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
