import { useState, useEffect } from 'react'
import Link from 'next/link'

import useThemes from '@/hooks/useTheme'
import { useUser } from '@/context/userContext'

import Create from '../svg/Create'
import House from '../svg/House'
import Search from '../svg/Search'
import Sun from '../svg/Sun'
import Moon from '../svg/Moon'
import Person from '../svg/Person'
import Button from './Button'

export default function Navbar() {
  const [userProfile, setUserProfile] = useState('/')
  const [mounted, setMounted] = useState(false)
  const { user } = useUser()

  const { theme, toggleTheme } = useThemes()

  useEffect(() => {
    if (user) {
      setUserProfile(`/profile/${user.userName}`)
    }
  }, [user])

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <nav className="sticky bottom-0 flex h-full max-h-[50px] w-full justify-evenly border-t border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900 min-[520px]:top-0 min-[520px]:bottom-auto min-[520px]:left-0 min-[520px]:h-min min-[520px]:max-h-full min-[520px]:max-w-min min-[520px]:flex-col min-[520px]:justify-start min-[520px]:gap-6 min-[520px]:border-t-0">
      <Link
        href="/home"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-50 hover:dark:bg-gray-800"
      >
        <House className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <Link
        href={userProfile}
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-50 hover:dark:bg-gray-800"
      >
        <Person className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <Link
        href="/home"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-50 hover:dark:bg-gray-800"
      >
        <Search className="fill-sky-500" width={27} heigth={27} />
      </Link>
      <Link
        href="/compose/litt"
        className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-50 hover:dark:bg-gray-800"
      >
        <Create className="fill-sky-500" width={27} heigth={27} />
      </Link>

      <Button variant="nav_icon" onClick={toggleTheme}>
        {theme === 'light' ? (
          <Sun className="fill-sky-500" width={27} heigth={27} />
        ) : (
          <Moon className="fill-sky-500" width={27} heigth={27} />
        )}
      </Button>
    </nav>
  )
}
