const VARIANTS = {
  normal:
    'border-slate-200 rounded text-slate-500 hover:bg-slate-100 px-3 border dark:border-slate-700 hover:dark:bg-slate-800 dark:text-slate-400',
  rounded:
    'rounded-full text-white px-4  border border-sky-500 bg-sky-500 hover:bg-sky-600 hover:border-sky-600',
  icon: 'rounded-full p-1 transition-colors',
  nav_icon:
    'flex items-center justify-center rounded-full p-1 transition-colors hover:bg-slate-50 hover:dark:bg-slate-800',
  header_icon: 'ml-2 font-bold',
  img_cancel:
    'absolute right-1 top-1 h-6 w-6 rounded-full bg-slate-900 bg-opacity-30 text-xs text-white transition-colors hover:bg-slate-800 hover:bg-opacity-60 dark:bg-slate-400 dark:bg-opacity-30 hover:dark:bg-slate-200 hover:dark:bg-opacity-30',
  edit_profile:
    'absolute right-4 -bottom-5 rounded-full border border-slate-800 bg-slate-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-900 dark:border-slate-50 dark:bg-slate-50 dark:text-black hover:dark:border-slate-200 hover:dark:bg-slate-200',
  follow:
    'hover:bg-[#2r63eb group w-28 cursor-pointer rounded-[2rem] border py-2 px-1 text-xs  outline-none transition-colors hover:border-[#2r63eb]',
  none: '',
  disabled: 'opacity-30 transition-colors',
}

const NONE_DEFAULT = [
  'none',
  'icon',
  'nav_icon',
  'header_icon',
  'img_cancel',
  'edit_profile',
]

export default function Button({
  children,
  onClick,
  maxWidth = false,
  className,
  variant = 'normal',
  disabled = false,
}) {
  const classNameBtn =
    (!NONE_DEFAULT.includes(variant) &&
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
