import { useState, useEffect } from 'react'
import Link from 'next/link'

import useTimeAgo from '@/hooks/useTimeAgo'

import Avatar from '../app/Avatar'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'
import useDateFormat from '@/hooks/useDateFormat'
import Button from '../app/Button'
import LittImage from './LittImage'
import { useNavigateLink } from '@/hooks/useNavigateLink'

export default function LittTimeline({
  id,
  name,
  userName,
  avatar,
  content,
  createdAt,
  likes,
  likesCount,
  shares,
  sharesCount,
  img,
  mainUser_id,
  handleShared,
  handleLiked,
}) {
  const { timeAgo } = useTimeAgo(createdAt)
  const { formattedDate } = useDateFormat(createdAt)
  const { handlePush } = useNavigateLink(`/status/${id}`)

  const [isLiked, setIsLiked] = useState(false)
  const [isShared, setIsShared] = useState(false)

  useEffect(() => {
    setIsLiked(likes.includes(mainUser_id))
    setIsShared(shares.includes(mainUser_id))
  }, [likes, shares, mainUser_id])

  const handleArticleClick = e => {
    if (e.target.nodeName === 'ARTICLE' || e.target.nodeName === 'P') {
      handlePush(`/status/${id}`)
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
        <LittImage src={img} alt={content} />
        <footer className="mt-1 flex gap-8">
          <div className="group flex items-center justify-center gap-1 fill-slate-800 dark:fill-slate-100">
            <Button
              variant="icon"
              className={
                'group-hover:bg-yellow-50 group-hover:fill-yellow-800 ' +
                (isShared ? 'fill-yellow-800' : '')
              }
              onClick={() => handleShared(id, mainUser_id)}
            >
              <Reuse width={14} heigth={14} />
            </Button>
            <span className="text-[9px] transition-colors group-hover:text-yellow-800">
              {sharesCount > 0 ? sharesCount : ''}
            </span>
          </div>

          <div className="group flex items-center justify-center gap-1 fill-slate-800 dark:fill-slate-100">
            <Button
              variant="icon"
              className={
                'group-hover:bg-red-50 group-hover:fill-red-500 ' +
                (isLiked ? 'fill-red-500' : '')
              }
              onClick={() => handleLiked(id, mainUser_id)}
            >
              <Like width={14} heigth={14} />
            </Button>
            <span className="text-[9px] transition-colors group-hover:text-red-500">
              {likesCount > 0 ? likesCount : ''}
            </span>
          </div>
        </footer>
      </section>
    </article>
  )
}
