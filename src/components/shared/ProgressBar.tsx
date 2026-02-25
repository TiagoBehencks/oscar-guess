import { COLORS } from '@/constants/colors'

type ProgressBarProps = {
  /** Fração completada entre 0 e 1 */
  value: number
}

export function ProgressBar({ value }: ProgressBarProps) {
  const percentage = `${Math.min(value * 100, 100)}%`

  return (
    <div className="h-[2px] w-full shrink-0" style={{ background: 'rgba(201,168,76,0.08)' }}>
      <div
        className="h-full transition-all duration-700 ease-out"
        style={{
          width: percentage,
          background: `linear-gradient(to right, ${COLORS.goldDim}, ${COLORS.gold})`,
        }}
      />
    </div>
  )
}
