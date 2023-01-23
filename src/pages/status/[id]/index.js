import { useContext, useState, useEffect } from 'react'
import Link from 'next/link'

import { getLitBySlug } from '@/firebase/admin'
import { UserContext } from '@/context/userContext'
import useDateFormat from '@/hooks/useDateFormat'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import {
  addSharedToLitt,
  removeSharedFromLitt,
  addLikeToLitt,
  removeLikeFromLitt,
} from '@/firebase/client'
import { useButtonStates } from '@/hooks/useButtonStates'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Avatar from '@/components/app/Avatar'
import Reuse from '@/components/svg/Reuse'
import Like from '@/components/svg/Like'
import NavLayout from '@/components/app/NavLayout'
import LittImage from '@/components/pages/LittImage'
import Counters from '@/components/pages/status/Counters'

export default function LittPage({
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
}) {
  const { user } = useContext(UserContext)
  const { handleBack } = useNavigateLink()
  const { formattedDate } = useDateFormat(createdAt)
  const {
    state: likeState,
    handleLoadingState: handleLoadingLikeState,
    handleSuccessState: handleSuccessLikeState,
    COMPOSE_STATES,
  } = useButtonStates()

  const {
    state: shareState,
    handleLoadingState: handleLoadingShareState,
    handleSuccessState: handleSuccessShareState,
  } = useButtonStates()

  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const [likedCount, setLikedCount] = useState(likesCount)
  const [sharedCount, setSharedCount] = useState(sharesCount)

  useEffect(() => {
    if (user && likes && likes.includes(user.id)) {
      setLiked(true)
    }
  }, [likes, user])

  useEffect(() => {
    if (user && shares && shares.includes(user.id)) {
      setShared(true)
    }
  }, [shares, user])

  const handleLiked = async () => {
    handleLoadingLikeState()
    if (liked) {
      setLiked(false)
      setLikedCount(likedCount - 1)
      await removeLikeFromLitt(id, user.id)
    } else {
      setLiked(true)
      setLikedCount(likedCount + 1)
      await addLikeToLitt(id, user.id)
    }
    handleSuccessLikeState()
  }

  const handleShared = async () => {
    handleLoadingShareState()
    if (shared) {
      setShared(false)
      setSharedCount(sharedCount - 1)
      await removeSharedFromLitt(id, user.id)
    } else {
      setShared(true)
      setSharedCount(sharedCount + 1)
      await addSharedToLitt(id, user.id)
    }
    handleSuccessShareState()
  }

  const isLikeLoading = likeState === COMPOSE_STATES.LOADING

  const isShareLoading = shareState === COMPOSE_STATES.LOADING

  return (
    <>
      <NavLayout>
        <Header>
          <Button onClick={handleBack} variant={'header_icon'}>
            <LeftArrow className="w-8 fill-slate-900 dark:fill-slate-100" />
          </Button>

          <h2 className="pl-3 font-semibold">Litt</h2>
        </Header>

        <article className="p-3">
          <header className="flex items-center gap-2">
            <Link href={`/profile/${userName}`}>
              <Avatar src={avatar} />
            </Link>
            <div className="flex flex-col">
              <strong className="text-sm text-slate-900 dark:text-white">
                {name}
              </strong>
              <small className="text-xs text-slate-600 dark:text-slate-500">
                @{userName}
              </small>
            </div>
          </header>

          <footer className="flex flex-col gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
            {content && <p className="mt-2">{content}</p>}
            <LittImage src={img} alt={content} />
            <time title={formattedDate} className="text-xs text-slate-600">
              {formattedDate}
            </time>
          </footer>

          {(likedCount > 0 || sharedCount > 0) && (
            <section className="flex gap-3 border-b border-slate-200 py-2 text-xs font-medium text-slate-900 dark:border-slate-700">
              <Counters count={sharedCount} text={'Relitt'} />
              <Counters count={likedCount} text={'Me gustas'} />
            </section>
          )}

          <section className="just flex items-center gap-8 border-b border-slate-200 py-2 dark:border-slate-700">
            <div className="group flex cursor-pointer items-center justify-center gap-1">
              <Button
                variant="icon"
                className={
                  'group-hover:bg-yellow-50 group-hover:fill-yellow-800 ' +
                  (shared ? 'fill-yellow-800' : '')
                }
                disabled={isShareLoading}
                onClick={() => handleShared()}
              >
                <Reuse width={20} heigth={20} />
              </Button>
              <span className="text-xs transition-colors group-hover:text-yellow-600">
                {sharedCount > 0 ? sharedCount : ''}
              </span>
            </div>

            <div className="group flex cursor-pointer items-center justify-center gap-1">
              <Button
                variant="icon"
                className={
                  'group-hover:bg-red-50 group-hover:fill-red-500 ' +
                  (liked ? 'fill-red-500' : '')
                }
                disabled={isLikeLoading}
                onClick={() => handleLiked()}
              >
                <Like width={25} heigth={25} />
              </Button>
              <span className="text-xs transition-colors group-hover:text-red-500">
                {likedCount > 0 ? likedCount : ''}
              </span>
            </div>
          </section>
        </article>
      </NavLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const litt = await getLitBySlug(id)

  if (!litt) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...litt,
    },
  }
}
