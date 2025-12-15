"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"

export function ProductsGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const t = useTranslations()

  const products = [
    {
      id: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759479_y-eK02YrFkD1Qf5xscDS3uYNm1Z0oCpS.jpg",
      title: t('products.items.cementingUnit.name'),
      slug: "tsementirovaniye"
    },
    {
      id: 2,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759477_y-OnujmTYlD8N1eQPCjkvA3Pr1DtMZvf.jpg",
      title: t('products.items.fracturingUnit.name'),
      slug: "grp"
    },
    {
      id: 3,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_5460756544556759489_y-nwTKwwULG6SbtsT9RqEBZ4X6Pb5CZb.jpg",
      title: t('products.items.highPressurePump.name'),
      slug: "nasos"
    }
  ]

  return (
    <section id="products" className="py-20 px-4 bg-[#0f1419]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-[#B19D76]"></div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              {t('products.title')}
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl">
            {t('products.description')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-[#1a1f2e]"
            >
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(product.image)}
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {product.title}
                </h3>
                <Link href={`/products/${product.slug}`}>
                  <Button 
                    className="w-full bg-[#B19D76] hover:bg-[#9d8a65] text-white"
                  >
                    {t('products.detailsButton')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-[#B19D76] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Product preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
