"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"

export default function PrivacyPolicyPage() {
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  // Russian content
  const ruContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">1. Общие положения</h2>
        <p>
          Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Обществом с ограниченной ответственностью «ТОРГОВЫЙ ДОМ «МЕДВЕДЬ» (далее — Оператор).
        </p>
        <p className="mt-4">
          1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.
        </p>
        <p className="mt-4">
          1.2. Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://medved-neftegaz.ru.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">2. Основные понятия, используемые в Политике</h2>
        <p>2.1. Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники.</p>
        <p className="mt-2">2.2. Блокирование персональных данных — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных).</p>
        <p className="mt-2">2.3. Веб-сайт — совокупность графических и информационных материалов, а также программ для ЭВМ и баз данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://medved-neftegaz.ru.</p>
        <p className="mt-2">2.4. Информационная система персональных данных — совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</p>
        <p className="mt-2">2.5. Обезличивание персональных данных — действия, в результате которых невозможно определить без использования дополнительной информации принадлежность персональных данных конкретному Пользователю или иному субъекту персональных данных.</p>
        <p className="mt-2">2.6. Обработка персональных данных — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными.</p>
        <p className="mt-2">2.7. Оператор — государственный орган, муниципальный орган, юридическое или физическое лицо, самостоятельно или совместно с другими лицами организующие и/или осуществляющие обработку персональных данных.</p>
        <p className="mt-2">2.8. Персональные данные — любая информация, относящаяся прямо или косвенно к определенному или определяемому Пользователю веб-сайта https://medved-neftegaz.ru.</p>
        <p className="mt-2">2.9. Пользователь — любой посетитель веб-сайта https://medved-neftegaz.ru.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">3. Основные права и обязанности Оператора</h2>
        <p className="font-medium">3.1. Оператор имеет право:</p>
        <p className="mt-2">— получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;</p>
        <p className="mt-2">— в случае отзыва субъектом персональных данных согласия на обработку персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;</p>
        <p className="mt-4 font-medium">3.2. Оператор обязан:</p>
        <p className="mt-2">— предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;</p>
        <p className="mt-2">— организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;</p>
        <p className="mt-2">— публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">4. Цели обработки персональных данных</h2>
        <p><strong>Цель обработки:</strong> предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на веб-сайте</p>
        <p className="mt-2"><strong>Персональные данные:</strong> фамилия, имя, отчество; электронный адрес; номера телефонов</p>
        <p className="mt-2"><strong>Правовые основания:</strong> Федеральный закон «Об информации, информационных технологиях и о защите информации» от 27.07.2006 N 149-ФЗ</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">5. Заключительные положения</h2>
        <p>5.1. Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты sales@medved-neftegaz.ru.</p>
        <p className="mt-2">5.2. В данном документе будут отражены любые изменения политики обработки персональных данных Оператором.</p>
        <p className="mt-2">5.3. Актуальная версия Политики в свободном доступе расположена в сети Интернет по адресу https://medved-neftegaz.ru/privacy-policy.</p>
      </section>
    </div>
  )

  // English content
  const enContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">1. General Provisions</h2>
        <p>
          This personal data processing policy has been prepared in accordance with the requirements of Federal Law No. 152-FZ dated July 27, 2006 "On Personal Data" (hereinafter - the Personal Data Law) and defines the procedure for processing personal data and measures to ensure the security of personal data taken by Limited Liability Company "TRADING HOUSE MEDVED" (hereinafter - the Operator).
        </p>
        <p className="mt-4">
          1.1. The Operator sets as its most important goal and condition for carrying out its activities the observance of human and civil rights and freedoms when processing personal data, including the protection of privacy rights, personal and family secrets.
        </p>
        <p className="mt-4">
          1.2. This Operator&apos;s policy regarding personal data processing (hereinafter - the Policy) applies to all information that the Operator may receive about visitors to the https://medved-neftegaz.ru website.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">2. Basic Concepts Used in the Policy</h2>
        <p>2.1. Automated processing of personal data - processing of personal data using computer technology.</p>
        <p className="mt-2">2.2. Blocking of personal data - temporary cessation of personal data processing (except in cases where processing is necessary for clarification of personal data).</p>
        <p className="mt-2">2.3. Website - a set of graphic and informational materials, as well as computer programs and databases that ensure their availability on the Internet at the network address https://medved-neftegaz.ru.</p>
        <p className="mt-2">2.4. Personal data information system - a set of personal data contained in databases and information technologies and technical means ensuring their processing.</p>
        <p className="mt-2">2.5. Depersonalization of personal data - actions as a result of which it is impossible to determine without the use of additional information the belonging of personal data to a specific User or other subject of personal data.</p>
        <p className="mt-2">2.6. Processing of personal data - any action (operation) or set of actions (operations) performed with or without the use of automation tools with personal data.</p>
        <p className="mt-2">2.7. Operator - a state body, municipal body, legal entity or individual who independently or jointly with other persons organizes and/or carries out the processing of personal data.</p>
        <p className="mt-2">2.8. Personal data - any information relating directly or indirectly to a specific or identifiable User of the website https://medved-neftegaz.ru.</p>
        <p className="mt-2">2.9. User - any visitor to the website https://medved-neftegaz.ru.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">3. Operator&apos;s Main Rights and Obligations</h2>
        <p className="font-medium">3.1. The Operator has the right to:</p>
        <p className="mt-2">— receive reliable information and/or documents containing personal data from the subject of personal data;</p>
        <p className="mt-2">— in case of withdrawal of consent to the processing of personal data by the subject of personal data, the Operator has the right to continue processing personal data without the consent of the subject of personal data if there are grounds specified in the Personal Data Law;</p>
        <p className="mt-4 font-medium">3.2. The Operator is obliged to:</p>
        <p className="mt-2">— provide the subject of personal data, at their request, with information regarding the processing of their personal data;</p>
        <p className="mt-2">— organize the processing of personal data in accordance with the procedure established by the current legislation of the Russian Federation;</p>
        <p className="mt-2">— publish or otherwise provide unlimited access to this Policy regarding the processing of personal data.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">4. Purposes of Personal Data Processing</h2>
        <p><strong>Purpose of processing:</strong> providing the User with access to services, information and/or materials contained on the website</p>
        <p className="mt-2"><strong>Personal data:</strong> surname, name, patronymic; email address; phone numbers</p>
        <p className="mt-2"><strong>Legal grounds:</strong> Federal Law "On Information, Information Technologies and Information Protection" dated July 27, 2006 N 149-FZ</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">5. Final Provisions</h2>
        <p>5.1. The User can receive any clarifications on issues of interest regarding the processing of their personal data by contacting the Operator via email at sales@medved-neftegaz.ru.</p>
        <p className="mt-2">5.2. This document will reflect any changes to the Operator&apos;s personal data processing policy.</p>
        <p className="mt-2">5.3. The current version of the Policy is freely available on the Internet at https://medved-neftegaz.ru/privacy-policy.</p>
      </section>
    </div>
  )

  // Chinese content
  const zhContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">1. 总则</h2>
        <p>
          本个人数据处理政策根据2006年7月27日第152-FZ号联邦法律《关于个人数据》的要求制定（以下简称《个人数据法》），规定了有限责任公司"熊贸易公司"（以下简称"运营商"）处理个人数据的程序和确保个人数据安全的措施。
        </p>
        <p className="mt-4">
          1.1. 运营商将尊重公民在处理其个人数据时的权利和自由作为其活动的最重要目标和条件，包括保护隐私权、个人和家庭秘密的权利。
        </p>
        <p className="mt-4">
          1.2. 运营商关于处理个人数据的本政策（以下简称"政策"）适用于运营商可能获得的关于https://medved-neftegaz.ru网站访问者的所有信息。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">2. 政策中使用的基本概念</h2>
        <p>2.1. 个人数据的自动化处理 - 使用计算机技术处理个人数据。</p>
        <p className="mt-2">2.2. 个人数据的阻止 - 暂时停止处理个人数据（除非处理是为了澄清个人数据而必要的情况）。</p>
        <p className="mt-2">2.3. 网站 - 图形和信息材料的集合，以及确保其在互联网上通过网络地址https://medved-neftegaz.ru可访问的计算机程序和数据库。</p>
        <p className="mt-2">2.4. 个人数据信息系统 - 数据库中包含的个人数据以及确保其处理的信息技术和技术手段的集合。</p>
        <p className="mt-2">2.5. 个人数据的去标识化 - 在没有使用额外信息的情况下无法确定个人数据属于特定用户或其他个人数据主体的行为。</p>
        <p className="mt-2">2.6. 个人数据处理 - 使用或不使用自动化手段对个人数据执行的任何操作或一系列操作。</p>
        <p className="mt-2">2.7. 运营商 - 独立或与他人共同组织和/或执行个人数据处理的国家机关、市政机关、法人或个人。</p>
        <p className="mt-2">2.8. 个人数据 - 与https://medved-neftegaz.ru网站的特定或可识别用户直接或间接相关的任何信息。</p>
        <p className="mt-2">2.9. 用户 - https://medved-neftegaz.ru网站的任何访问者。</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">3. 运营商的主要权利和义务</h2>
        <p className="font-medium">3.1. 运营商有权：</p>
        <p className="mt-2">— 从个人数据主体获取包含个人数据的可靠信息和/或文件；</p>
        <p className="mt-2">— 如果个人数据主体撤回对个人数据处理的同意，运营商有权在《个人数据法》规定的情况下继续处理个人数据而无需个人数据主体的同意；</p>
        <p className="mt-4 font-medium">3.2. 运营商有义务：</p>
        <p className="mt-2">— 应个人数据主体的请求，提供有关其个人数据处理的信息；</p>
        <p className="mt-2">— 按照俄罗斯联邦现行法律规定的程序组织个人数据处理；</p>
        <p className="mt-2">— 发布或以其他方式提供对本个人数据处理政策的无限制访问。</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">4. 个人数据处理目的</h2>
        <p><strong>处理目的：</strong>为用户提供访问网站上包含的服务、信息和/或材料的权限</p>
        <p className="mt-2"><strong>个人数据：</strong>姓氏、名字、父称；电子邮件地址；电话号码</p>
        <p className="mt-2"><strong>法律依据：</strong>2006年7月27日第149-FZ号联邦法律《关于信息、信息技术和信息保护》</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">5. 最终条款</h2>
        <p>5.1. 用户可以通过电子邮件sales@medved-neftegaz.ru联系运营商，获取有关其个人数据处理的任何问题的解释。</p>
        <p className="mt-2">5.2. 本文件将反映运营商个人数据处理政策的任何变更。</p>
        <p className="mt-2">5.3. 政策的当前版本可在互联网上免费访问，网址为https://medved-neftegaz.ru/privacy-policy。</p>
      </section>
    </div>
  )

  const getTitle = () => {
    switch (locale) {
      case "en":
        return "Personal Data Processing Policy"
      case "zh":
        return "个人数据处理政策"
      default:
        return "Политика в отношении обработки персональных данных"
    }
  }

  const getContent = () => {
    switch (locale) {
      case "en":
        return enContent
      case "zh":
        return zhContent
      default:
        return ruContent
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-8 mb-12"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("privacyPolicy.backToHome")}
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground text-center">
            {getTitle()}
          </h1>

          {getContent()}
        </article>
      </div>
      <Footer />
    </main>
  )
}
