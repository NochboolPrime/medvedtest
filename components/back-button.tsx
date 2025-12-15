"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from '@/hooks/use-translations'

export function BackButton() {
  const router = useRouter()
  const t = useTranslations()

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-foreground hover:bg-muted"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.backButton')}
        </Button>
      </div>
    </div>
  )
}
