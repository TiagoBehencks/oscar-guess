'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Category, Selections, View } from '@/types/oscar'

const STORAGE_KEY = 'oscar-guess-selections-2025'

function loadSelections(): Selections {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Selections) : {}
  } catch {
    return {}
  }
}

type UseOscarGameReturn = {
  // estado
  view: View
  current: number
  category: Category
  selections: Selections

  // derivados
  selectedNomineeId: string | undefined
  totalSelected: number
  isComplete: boolean
  isFirst: boolean
  isLast: boolean

  // ações
  select: (nomineeId: string) => void
  goPrev: () => void
  goNext: () => void
  goToCategory: (index: number) => void
  setView: (view: View) => void
}

export function useOscarGame(categories: Category[]): UseOscarGameReturn {
  const [current, setCurrent] = useState(0)
  const [selections, setSelections] = useState<Selections>({})
  const [view, setView] = useState<View>('game')

  // Load from localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    const saved = loadSelections()
    if (Object.keys(saved).length > 0) setSelections(saved)
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selections))
    } catch {
      // quota exceeded or private browsing — silently ignore
    }
  }, [selections])

  const category = categories[current]
  const selectedNomineeId = selections[category.id]
  const totalSelected = Object.keys(selections).length
  const isComplete = totalSelected === categories.length
  const isFirst = current === 0
  const isLast = current === categories.length - 1

  const select = useCallback(
    (nomineeId: string) => {
      setSelections((prev) => ({ ...prev, [category.id]: nomineeId }))
    },
    [category.id],
  )

  const goPrev = () => {
    if (!isFirst) setCurrent((i) => i - 1)
  }

  const goNext = () => {
    if (!isLast) setCurrent((i) => i + 1)
  }

  const goToCategory = (index: number) => {
    setCurrent(index)
  }

  return {
    view,
    setView,
    current,
    category,
    selections,
    selectedNomineeId,
    totalSelected,
    isComplete,
    isFirst,
    isLast,
    select,
    goPrev,
    goNext,
    goToCategory,
  }
}
