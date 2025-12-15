"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "@/hooks/use-translations"

export default function PrivacyPolicyPage() {
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
          {t("privacyPolicy.backToHome")}
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{t("privacyPolicy.title")}</h1>
          <h2 className="text-2xl font-semibold mb-8 text-muted-foreground">{t("privacyPolicy.subtitle")}</h2>

          <p className="text-sm text-muted-foreground mb-8">
            {t("privacyPolicy.lastUpdated")}: {new Date().toLocaleDateString()}
          </p>

          <section className="mt-8">
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.intro.text")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("privacyPolicy.intro.items").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("privacyPolicy.sections.owner.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.sections.owner.content")}</p>
            <p className="text-muted-foreground mt-2">{t("privacyPolicy.sections.owner.inn")}</p>
            <p className="text-muted-foreground">{t("privacyPolicy.sections.owner.ogrn")}</p>
            <p className="text-muted-foreground">{t("privacyPolicy.sections.owner.address")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("privacyPolicy.sections.consent.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.sections.consent.content")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.sections.consent.details")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.sections.consent.form")}</p>
            <ul className="list-disc pl-6 mt-4 text-muted-foreground space-y-2">
              {getTranslationArray("privacyPolicy.sections.consent.dataTypes").map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("privacyPolicy.sections.operations.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.sections.operations.content")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("privacyPolicy.sections.duration.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.sections.duration.content")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.sections.duration.withdrawal")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("privacyPolicy.sections.liability.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.sections.liability.content")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">{t("privacyPolicy.sections.changes.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacyPolicy.sections.changes.content")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("privacyPolicy.sections.changes.location")}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              {t("privacyPolicy.sections.confirmation.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("privacyPolicy.sections.confirmation.content")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t("privacyPolicy.sections.confirmation.dataSubject")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("privacyPolicy.sections.confirmation.awareness")}
            </p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  )
}
