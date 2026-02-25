import { COLORS } from '@/constants/colors'

export function GoldDivider() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px flex-1"
        style={{ background: `linear-gradient(to right, ${COLORS.gold}80, transparent)` }}
      />
      <span style={{ color: COLORS.gold, fontSize: '0.55rem', opacity: 0.7 }}>✦</span>
      <div className="h-px w-6" style={{ background: `${COLORS.gold}30` }} />
    </div>
  )
}
