import type { Category, Selections } from '@/types/oscar'
import { GoldDivider } from '@/components/shared/GoldDivider'
import { CategoryHeader } from './CategoryHeader'
import { NomineeGrid } from './NomineeGrid'
import { GameFooter } from './GameFooter'

type GameViewProps = {
  category: Category
  selectedNomineeId: string | undefined
  onSelect: (nomineeId: string) => void
  // props do footer
  categories: Category[]
  selections: Selections
  current: number
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
  onPrev: () => void
  onNext: () => void
  onGoToCategory: (index: number) => void
  onViewSummary: () => void
}

export function GameView({
  category,
  selectedNomineeId,
  onSelect,
  categories,
  selections,
  current,
  isFirst,
  isLast,
  isComplete,
  onPrev,
  onNext,
  onGoToCategory,
  onViewSummary,
}: GameViewProps) {
  return (
    <>
      <main className="flex-1 flex flex-col px-6 md:px-14 lg:px-20 py-8 md:py-12 max-w-6xl mx-auto w-full">
        {/* key garante que a animação reexecuta a cada troca de categoria */}
        <div key={category.id} className="category-enter flex flex-col flex-1">
          <CategoryHeader category={category} />

          <div className="mb-7 md:mb-9">
            <GoldDivider />
          </div>

          <NomineeGrid
            nominees={category.nominees}
            selectedId={selectedNomineeId}
            onSelect={onSelect}
            tmdbType={category.tmdbType}
          />
        </div>
      </main>

      <GameFooter
        categories={categories}
        selections={selections}
        current={current}
        isFirst={isFirst}
        isLast={isLast}
        isComplete={isComplete}
        onPrev={onPrev}
        onNext={onNext}
        onGoToCategory={onGoToCategory}
        onViewSummary={onViewSummary}
      />
    </>
  )
}
