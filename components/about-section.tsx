"use client"

import { CheckCircle2 } from "lucide-react"
import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"

export function AboutSection() {
  const t = useTranslations()
  const { get } = useSiteContent("aboutSection")

  const title = get("title") || t("aboutSection.title")
  const description = get("description") || t("aboutSection.description")
  const whyTitle = get("whyTitle") || t("aboutSection.whyTitle")

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-6">
        {/* About Card */}
        <div className="bg-[oklch(0.18_0.01_250)] rounded-[2.5rem] p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-white/80 leading-relaxed text-pretty">{description}</p>
        </div>

        {/* Advantages Card */}
        <div className="bg-[oklch(0.18_0.01_250)] rounded-[2.5rem] p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{whyTitle}</h2>
          <ul className="space-y-4">
            {t.array("aboutSection.advantages").map((advantage: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <span className="text-lg text-white/80">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
