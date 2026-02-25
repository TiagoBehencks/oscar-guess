'use client'

import { useState } from 'react'
import type { Category, Selections } from '@/types/oscar'
import { SummaryHeader } from './SummaryHeader'
import { SummaryRow } from './SummaryRow'
import { SummaryFooter } from './SummaryFooter'

type SummaryViewProps = {
  categories: Category[]
  selections: Selections
  onBack: () => void
}

function buildShareText(categories: Category[], selections: Selections): string {
  const lines = ['🏆 Meus Palpites — Oscar 2026', '']

  for (const category of categories) {
    const nomineeId = selections[category.id]
    const nominee = category.nominees.find((n) => n.id === nomineeId)
    const categoryLabel = `${category.label} ${category.title}`.trim()

    if (nominee) {
      const nomineeLine = nominee.subtitle
        ? `${nominee.name} · ${nominee.subtitle}`
        : nominee.name
      lines.push(`${category.number}. ${categoryLabel}`)
      lines.push(`   → ${nomineeLine}`)
    } else {
      lines.push(`${category.number}. ${categoryLabel}`)
      lines.push(`   → (sem palpite)`)
    }
  }

  return lines.join('\n')
}

export function SummaryView({ categories, selections, onBack }: SummaryViewProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = buildShareText(categories, selections)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <main className="flex-1 px-6 md:px-14 lg:px-20 py-10 md:py-14 max-w-4xl mx-auto w-full">
        <SummaryHeader />

        <div className="separator-top">
          {categories.map((category, i) => {
            const nomineeId = selections[category.id]
            const nominee = category.nominees.find((n) => n.id === nomineeId)
            return (
              <SummaryRow key={category.id} category={category} nominee={nominee} index={i} />
            )
          })}
        </div>
      </main>

      <SummaryFooter onBack={onBack} onCopy={handleCopy} copied={copied} />
    </>
  )
}
