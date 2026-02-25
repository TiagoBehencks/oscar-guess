type NavButtonVariant = 'ghost' | 'next' | 'primary'

type NavButtonProps = {
  onClick: () => void
  disabled?: boolean
  variant: NavButtonVariant
  children: React.ReactNode
}

const BASE =
  'px-[1.1rem] py-[0.45rem] rounded-[2px] text-[0.68rem] tracking-[0.15em] font-sans border transition-all duration-[180ms] ease-in-out'

const VARIANT_CLASSES: Record<NavButtonVariant, { enabled: string; disabled: string }> = {
  ghost: {
    enabled: 'border-[rgba(201,168,76,0.28)] text-muted bg-transparent cursor-pointer',
    disabled: 'border-[rgba(201,168,76,0.1)] text-[rgba(201,168,76,0.2)] bg-transparent cursor-default',
  },
  next: {
    enabled:
      'border-[rgba(201,168,76,0.44)] text-gold bg-[rgba(201,168,76,0.06)] cursor-pointer',
    disabled:
      'border-[rgba(201,168,76,0.12)] text-[rgba(201,168,76,0.2)] bg-transparent cursor-default',
  },
  primary: {
    enabled: 'px-[1.25rem] border-gold text-ink bg-gold cursor-pointer font-semibold',
    disabled: '',
  },
}

export function NavButton({ onClick, disabled = false, variant, children }: NavButtonProps) {
  const variantClass = disabled ? VARIANT_CLASSES[variant].disabled : VARIANT_CLASSES[variant].enabled
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${BASE} ${variantClass}`}
    >
      {children}
    </button>
  )
}
