"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

interface CarouselItem {
  id: string
  image_url: string
  caption_ru: string
  caption_en: string
  caption_zh: string
  order_index: number
  is_visible: boolean
  auto_slide_interval: number
}

export function ProductionCarousel() {
  const [items, setItems] = useState<CarouselItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [autoSlideInterval, setAutoSlideInterval] = useState(3000)
  const { locale } = useLanguage()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/production-carousel")
        const data = await res.json()
        console.log("[v0] ProductionCarousel - Loaded items:", data.items?.length || 0)
        if (data.items && data.items.length > 0) {
          setItems(data.items)
          // Set auto-slide interval from first item
          setAutoSlideInterval(data.items[0]?.auto_slide_interval || 3000)
        }
      } catch (error) {
        console.error("[v0] ProductionCarousel - Error loading:", error)
      }
    }
    fetchItems()
  }, [])

  useEffect(() => {
    if (isPaused || items.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoSlideInterval)

    return () => clearInterval(timer)
  }, [isPaused, items.length, autoSlideInterval])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const getCaption = (item: CarouselItem) => {
    if (locale === "en") return item.caption_en
    if (locale === "zh") return item.caption_zh
    return item.caption_ru
  }

  if (items.length === 0) {
    return null
  }

  const currentImage = items[currentIndex]

  console.log("[v0] ProductionCarousel - Current item:", currentIndex, getCaption(currentImage))

  return (
    <section className="py-16 lg:py-8 2xl:py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 lg:mb-6 2xl:mb-12"
        >
          <h2 className="text-foreground mb-2 lg:mb-1 2xl:mb-2 font-medium text-5xl lg:text-4xl 2xl:text-5xl text-center">
            {locale === "en" ? "Production" : locale === "zh" ? "生产" : "Производство"}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel container */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/9] 2xl:aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.image_url || "/placeholder.svg"}
                  alt={getCaption(currentImage)}
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                />
                {/* Gradient overlay for better caption readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm z-10 h-12 w-12 md:h-10 md:w-10 touch-manipulation"
              onClick={goToPrevious}
              aria-label="Previous"
            >
              <ChevronLeft className="h-8 w-8 md:h-6 md:w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm z-10 h-12 w-12 md:h-10 md:w-10 touch-manipulation"
              onClick={goToNext}
              aria-label="Next"
            >
              <ChevronRight className="h-8 w-8 md:h-6 md:w-6" />
            </Button>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-4 2xl:p-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-white font-normal text-center md:text-left text-2xl lg:text-xl 2xl:text-2xl"
                >
                  {getCaption(currentImage)}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-6 lg:mt-4 2xl:mt-6">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
