import { useState, useEffect } from 'react'
import Link from 'next/link'

import { useNavigateLink } from '@/hooks/useNavigateLink'
import { useFollow } from '@/hooks/useFollow'
import { useButtonStates } from '@/hooks/useButtonStates'

import Avatar from '@/components/app/Avatar'
import Button from '@/components/app/Button'
import FollowButton from './FollowButton'

export default function OtherUsers({
  id,
  userName,
  name,
  avatar,
  biography,
  followers,
  following,
  main_user,
}) {
  const { handlePush } = useNavigateLink(`/profile/${userName}`)
  const { status, handleLoadingState, handleSuccessState, COMPOSE_STATES } =
    useButtonStates()
  const { followersArray, followingArray, handleFollow, handleUnfollow } =
    useFollow(followers, following)

  const handleArticleClick = e => {
    if (e.target.nodeName === 'ARTICLE' || e.target.nodeName === 'P') {
      handlePush()
    }
  }

  const [youFollowing, setYouFollowing] = useState(false)

  useEffect(() => {
    if (main_user && main_user !== id) {
      const areYouFollowing = followersArray.some(
        follower => follower === main_user
      )
      setYouFollowing(areYouFollowing)
    }
  }, [main_user, followersArray])

  const handleClick = async () => {
    handleLoadingState()
    if (youFollowing) {
      await handleUnfollow(id, main_user)
    } else {
      await handleFollow(id, main_user)
    }
    handleSuccessState()
  }

  const isButtonDisabled = status === COMPOSE_STATES.LOADING

  return (
    <article
      onClick={handleArticleClick}
      className="flex cursor-pointer gap-2 border-b border-gray-200 px-3 py-2 transition-colors hover:bg-gray-50 dark:border-gray-800 hover:dark:bg-gray-800"
    >
      <Link href={`/profile/${userName}`} className="h-min">
        <Avatar src={avatar} alt={userName} />
      </Link>

      <section className="w-full">
        <header className="flex w-full justify-between">
          <div className="flex flex-col">
            <strong className="text-xs min-[340px]:text-sm">{name}</strong>
            <small className="hidden text-xs text-gray-600 dark:text-gray-500 min-[340px]:block">
              @{userName}
            </small>
          </div>
          {main_user && main_user !== id && (
            <FollowButton
              isFollowing={youFollowing}
              handleClick={handleClick}
              disabled={isButtonDisabled}
            />
          )}
        </header>

        <p className="mt-1 text-xs leading-snug">{biography}</p>
      </section>
    </article>
  )
}
