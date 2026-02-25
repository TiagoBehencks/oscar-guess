import type { Category, Selections } from '@/types/oscar'
import { NavButton } from '@/components/shared/NavButton'

type GameFooterProps = {
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

export function GameFooter({
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
}: GameFooterProps) {
  return (
    <footer className="shrink-0 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-6 md:px-14 lg:px-20 py-4 md:py-5 separator-top">
      <div className="flex items-center gap-1.5">
        {categories.map((cat, i) => {
          const isDone = !!selections[cat.id]
          const isActive = i === current
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onGoToCategory(i)}
              aria-label={`Ir para ${cat.title}`}
              className={[
                'h-[0.35rem] rounded-full border-none p-0 transition-all duration-300',
                isActive
                  ? 'w-[1.75rem] bg-gold cursor-default'
                  : isDone
                    ? 'w-[0.35rem] bg-[rgba(201,168,76,0.33)] cursor-pointer'
                    : 'w-[0.35rem] bg-[rgba(201,168,76,0.15)] cursor-pointer',
              ].join(' ')}
            />
          )
        })}
      </div>

      <div className="flex items-center gap-2">
        <NavButton variant="ghost" onClick={onPrev} disabled={isFirst}>
          ← ANTERIOR
        </NavButton>

        {isComplete ? (
          <NavButton variant="primary" onClick={onViewSummary}>
            VER PALPITES ✦
          </NavButton>
        ) : (
          <NavButton variant="next" onClick={onNext} disabled={isLast}>
            PRÓXIMA →
          </NavButton>
        )}
      </div>
    </footer>
  )
}
