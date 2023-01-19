const VARIANTS = {
  normal: 'border-slate-200 rounded text-slate-500 hover:bg-slate-100 px-3 border',
  rounded: 'rounded-full border-black text-white px-4 bg-black border',
  none: '',
  disabled: 'opacity-30'
}

export default function Button ({ children, onClick, maxWidth = true, className, variant = 'normal', disabled = false }) {
  return (
    <button
      className={'py-2 w-full font-medium text-xs transition-colors' +
        ' ' +
        (maxWidth ? 'w-full' : 'w-fit') +
        ' ' +
        className +
        ' ' +
        VARIANTS[variant] +
        ' ' +
        (disabled ? VARIANTS.disabled : '')
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
