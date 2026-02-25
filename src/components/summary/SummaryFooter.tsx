import { NavButton } from '@/components/shared/NavButton'

type SummaryFooterProps = {
  onBack: () => void
  onCopy: () => void
  copied: boolean
}

export function SummaryFooter({ onBack, onCopy, copied }: SummaryFooterProps) {
  return (
    <footer className="shrink-0 flex items-center justify-between px-6 md:px-14 lg:px-20 py-5 separator-top">
      <NavButton variant="ghost" onClick={onBack}>
        ← EDITAR PALPITES
      </NavButton>

      <NavButton variant="primary" onClick={onCopy}>
        {copied ? '✓ COPIADO!' : 'COMPARTILHAR'}
      </NavButton>
    </footer>
  )
}
