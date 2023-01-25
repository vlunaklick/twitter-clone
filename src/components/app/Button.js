const VARIANTS = {
  normal:
    'border-gray-200 rounded text-gray-500 hover:bg-gray-100 px-3 border dark:border-gray-700 hover:dark:bg-gray-800 dark:text-gray-400',
  rounded:
    'rounded-full text-white px-4  border border-sky-500 bg-sky-500 hover:bg-sky-600 hover:border-sky-600',
  icon: 'rounded-full p-1 transition-colors',
  nav_icon:
    'flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-50 hover:dark:bg-gray-800',
  header_icon: 'ml-2 font-bold',
  img_cancel:
    'absolute right-1 top-1 h-6 w-6 rounded-full bg-gray-900 bg-opacity-30 text-xs text-white transition-colors hover:bg-gray-800 hover:bg-opacity-60 dark:bg-gray-400 dark:bg-opacity-30 hover:dark:bg-gray-200 hover:dark:bg-opacity-30',
  edit_profile:
    'absolute right-4 -bottom-5 rounded-full border border-gray-800 bg-gray-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-900 dark:border-gray-50 dark:bg-gray-50 dark:text-black hover:dark:border-gray-200 hover:dark:bg-gray-200',
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
