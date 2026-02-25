type AppHeaderProps = {
  totalSelected: number
  totalCategories: number
  isComplete: boolean
  onLogoClick: () => void
}

export function AppHeader({
  totalSelected,
  totalCategories,
  isComplete,
  onLogoClick,
}: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-4 shrink-0 separator-bottom">
      <button
        type="button"
        onClick={onLogoClick}
        className="bg-transparent border-none cursor-pointer p-0"
      >
        <span className="font-display italic text-[1.1rem] text-gold tracking-[0.02em]">
          ✦ Oscar Guess
        </span>
        <span className="text-[0.65rem] tracking-[0.2em] text-muted pt-[2px] ml-3">2025</span>
      </button>

      <div className="flex items-center gap-2 text-[0.7rem] tracking-[0.08em] text-muted">
        <span className={isComplete ? 'text-gold' : 'text-muted'}>{totalSelected}</span>
        <span className="text-[rgba(201,168,76,0.25)]">/</span>
        <span>{totalCategories}</span>
        <span className="hidden sm:inline ml-1">categorias</span>
      </div>
    </header>
  )
}
