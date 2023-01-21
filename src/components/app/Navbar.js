import Link from 'next/link'

import Create from '../svg/Create'
import House from '../svg/House'
import Search from '../svg/Search'

export default function Navbar () {
  return (
    <nav className="sticky bottom-0 min-[520px]:max-w-[414px] w-full border-t border-slate-200 max-h-[50px] h-full bg-white flex p-2 justify-evenly">
      <Link href='/home' className='flex items-center justify-center hover:bg-slate-50 transition-colors p-1 rounded-full'>
        <House className='fill-sky-500' width={27} heigth={27} />
      </Link>
      <Link href='/search' className='flex items-center justify-center hover:bg-slate-50 transition-colors p-1 rounded-full'>
        <Search className='fill-sky-500' width={27} heigth={27} />
      </Link>
      <Link href='/compose/tweet' className='flex items-center justify-center hover:bg-slate-50 transition-colors p-1 rounded-full'>
        <Create className='fill-sky-500' width={27} heigth={27} />
      </Link>
    </nav>
  )
}
