import type { Nominee, TmdbType } from '@/types/oscar'
import { NomineeCard } from './NomineeCard'

type NomineeGridProps = {
  nominees: Nominee[]
  selectedId: string | undefined
  onSelect: (id: string) => void
  tmdbType: TmdbType
}

export function NomineeGrid({ nominees, selectedId, onSelect, tmdbType }: NomineeGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
      {nominees.map((nominee, i) => (
        <NomineeCard
          key={nominee.id}
          nominee={nominee}
          isSelected={selectedId === nominee.id}
          onSelect={() => onSelect(nominee.id)}
          tmdbType={tmdbType}
          priority={i === 0}
        />
      ))}
    </div>
  )
}
