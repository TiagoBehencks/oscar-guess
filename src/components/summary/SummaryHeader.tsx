import { GoldDivider } from '@/components/shared/GoldDivider'

export function SummaryHeader() {
  return (
    <div className="category-enter mb-10 md:mb-14">
      <p className="overline-label mb-[0.5rem]">SEUS PALPITES</p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-black text-cream leading-[0.95] tracking-[-0.025em] mb-6">
        PALPITES
      </h1>
      <GoldDivider />
    </div>
  )
}
