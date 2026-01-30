"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useSiteContent } from "@/hooks/use-site-content"

export function About() {
  const t = useTranslations()
  const { get: getAbout, getItems: getAboutItems } = useSiteContent("about")

  console.log("[v0] About - Component rendering")

  const dynamicMission = useMemo(() => {
    const mission = getAbout("mission")
    console.log("[v0] About - Loading mission from DB:", mission)
    return mission
  }, [getAbout])

  const dynamicPrinciples = useMemo(() => {
    const items = getAboutItems("^principle\\d+$")
    console.log("[v0] About - Loading principles from DB:", items)
    return items.map((item) => item.value).filter(Boolean)
  }, [getAboutItems])

  const dynamicStrategy = useMemo(() => {
    const items = getAboutItems("^strategy\\d+$")
    console.log("[v0] About - Loading strategy from DB:", items)
    return items.map((item) => item.value).filter(Boolean)
  }, [getAboutItems])

  const mission = dynamicMission || t("about.mission")
  const principles = dynamicPrinciples.length > 0 ? dynamicPrinciples : t.array("about.principles")
  const strategy = dynamicStrategy.length > 0 ? dynamicStrategy : t.array("about.strategy")

  return (
    <section id="about" className="py-16 lg:py-8 2xl:py-16 px-4 bg-muted dark:bg-[#1a1f2e]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-4 2xl:mb-8"
        >
          <h2 className="text-5xl lg:text-4xl 2xl:text-5xl text-foreground mb-4 lg:mb-2 2xl:mb-4 leading-tight md:text-5xl font-medium">
            {t("about.title")}
          </h2>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 lg:mb-8 2xl:mb-20 max-w-4xl"
        >
          <h3 className="font-light mb-6 lg:mb-3 2xl:mb-6 leading-relaxed text-card-foreground text-xl lg:text-lg 2xl:text-xl md:text-justify">
            {mission}
          </h3>
        </motion.div>

        {/* Principles - Vertical list with simple numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-24 lg:mb-8 2xl:mb-24"
        >
          <h4 className="mb-8 lg:mb-4 2xl:mb-8 text-card-foreground text-5xl lg:text-4xl 2xl:text-5xl font-medium">
            {t("about.principlesTitle")}
          </h4>
          <div className="space-y-6 lg:space-y-3 2xl:space-y-6">
            {principles.map((principle: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 lg:gap-4 2xl:gap-6"
              >
                <div className="flex-shrink-0 text-5xl lg:text-4xl 2xl:text-5xl font-light text-[#B19D76]/30 leading-none pt-1 text-[rgba(181,162,123,0.83)]">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <p className="font-normal leading-relaxed pt-2 lg:pt-1 2xl:pt-2 text-card-foreground text-xl lg:text-base 2xl:text-xl md:text-justify">
                  {principle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategy - Grid cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="mb-8 lg:mb-4 2xl:mb-8 text-card-foreground text-5xl lg:text-4xl 2xl:text-5xl font-medium">
            {t("about.strategyTitle")}
          </h4>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-4 2xl:gap-6">
            {strategy.map((strategyItem: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="dark:bg-[#1a1f2e] p-8 lg:p-4 2xl:p-8 border-l-4 border-primary bg-input"
              >
                <p className="font-normal leading-relaxed text-xl lg:text-base 2xl:text-xl text-card-foreground tracking-tight">
                  {strategyItem}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
