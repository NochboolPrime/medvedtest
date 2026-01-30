import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { Products } from "@/components/products"
import { CookieConsent } from "@/components/cookie-consent"
import { ProductionCarousel } from "@/components/production-carousel"
import { AnnouncementPanel } from "@/components/announcement-panel"
import { CertificatesSection } from "@/components/certificates-section"

export default function Home() {
  return (
    // Светлая тема: белый (#ffffff)
    // Темная тема: темно-синий (#1a1f2e)
    <main className="min-h-screen bg-background scroll-smooth">
      <AnnouncementPanel />
      <Header />
      <Hero />
      <About />
      <Services />
      <Products />
      <ProductionCarousel />
      <CertificatesSection />
      <Contact />
      <Footer />
      <CookieConsent />
    </main>
  )
}
