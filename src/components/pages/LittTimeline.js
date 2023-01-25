import { useState, useEffect } from 'react'
import Link from 'next/link'

import useTimeAgo from '@/hooks/useTimeAgo'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import useDateFormat from '@/hooks/useDateFormat'

import Avatar from '../app/Avatar'
import Button from '../app/Button'
import LittImage from './LittImage'
import Reuse from '../svg/Reuse'
import Like from '../svg/Like'
import DropdownLitt from './DropdownLitt'

export default function LittTimeline({
  id,
  name,
  userName,
  user_id,
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
      handlePush()
    }
  }

  return (
    <article
      onClick={handleArticleClick}
      className="flex cursor-pointer gap-2 border-b border-gray-200 px-3 py-2 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-[#141d30]"
    >
      <Link href={`/profile/${userName}`} className="h-min">
        <Avatar src={avatar} alt={userName} />
      </Link>

      <section className="w-full">
        <header className="flex items-center gap-1">
          <strong className="text-xs min-[340px]:text-sm">{name}</strong>
          <small className="hidden text-xs text-gray-600 dark:text-gray-500 min-[340px]:block">
            @{userName}
          </small>
          <small className="text-xs text-gray-600 dark:text-gray-500">·</small>
          <time
            dateTime={formattedDate}
            title={formattedDate}
            className="text-xs text-gray-600 dark:text-gray-500"
          >
            {timeAgo}
          </time>
          {user_id === mainUser_id && <DropdownLitt littId={id} />}
        </header>
        <p className="mt-1 text-sm leading-snug">{content}</p>
        <LittImage src={img} alt={content} />
        <footer className="mt-1 flex gap-8">
          <div className="group flex items-center justify-center gap-1 fill-gray-800 dark:fill-gray-100">
            <Button
              variant="icon"
              className={
                'group-hover:bg-yellow-50 group-hover:fill-yellow-500 ' +
                (isShared ? 'fill-yellow-500' : '')
              }
              onClick={() => handleShared(id, mainUser_id)}
            >
              <Reuse width={14} heigth={14} />
            </Button>
            <span className="text-[9px] transition-colors group-hover:text-yellow-500">
              {sharesCount > 0 ? sharesCount : ''}
            </span>
          </div>

          <div className="group flex items-center justify-center gap-1 fill-gray-800 dark:fill-gray-100">
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
