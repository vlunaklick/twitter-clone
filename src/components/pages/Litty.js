import useTimeAgo from '@/hooks/useTimeAgo'

import Avatar from '../app/Avatar'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'

export default function Litty ({ name, userName, avatar, content, createdAt, likesCount, sharedCount }) {
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
        <footer className='flex gap-8 mt-2'>
          <div className='flex items-center justify-center'>
            <button className='hover:bg-slate-50 transition-colors p-1 rounded-full'>
              <Reuse width={21} heigth={21} />
            </button>
            {likesCount > 0 ? likesCount : ''}
          </div>
          <div className='flex items-center justify-center'>
            <button className='hover:bg-slate-50 transition-colors p-1 rounded-full'>
              <Like width={21} heigth={21} />
            </button>
            {sharedCount > 0 ? sharedCount : ''}
          </div>
        </footer>
      </section>
    </article>
  )
}
