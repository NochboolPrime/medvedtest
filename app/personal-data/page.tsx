"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "@/hooks/use-translations"

export default function PersonalDataPage() {
  const t = useTranslations()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  const getTranslationArray = (key: string): string[] => {
    const value = t(key)
    return Array.isArray(value) ? value : []
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("personalData.backToHome")}
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">{t("personalData.title")}</h1>

          <p className="text-muted-foreground">
            {t("personalData.lastUpdated")}: {new Date().toLocaleDateString()}
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.operator.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.operator.content")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.purposes.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.purposes.content")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("personalData.sections.purposes.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.legal.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.legal.content")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("personalData.sections.legal.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("personalData.sections.categories.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.categories.content")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("personalData.sections.categories.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.methods.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.methods.content")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("personalData.sections.methods.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.period.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.period.content")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.rights.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.rights.content")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("personalData.sections.rights.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.security.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("personalData.sections.security.content")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("personalData.sections.contact.title")}</h2>
            <div className="text-muted-foreground leading-relaxed space-y-2">
              <p>
                <strong className="text-foreground">{t("personalData.sections.contact.company")}</strong>
              </p>
              <p>{t("personalData.sections.contact.address")}</p>
              <p>
                {t("personalData.sections.contact.phone")}:{" "}
                <a href="tel:+74957775660" className="text-primary hover:underline">
                  +7 (495) 777-56-60
                </a>
              </p>
              <p>
                {t("personalData.sections.contact.email")}:{" "}
                <a href="mailto:info@aomedved.ru" className="text-primary hover:underline">
                  info@aomedved.ru
                </a>
              </p>
            </div>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  )
}
