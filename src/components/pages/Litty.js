import Avatar from '../app/Avatar'

import useTimeAgo from '@/hooks/useTimeAgo'

export default function Litty ({ name, userName, avatar, content, createdAt }) {
  const { timeAgo } = useTimeAgo(createdAt)

  return (
    <article className='px-3 py-2 flex gap-2 border-b border-slate-200'>
      <Avatar src={avatar} alt={userName} />
      <section>
        <header className='flex gap-1 items-center'>
          <strong className='text-xs min-[340px]:text-sm'>{name}</strong>
          <small className='text-slate-600 text-xs min-[340px]:block hidden'>@{userName}</small>
          <small className='text-slate-600 text-xs'>·</small>
          <date className='text-slate-600 text-xs'>{timeAgo}</date>
        </header>
        <p className='leading-snug text-sm'>
          {content}
        </p>
      </section>
    </article>
  )
}
