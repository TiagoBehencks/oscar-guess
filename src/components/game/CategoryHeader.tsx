import type { Category } from '@/types/oscar'

type CategoryHeaderProps = {
  category: Category
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="relative mb-8 md:mb-10 min-h-[7rem]">
      <div
        aria-hidden="true"
        className="absolute -top-4 -left-3 font-display font-black text-[clamp(5.5rem,18vw,12rem)] text-[var(--gold-ghost)] leading-none select-none pointer-events-none tracking-[-0.04em]"
      >
        {category.number}
      </div>

      <div className="relative z-[1] pt-3">
        <p className="overline-label mb-[0.4rem]">{category.label}</p>
        <h1 className="font-display text-[clamp(2.75rem,7.5vw,5.5rem)] font-black text-cream leading-[0.92] tracking-[-0.025em]">
          {category.title}
        </h1>
      </div>
    </div>
  )
}
