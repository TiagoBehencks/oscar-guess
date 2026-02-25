import type { Category, Nominee } from '@/types/oscar'

type SummaryRowProps = {
  category: Category
  nominee: Nominee | undefined
  index: number
}

export function SummaryRow({ category, nominee, index }: SummaryRowProps) {
  return (
    <div
      className="category-enter flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 py-5 md:py-6 relative separator-bottom"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* Número ghost decorativo */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black text-[clamp(3rem,8vw,5rem)] text-[rgba(201,168,76,0.04)] leading-none select-none pointer-events-none tracking-[-0.04em]"
      >
        {category.number}
      </span>

      {/* Label da categoria */}
      <div className="shrink-0 relative z-[1]">
        <p className="text-[0.58rem] tracking-[0.28em] text-gold mb-[0.2rem] font-sans">
          {category.number} · {category.label}
        </p>
        <p className="font-display text-[clamp(1rem,2.5vw,1.25rem)] font-bold text-cream leading-[1.1] tracking-[-0.01em]">
          {category.title}
        </p>
      </div>

      {/* Linha pontilhada — apenas desktop */}
      <div className="hidden md:block flex-1 h-px mx-4 bg-[repeating-linear-gradient(to_right,rgba(201,168,76,0.15)_0px,rgba(201,168,76,0.15)_2px,transparent_2px,transparent_8px)]" />

      {/* Nominee escolhido */}
      <div className="shrink-0 md:text-right relative z-[1]">
        {nominee ? (
          <>
            <p
              className={[
                'font-display text-[clamp(1rem,2.5vw,1.2rem)] font-semibold text-gold-light leading-[1.2]',
                nominee.subtitle ? 'mb-[0.2rem]' : '',
              ].join(' ')}
            >
              {nominee.name}
            </p>
            {nominee.subtitle && (
              <p className="text-[0.7rem] text-muted italic font-sans tracking-[0.04em]">
                {nominee.subtitle}
              </p>
            )}
          </>
        ) : (
          <p className="text-[0.8rem] text-[rgba(201,168,76,0.2)]">—</p>
        )}
      </div>
    </div>
  )
}
