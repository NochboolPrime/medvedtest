import { notFound } from 'next/navigation'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { Contact } from "@/components/contact"
import type { Metadata } from "next"
import { BackButton } from "@/components/back-button"

interface ProductData {
  title: string
  description: string
  longDescription: string
  images: string[]
  specifications: { label: string; value: string }[]
  features: string[]
  applications: string[]
}

const productImages: Record<string, string[]> = {
  "tsementirovaniye": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759479_y-eK02YrFkD1Qf5xscDS3uYNm1Z0oCpS.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759475_y-NKbaasU6vUDHg4dfBRQSb4UDV1l27t.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759476_y-L78Y5178SXiuEJKpF1MjyQxpzzouRa.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759478_y-DT0q16j50seChhkn1kytET7TDNFsxM.jpg",
  ],
  "grp": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759477_y-OnujmTYlD8N1eQPCjkvA3Pr1DtMZvf.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759472_y-KmQz1i8UcX3IsuM3UI5TjGUIv8kVpA.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759474_y-3jDmMHOuKsjV4608APsWk2w3iyRqhZ.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759473_y-mq7FNVr9OQinhg23r5EzFKc9yeMoBI.jpg",
  ],
  "nasos": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759489_y-nwTKwwULG6SbtsT9RqEBZ4X6Pb5CZb.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759481_y-Oxd0mXZGmdbNzu8vB3ebayrBPkdduE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759485_y-pvZeV9G1rSA7i4L223lJxsPX2nfLzK.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759487_y-ianx8nBikEGA2jt63hszEfv9DIpt1X.jpg",
  ],
}

const productSlugs = ["tsementirovaniye", "grp", "nasos", "ca-320", "nasosnaya-stantsiya", "kompleks-grp", "mnogofunktsionalnaya"]

export async function generateStaticParams() {
  return productSlugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  
  return {
    title: `Продукт - ТД Медведь`,
    description: "Высококачественное оборудование для нефтегазовой промышленности",
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  
  if (!["tsementirovaniye", "grp", "nasos"].includes(resolvedParams.slug)) {
    notFound()
  }

  const productKey = resolvedParams.slug
  const images = productImages[productKey] || []

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <BackButton />
      <ProductDetail productKey={productKey} images={images} />
      <Contact />
      <Footer />
    </main>
  )
}
