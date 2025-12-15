import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy-dark flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white/80 mb-6">Страница не найдена</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            К сожалению, запрашиваемая страница не существует. Вернитесь на главную страницу.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
