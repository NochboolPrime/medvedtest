"use client"

import { motion } from "framer-motion"
import { Award, Shield, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import { useSiteContent } from "@/hooks/use-site-content"
import { useLanguage } from "@/components/language-provider"
import { useTranslations } from "@/hooks/use-translations"

export function Certificates() {
  const { get, getItems } = useSiteContent("certificates")
  const { locale } = useLanguage()
  const t = useTranslations()

  // Get all certificate items from database
  const certificateItems = getItems("certificate\\d+")

  // Group certificates by number
  const certificates: Array<{ title: string; description: string; image: string }> = []
  const certNumbers = new Set<number>()

  certificateItems.forEach((item) => {
    const match = item.key.match(/certificate(\d+)/)
    if (match) {
      certNumbers.add(Number.parseInt(match[1]))
    }
  })

  Array.from(certNumbers)
    .sort()
    .forEach((num) => {
      const title = get(`certificate${num}Title`, "")
      const description = get(`certificate${num}Description`, "")
      const image = get(`certificate${num}Image`, "/placeholder.svg?height=400&width=300")

      if (title || description) {
        certificates.push({ title, description, image })
      }
    })

  // Fallback to hardcoded certificates if database is empty
  const displayCertificates =
    certificates.length > 0
      ? certificates
      : [
          {
            title: "ISO 9001:2015",
            description:
              locale === "en"
                ? "Quality Management System"
                : locale === "zh"
                  ? "质量管理体系"
                  : "Система менеджмента качества",
            image: "/iso-9001-certificate.png",
          },
          {
            title: "ISO 14001:2015",
            description:
              locale === "en"
                ? "Environmental Management System"
                : locale === "zh"
                  ? "环境管理体系"
                  : "Система экологического менеджмента",
            image: "/iso-14001-certificate.png",
          },
          {
            title: "ISO 45001:2018",
            description:
              locale === "en"
                ? "Occupational Health and Safety Management System"
                : locale === "zh"
                  ? "职业健康安全管理体系"
                  : "Система менеджмента охраны труда",
            image: "/iso-45001-certificate.jpg",
          },
          {
            title:
              locale === "en" ? "Certificate of Conformity" : locale === "zh" ? "合格证书" : "Сертификат соответствия",
            description:
              locale === "en"
                ? "Technical Regulations of the Customs Union"
                : locale === "zh"
                  ? "海关联盟技术法规"
                  : "Техническому регламенту Таможенного союза",
            image: "/generic-certification-document.png",
          },
        ]

  const achievements = [
    {
      icon: Award,
      title: "15+ " + (locale === "en" ? "years" : locale === "zh" ? "年" : "лет"),
      description:
        locale === "en"
          ? "in transportation services market"
          : locale === "zh"
            ? "运输服务市场经验"
            : "на рынке транспортных услуг",
    },
    {
      icon: Shield,
      title: "100%",
      description: locale === "en" ? "quality guarantee" : locale === "zh" ? "质量保证" : "гарантия качества",
    },
    {
      icon: CheckCircle2,
      title: "500+",
      description: locale === "en" ? "completed projects" : locale === "zh" ? "完成项目" : "выполненных проектов",
    },
  ]

  const sectionTitle = get("title", locale === "en" ? "Certificates" : locale === "zh" ? "证书" : "Сертификаты")
  const footerText = get(
    "footer",
    locale === "en"
      ? "All our certificates are up-to-date and regularly updated in accordance with standard requirements"
      : locale === "zh"
        ? "我们所有的证书都是最新的，并根据标准要求定期更新"
        : "Все наши сертификаты актуальны и регулярно обновляются в соответствии с требованиями стандартов",
  )

  return (
    <section id="certificates" className="py-20 px-4 bg-[#0f1419]">
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
            <h2 className="text-3xl font-semibold text-white">{sectionTitle}</h2>
          </div>
        </motion.div>

        {/* Достижения */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-[#1a1f2e] p-8 rounded-lg border border-[#B19D76]/20 text-center hover:border-[#B19D76]/40 transition-all hover:transform hover:scale-105"
            >
              <div className="inline-block p-4 bg-[#B19D76]/10 rounded-full mb-4">
                <achievement.icon className="w-8 h-8 text-[#B19D76]" />
              </div>
              <h3 className="text-3xl font-bold text-[#B19D76] mb-2">{achievement.title}</h3>
              <p className="text-gray-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {displayCertificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-[#1a1f2e] rounded-lg overflow-hidden border border-[#B19D76]/10"
            >
              <div className="flex flex-col md:flex-row gap-6 p-8">
                <div className="flex-shrink-0 w-full md:w-48 h-64 relative bg-gradient-to-br from-gray-800 to-gray-900 rounded">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-white mb-3">{cert.title}</h3>
                  <p className="text-base font-normal text-gray-400 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">{footerText}</p>
        </motion.div>
      </div>
    </section>
  )
}
