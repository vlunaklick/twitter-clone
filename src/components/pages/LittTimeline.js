import { useRouter } from 'next/router'
import Link from 'next/link'

import useTimeAgo from '@/hooks/useTimeAgo'

import Avatar from '../app/Avatar'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'
import useDateFormat from '@/hooks/useDateFormat'

export default function LittTimeline({
  id,
  name,
  userName,
  avatar,
  content,
  createdAt,
  likesCount,
  sharedCount,
  img,
}) {
  const { timeAgo } = useTimeAgo(createdAt)
  const { formattedDate } = useDateFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = e => {
    if (e.target.nodeName === 'ARTICLE' || e.target.nodeName === 'P') {
      router.push(`/status/${id}`)
    }
  }

  return (
    <article
      onClick={handleArticleClick}
      className="flex cursor-pointer gap-2 border-b border-slate-200 px-3 py-2 transition-colors hover:bg-slate-50 dark:border-slate-800 hover:dark:bg-slate-800"
    >
      <Link href={`/profile/${userName}`} className="h-min">
        <Avatar src={avatar} alt={userName} />
      </Link>
      <section>
        <header className="flex items-center gap-1">
          <strong className="text-xs min-[340px]:text-sm">{name}</strong>
          <small className="hidden text-xs text-slate-600 dark:text-slate-500 min-[340px]:block">
            @{userName}
          </small>
          <small className="text-xs text-slate-600 dark:text-slate-500">
            ·
          </small>
          <time
            dateTime={formattedDate}
            title={formattedDate}
            className="text-xs text-slate-600 dark:text-slate-500"
          >
            {timeAgo}
          </time>
        </header>
        <p className="text-sm leading-snug">{content}</p>
        {img && (
          <picture className="mt-2 flex max-h-[334px] max-w-[334px] items-center justify-center rounded-md bg-slate-50 shadow-inner dark:bg-slate-800">
            <img
              className="rounded-md object-contain"
              src={img}
              alt="Litt image"
            />
          </picture>
        )}
        <footer className="mt-1 flex gap-8">
          <div className="group flex items-center justify-center gap-1 fill-slate-800 dark:fill-slate-100">
            <button className="rounded-full p-1 transition-colors group-hover:bg-yellow-50 group-hover:fill-yellow-800">
              <Reuse width={14} heigth={14} />
            </button>
            <span className="text-[9px] transition-colors group-hover:text-yellow-800">
              {likesCount > 0 ? likesCount : ''}
            </span>
          </div>

          <div className="group flex items-center justify-center gap-1 fill-slate-800 dark:fill-slate-100">
            <button className="rounded-full p-1 transition-colors group-hover:bg-red-50 group-hover:fill-red-500">
              <Like width={14} heigth={14} />
            </button>
            <span className="text-[9px] transition-colors group-hover:text-red-500">
              {sharedCount > 0 ? sharedCount : ''}
            </span>
          </div>
        </footer>
      </section>
    </article>
  )
}
