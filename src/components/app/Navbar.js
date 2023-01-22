import Link from 'next/link'

import useThemes from '@/hooks/useTheme'

import Create from '../svg/Create'
import House from '../svg/House'
import Search from '../svg/Search'
import Sun from '../svg/Sun'
import Moon from '../svg/Moon'

export default function Navbar() {
  const { theme, toggleTheme } = useThemes()

  return (
    <nav className="sticky bottom-0 flex h-full max-h-[50px] w-full justify-evenly border-t border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900 min-[520px]:max-w-[414px]">
      <Link
        href="/home"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-slate-50 hover:dark:bg-slate-800"
      >
        <House className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <Link
        href="/home"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-slate-50 hover:dark:bg-slate-800"
      >
        <Search className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <Link
        href="/compose/litt"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-slate-50 hover:dark:bg-slate-800"
      >
        <Create className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-slate-50 hover:dark:bg-slate-800"
      >
        {theme === 'light' ? (
          <Sun className="fill-sky-500" width={27} heigth={27} />
        ) : (
          <Moon className="fill-sky-500" width={27} heigth={27} />
        )}
      </button>
    </nav>
  )
}
