import Image from 'next/image'
import type { Nominee, TmdbType } from '@/types/oscar'
import { useNomineeImage } from '@/hooks/useNomineeImage'

type NomineeCardProps = {
  nominee: Nominee
  isSelected: boolean
  onSelect: () => void
  tmdbType: TmdbType
  priority?: boolean
}

export function NomineeCard({ nominee, isSelected, onSelect, tmdbType, priority }: NomineeCardProps) {
  // const imageUrl = useNomineeImage(nominee.name, tmdbType, nominee.tmdbId)

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        'nominee-card text-left group relative overflow-hidden flex flex-col',
        'rounded-[2px] outline-none cursor-pointer',
        'border transition-all duration-[180ms] ease-in-out',
        isSelected
          ? 'bg-[rgba(201,168,76,0.09)] border-gold shadow-[0_0_28px_rgba(201,168,76,0.1)]'
          : 'bg-[rgba(255,255,255,0.018)] border-separator',
      ].join(' ')}
    >
      {/* Imagem / skeleton */}
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        {/* {imageUrl === undefined && <div className="img-skeleton absolute inset-0" />}

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={nominee.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        )} */}

        {/* {imageUrl === null && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.018)]">
            <span className="text-[rgba(201,168,76,0.15)] text-[2rem]">✦</span>
          </div>
        )} */}

        {/* Overlay de hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[rgba(201,168,76,0.07)]" />

        {/* Linha de destaque no topo quando selecionado */}
        {isSelected && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
        )}

        {/* Indicador de selecionado */}
        {isSelected && (
          <span
            aria-hidden="true"
            className="absolute top-[0.45rem] right-[0.5rem] text-gold text-[0.65rem] leading-none drop-shadow-sm"
          >
            ✦
          </span>
        )}
      </div>

      {/* Texto */}
      <div className="px-[0.75rem] py-[0.6rem]">
        <div
          className={[
            'leading-[1.3] transition-colors duration-[180ms]',
            nominee.subtitle
              ? 'font-display text-[clamp(0.82rem,1.8vw,0.96rem)] mb-[0.2rem]'
              : 'font-display text-[clamp(0.88rem,2vw,1.05rem)]',
            isSelected ? 'font-semibold text-gold-light' : 'font-medium text-cream',
          ].join(' ')}
        >
          {nominee.name}
        </div>

        {nominee.subtitle && (
          <div
            className={[
              'text-[0.62rem] tracking-[0.05em] font-sans italic',
              'transition-colors duration-[180ms]',
              isSelected ? 'text-gold' : 'text-muted',
            ].join(' ')}
          >
            {nominee.subtitle}
          </div>
        )}
      </div>
    </button>
  )
}
