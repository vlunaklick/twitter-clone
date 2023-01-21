import useTimeAgo from '@/hooks/useTimeAgo'

import Avatar from '../app/Avatar'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'

export default function Litty ({ name, userName, avatar, content, createdAt, likesCount, sharedCount, img }) {
  const { timeAgo } = useTimeAgo(createdAt)

  return (
    <article className='px-3 py-2 flex gap-2 border-b border-slate-200'>
      <Avatar src={avatar} alt={userName} />
      <section>
        <header className='flex gap-1 items-center'>
          <strong className='text-xs min-[340px]:text-sm'>{name}</strong>
          <small className='text-slate-600 text-xs min-[340px]:block hidden'>@{userName}</small>
          <small className='text-slate-600 text-xs'>·</small>
          <time className='text-slate-600 text-xs'>{timeAgo}</time>
        </header>
        <p className='leading-snug text-sm'>
          {content}
        </p>
        {img && (
          <picture className='flex items-centr justify-center max-h-[334px] max-w-[334px] mt-2 shadow-inner rounded-md bg-slate-50'>
            <img
              className='rounded-md object-contain'
              src={img} alt='Litty image'
            />
          </picture>
        )}
        <footer className='flex gap-8 mt-1'>
          <div className='flex items-center justify-center'>
            <button className='hover:bg-slate-50 transition-colors p-1 rounded-full'>
              <Reuse width={14} heigth={14} />
            </button>
            {likesCount > 0 ? likesCount : ''}
          </div>
          <div className='flex items-center justify-center'>
            <button className='hover:bg-slate-50 transition-colors p-1 rounded-full'>
              <Like width={14} heigth={14} />
            </button>
            {sharedCount > 0 ? sharedCount : ''}
          </div>
        </footer>
      </section>
    </article>
  )
}
