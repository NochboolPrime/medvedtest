"use client"

import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"
import { useMemo } from "react"

export function Services() {
  const t = useTranslations()
  const { get, getItems, loading } = useSiteContent("services")

  const dynamicServices = useMemo(() => {
    const titleItems = getItems("^service\\d+Title$")
    const descItems = getItems("^service\\d+Description$")

    return titleItems.map((titleItem) => {
      const number = titleItem.key.match(/\d+/)?.[0]
      const descItem = descItems.find((d) => d.key === `service${number}Description`)
      return {
        title: titleItem.value,
        description: descItem?.value || "",
      }
    })
  }, [getItems])

  // Fallback to static content if no dynamic content
  const services =
    dynamicServices.length > 0
      ? dynamicServices
      : [
          {
            title: "Оборудование для цементирования скважин",
            description: t("services.items.cementing.description"),
          },
          {
            title: "Оборудование для гидроразрыва пласта",
            description: t("services.items.fracturing.description"),
          },
          {
            title: "Насосное оборудование",
            description: t("services.items.pumps.description"),
          },
          {
            title: "Оборудование для модернизации и ремонта",
            description: t("services.items.modernization.description"),
          },
        ]

  const title = get("title") || t("services.title")
  const sectionVisible = get("sectionVisible") !== "false"

  if (!sectionVisible && !loading) {
    return null
  }

  return (
    <section id="services" className="py-12 lg:py-6 2xl:py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 lg:mb-6 2xl:mb-12">
          <h2 className="text-center mb-8 lg:mb-4 2xl:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl text-foreground px-2 font-medium">
            {title}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          <div className="space-y-6 lg:space-y-3 2xl:space-y-6">
            {services.map((service, index) => (
              <div key={index}>
                <div
                  className="flex gap-6 lg:gap-4 2xl:gap-6 group cursor-pointer transition-all duration-500 px-6 lg:px-4 2xl:px-6 -mx-6 lg:-mx-4 2xl:-mx-6 py-4 lg:py-2 2xl:py-4 hover:px-8 lg:hover:px-6 2xl:hover:px-8 hover:shadow-2xl hover:shadow-primary/10 rounded-lg"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s ease, box-shadow 0.5s ease, padding 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateZ(40px) rotateX(-2deg) scale(1.02)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateZ(0px) rotateX(0deg) scale(1)"
                  }}
                >
                  <span className="flex-shrink-0 text-5xl lg:text-4xl 2xl:text-5xl font-light text-[#B19D76]/30 group-hover:text-foreground transition-colors duration-300 leading-none pt-1 text-[rgba(181,162,123,0.83)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-2xl 2xl:text-3xl font-bold mb-3 lg:mb-2 2xl:mb-3 transition-transform duration-300 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-base lg:text-sm 2xl:text-base text-muted-foreground max-w-5xl leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
