"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"
import { useTranslations } from "@/hooks/use-translations"
import { useLanguage } from "@/components/language-provider"

export default function UserAgreementPage() {
  const t = useTranslations()
  const { locale } = useLanguage()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  // Russian content
  const ruContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <p>
        Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между Обществом с ограниченной ответственностью «ТОРГОВЫЙ ДОМ «МЕДВЕДЬ» (далее ТД Медведь или Администрация) с одной стороны и пользователем сайта с другой.
      </p>
      <p>
        Сайт ТД Медведь не является средством массовой информации. Используя сайт, Вы соглашаетесь с условиями данного соглашения. Если Вы не согласны с условиями данного соглашения, не используйте сайт ТД Медведь!
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Права и обязанности сторон</h2>
        
        <h3 className="text-lg font-medium mb-3 text-foreground">Пользователь имеет право:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>осуществлять поиск информации на сайте</li>
          <li>получать информацию на сайте</li>
          <li>комментировать контент, выложенный на сайте</li>
          <li>копировать информацию на другие сайты с указанием источника</li>
          <li>требовать от администрации скрытия любой информации о пользователе</li>
          <li>требовать от администрации скрытия любой информации переданной пользователем сайту</li>
          <li>использовать информацию сайта в личных некоммерческих целях</li>
          <li>использовать информацию сайта в коммерческих целях с разрешения Администрации</li>
          <li>использовать информацию сайта в коммерческих целях с разрешения правообладателей</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">Администрация имеет право:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>по своему усмотрению и необходимости создавать, изменять, отменять правила</li>
          <li>ограничивать доступ к любой информации на сайте</li>
          <li>создавать, изменять, удалять информацию</li>
          <li>удалять учетные записи</li>
          <li>отказывать в регистрации без объяснения причин</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">Пользователь обязуется:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>обеспечивать сохранность личных данных от доступа третьих лиц</li>
          <li>обновлять Персональные данные, предоставленные при регистрации, в случае их изменения</li>
          <li>не распространять информацию, которая направлена на пропаганду войны, разжигание национальной, расовой или религиозной ненависти и вражды</li>
          <li>не нарушать работоспособность сайта</li>
          <li>не создавать несколько учётных записей на Сайте, если фактически они принадлежат одному и тому же лицу</li>
          <li>не совершать действия, направленные на введение других Пользователей в заблуждение</li>
          <li>не использовать скрипты (программы) для автоматизированного сбора информации</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">Администрация обязуется:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам</li>
          <li>осуществлять разностороннюю защиту учетной записи Пользователя</li>
          <li>защищать информацию, распространение которой ограничено или запрещено законами</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Ответственность сторон</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>пользователь лично несет полную ответственность за распространяемую им информацию</li>
          <li>администрация не несёт ответственность за несовпадение ожидаемых Пользователем и реально полученных услуг</li>
          <li>администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами</li>
          <li>в случае возникновения форс-мажорной ситуации Администрация не гарантирует сохранность информации, размещённой Пользователем</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Условия действия Соглашения</h2>
        <p>Данное Соглашение вступает в силу при любом использовании данного сайта.</p>
        <p className="mt-2">Соглашение перестает действовать при появлении его новой версии.</p>
        <p className="mt-2">Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.</p>
        <p className="mt-2">Администрация не оповещает пользователей об изменении в Соглашении.</p>
      </section>
    </div>
  )

  // English content
  const enContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <p>
        This User Agreement (hereinafter referred to as the Agreement) regulates relations between Limited Liability Company &quot;TRADING HOUSE MEDVED&quot; (hereinafter TD Medved or Administration) on the one hand and the website user on the other.
      </p>
      <p>
        The TD Medved website is not a mass media outlet. By using the site, you agree to the terms of this agreement. If you do not agree to the terms of this agreement, do not use the TD Medved site!
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Rights and Obligations of the Parties</h2>
        
        <h3 className="text-lg font-medium mb-3 text-foreground">User has the right to:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>search for information on the site</li>
          <li>receive information on the site</li>
          <li>comment on content posted on the site</li>
          <li>copy information to other sites with indication of the source</li>
          <li>require the administration to hide any information about the user</li>
          <li>require the administration to hide any information provided by the user to the site</li>
          <li>use site information for personal non-commercial purposes</li>
          <li>use site information for commercial purposes with Administration permission</li>
          <li>use site information for commercial purposes with copyright holders permission</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">Administration has the right to:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>at its discretion and necessity create, modify, cancel rules</li>
          <li>restrict access to any information on the site</li>
          <li>create, modify, delete information</li>
          <li>delete user accounts</li>
          <li>refuse registration without explanation of reasons</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">User undertakes to:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>ensure the safety of personal data from third party access</li>
          <li>update Personal data provided during registration in case of changes</li>
          <li>not disseminate information aimed at propaganda of war, incitement of national, racial or religious hatred and enmity</li>
          <li>not disrupt the functionality of the site</li>
          <li>not create multiple accounts on the Site if in fact they belong to the same person</li>
          <li>not commit actions aimed at misleading other Users</li>
          <li>not use scripts (programs) for automated collection of information</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">Administration undertakes to:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>maintain the functionality of the site except in cases where this is impossible due to reasons beyond the Administration&apos;s control</li>
          <li>implement comprehensive protection of the User&apos;s account</li>
          <li>protect information the dissemination of which is restricted or prohibited by laws</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Liability of the Parties</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>the user personally bears full responsibility for the information they disseminate</li>
          <li>the administration is not responsible for the discrepancy between the services expected by the User and those actually received</li>
          <li>the administration bears no responsibility for services provided by third parties</li>
          <li>in case of force majeure the Administration does not guarantee the safety of information posted by the User</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">Terms of Agreement Validity</h2>
        <p>This Agreement comes into force with any use of this site.</p>
        <p className="mt-2">The Agreement ceases to be effective upon the appearance of its new version.</p>
        <p className="mt-2">The Administration reserves the right to unilaterally change this agreement at its discretion.</p>
        <p className="mt-2">The Administration does not notify users of changes to the Agreement.</p>
      </section>
    </div>
  )

  // Chinese content
  const zhContent = (
    <div className="text-justify space-y-6 text-muted-foreground leading-relaxed">
      <p>
        本用户协议（以下简称协议）规范有限责任公司"熊贸易公司"（以下简称熊贸易公司或管理部门）一方与网站用户另一方之间的关系。
      </p>
      <p>
        熊贸易公司网站不是大众媒体。使用该网站即表示您同意本协议的条款。如果您不同意本协议的条款，请不要使用熊贸易公司网站！
      </p>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">各方的权利和义务</h2>
        
        <h3 className="text-lg font-medium mb-3 text-foreground">用户有权：</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>在网站上搜索信息</li>
          <li>在网站上接收信息</li>
          <li>评论网站上发布的内容</li>
          <li>将信息复制到其他网站并注明来源</li>
          <li>要求管理部门隐藏关于用户的任何信息</li>
          <li>要求管理部门隐藏用户提供给网站的任何信息</li>
          <li>将网站信息用于个人非商业目的</li>
          <li>经管理部门许可将网站信息用于商业目的</li>
          <li>经版权所有者许可将网站信息用于商业目的</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">管理部门有权：</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>根据其自由裁量权和必要性创建、修改、取消规则</li>
          <li>限制对网站上任何信息的访问</li>
          <li>创建、修改、删除信息</li>
          <li>删除用户帐户</li>
          <li>拒绝注册而无需说明原因</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">用户承诺：</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>确保个人数据免受第三方访问的安全</li>
          <li>如有更改，更新注册时提供的个人数据</li>
          <li>不传播旨在宣传战争、煽动民族、种族或宗教仇恨和敌意的信息</li>
          <li>不破坏网站的功能</li>
          <li>如果实际上属于同一人，则不在网站上创建多个帐户</li>
          <li>不进行旨在误导其他用户的行为</li>
          <li>不使用脚本（程序）自动收集信息</li>
        </ul>

        <h3 className="text-lg font-medium mb-3 mt-6 text-foreground">管理部门承诺：</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>维护网站的功能，除非由于管理部门无法控制的原因而无法做到</li>
          <li>对用户帐户实施全面保护</li>
          <li>保护传播受限或被法律禁止的信息</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">各方的责任</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>用户个人对其传播的信息承担全部责任</li>
          <li>管理部门不对用户期望的服务与实际收到的服务之间的差异负责</li>
          <li>管理部门对第三方提供的服务不承担任何责任</li>
          <li>如果发生不可抗力情况，管理部门不保证用户发布的信息的安全性</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-foreground">协议有效期条款</h2>
        <p>本协议在任何使用本网站时生效。</p>
        <p className="mt-2">协议在出现新版本时停止生效。</p>
        <p className="mt-2">管理部门保留根据其自由裁量权单方面更改本协议的权利。</p>
        <p className="mt-2">管理部门不会通知用户协议的更改。</p>
      </section>
    </div>
  )

  const getTitle = () => {
    switch (locale) {
      case "en":
        return "User Agreement"
      case "zh":
        return "用户协议"
      default:
        return "Пользовательское Соглашение"
    }
  }

  const getBackText = () => {
    switch (locale) {
      case "en":
        return "Back to home"
      case "zh":
        return "返回主页"
      default:
        return "Вернуться на главную"
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
          {getBackText()}
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
