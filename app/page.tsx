import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Equipment } from "@/components/equipment"
import { EquipmentSection } from "@/components/equipment-section"
import { Services } from "@/components/services"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-dark scroll-smooth">
      <Header />
      <Hero />
      <EquipmentSection />
      <Equipment />
      <Services />
      <Contact />
      <Footer />
    </main>
  )
}
