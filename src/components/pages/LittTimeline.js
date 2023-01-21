import { useRouter } from 'next/router'

import useTimeAgo from '@/hooks/useTimeAgo'

import Avatar from '../app/Avatar'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'
import useDateFormat from '@/hooks/useDateFormat'

export default function LittTimeline ({ id, name, userName, avatar, content, createdAt, likesCount, sharedCount, img }) {
  const { timeAgo } = useTimeAgo(createdAt)
  const { formattedDate } = useDateFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = e => {
    router.push(`/status/${id}`)
  }

  return (
    <article onClick={handleArticleClick} className='px-3 py-2 flex gap-2 border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer'>
      <Avatar src={avatar} alt={userName} />
      <section>
        <header className='flex gap-1 items-center'>
          <strong className='text-xs min-[340px]:text-sm'>{name}</strong>
          <small className='text-slate-600 text-xs min-[340px]:block hidden'>@{userName}</small>
          <small className='text-slate-600 text-xs'>·</small>
          <time dateTime={formattedDate} title={formattedDate} className='text-slate-600 text-xs'>{timeAgo}</time>
        </header>
        <p className='leading-snug text-sm'>
          {content}
        </p>
        {img && (
          <picture className='flex items-center justify-center max-h-[334px] max-w-[334px] mt-2 shadow-inner rounded-md bg-slate-50'>
            <img
              className='rounded-md object-contain'
              src={img} alt='Litt image'
            />
          </picture>
        )}
        <footer className='flex gap-8 mt-1'>

          <div className='flex items-center group justify-center gap-1'>
            <button className='transition-colors p-1 rounded-full group-hover:bg-sky-50 group-hover:fill-sky-500'>
              <Reuse width={14} heigth={14} />
            </button>
            <span className='group-hover:text-sky-500 text-[9px] transition-colors'>
              {likesCount > 0 ? likesCount : ''}
            </span>
          </div>

          <div className='flex items-center group justify-center gap-1'>
            <button className='transition-colors p-1 rounded-full group-hover:bg-red-50 group-hover:fill-red-500'>
              <Like width={14} heigth={14} />
            </button>
            <span className='group-hover:text-red-500 text-[9px] transition-colors'>
              {sharedCount > 0 ? sharedCount : ''}
            </span>
          </div>

        </footer>
      </section>
    </article>
  )
}
