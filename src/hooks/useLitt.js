import { useState, useEffect } from 'react'

import {
  addSharedToLitt,
  removeSharedFromLitt,
  addLikeToLitt,
  removeLikeFromLitt,
  fetchLittById,
} from '@/firebase'

export const useLitt = ({
  user,
  initialLikesCount,
  initialSharesCount,
  likes,
  shares,
}) => {
  const [isLiked, setIsLiked] = useState(false)

  const [isShared, setIsShared] = useState(false)

  const [likedCount, setLikedCount] = useState(initialLikesCount)
  const [sharedCount, setSharedCount] = useState(initialSharesCount)

  useEffect(() => {
    if (user && likes && likes.includes(user.id)) {
      setIsLiked(true)
    }
  }, [likes, user])

  useEffect(() => {
    if (user && shares && shares.includes(user.id)) {
      setIsShared(true)
    }
  }, [shares, user])

  const handleLike = async (littId, userId) => {
    if (isLiked) {
      setIsLiked(false)
      setLikedCount(likedCount - 1)
      await removeLikeFromLitt(littId, user.id)
    } else {
      setIsLiked(true)
      setLikedCount(likedCount + 1)
      await addLikeToLitt(littId, user.id)
    }
  }

  const handleShare = async (littId, userId) => {
    if (isShared) {
      setIsShared(false)
      setSharedCount(sharedCount - 1)
      await removeSharedFromLitt(littId, userId)
    } else {
      setIsShared(true)
      setSharedCount(sharedCount + 1)
      await addSharedToLitt(littId, userId)
    }
  }

  return {
    isLiked,
    isShared,
    sharedCount,
    likedCount,
    handleLike,
    handleShare,
  }
}
