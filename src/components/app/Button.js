const VARIANTS = {
  normal:
    'border-slate-200 rounded text-slate-500 hover:bg-slate-100 px-3 border dark:border-slate-700 hover:dark:bg-slate-800 dark:text-slate-400',
  rounded:
    'rounded-full text-white px-4  border border-sky-500 bg-sky-500 hover:bg-sky-600 hover:border-sky-600',
  none: '',
  disabled: 'opacity-30',
}

export default function Button({
  children,
  onClick,
  maxWidth = true,
  className,
  variant = 'normal',
  disabled = false,
}) {
  const classNameBtn =
    (variant !== 'none' &&
      'w-full py-2 text-xs font-medium transition-colors') +
    ' ' +
    (maxWidth ? 'w-full' : 'w-fit') +
    ' ' +
    className +
    ' ' +
    VARIANTS[variant] +
    ' ' +
    (disabled ? VARIANTS.disabled : '')

  return (
    <button className={classNameBtn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
