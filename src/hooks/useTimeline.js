import { useState } from 'react'

import {
  addSharedToLitt,
  removeSharedFromLitt,
  addLikeToLitt,
  removeLikeFromLitt,
} from '@/firebase/client'

export const useTimeline = initialTimeline => {
  const [timeline, setTimeline] = useState(initialTimeline)

  const handleShared = async (litt_id, user_id) => {
    const litt = timeline.find(litt => litt.id === litt_id)

    if (litt.shares.includes(user_id)) {
      const newTimeline = timeline.map(litt => {
        if (litt.id === litt_id) {
          return {
            ...litt,
            shares: litt.shares.filter(id => id !== user_id),
            sharesCount: litt.sharesCount - 1,
          }
        }
        return litt
      })
      setTimeline(newTimeline)
      await removeSharedFromLitt(litt_id, user_id)
    } else {
      const newTimeline = timeline.map(litt => {
        if (litt.id === litt_id) {
          return {
            ...litt,
            shares: [...litt.shares, user_id],
            sharesCount: litt.sharesCount + 1,
          }
        }
        return litt
      })
      setTimeline(newTimeline)
      await addSharedToLitt(litt_id, user_id)
    }
  }

  const handleLiked = async (litt_id, user_id) => {
    const litt = timeline.find(litt => litt.id === litt_id)

    if (litt.likes.includes(user_id)) {
      const newTimeline = timeline.map(litt => {
        if (litt.id === litt_id) {
          return {
            ...litt,
            likes: litt.likes.filter(id => id !== user_id),
            likesCount: litt.likesCount - 1,
          }
        }
        return litt
      })
      setTimeline(newTimeline)
      await removeLikeFromLitt(litt_id, user_id)
    } else {
      const newTimeline = timeline.map(litt => {
        if (litt.id === litt_id) {
          return {
            ...litt,
            likes: [...litt.likes, user_id],
            likesCount: litt.likesCount + 1,
          }
        }
        return litt
      })
      setTimeline(newTimeline)
      await addLikeToLitt(litt_id, user_id)
    }
  }

  return {
    timeline,
    setTimeline,
    handleShared,
    handleLiked,
  }
}
