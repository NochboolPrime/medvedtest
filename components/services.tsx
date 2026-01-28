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

  // Fallback to static translations if no dynamic content
  const services =
    dynamicServices.length > 0
      ? dynamicServices
      : [
          {
            title: t("services.items.cementing.title"),
            description: t("services.items.cementing.description"),
          },
          {
            title: t("services.items.fracturing.title"),
            description: t("services.items.fracturing.description"),
          },
          {
            title: t("services.items.pumps.title"),
            description: t("services.items.pumps.description"),
          },
          {
            title: t("services.items.modernization.title"),
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
          <h2 className="text-center mb-8 lg:mb-4 2xl:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-4xl 2xl:text-5xl font-extrabold text-foreground px-2">
            {title}
          </h2>
        </div>

        <div className="max-w-7xl mx-auto" style={{ perspective: "1000px" }}>
          {services.map((service, index) => (
            <div key={index}>
              <div
                className="py-6 lg:py-3 2xl:py-6 flex gap-8 lg:gap-4 2xl:gap-8 items-start group cursor-pointer transition-all duration-500 px-8 lg:px-4 2xl:px-8 -mx-8 lg:-mx-4 2xl:-mx-8 hover:px-10 lg:hover:px-6 2xl:hover:px-10 hover:shadow-2xl hover:shadow-primary/10"
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
                <span className="text-4xl md:text-5xl lg:text-3xl 2xl:text-5xl font-bold text-muted-foreground/40 min-w-[6rem] lg:min-w-[4rem] 2xl:min-w-[6rem] group-hover:text-foreground transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}.
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
              {index < services.length - 1 && <div className="border-t border-border" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
