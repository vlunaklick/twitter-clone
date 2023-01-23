import { useState } from 'react'

import {
  addFollowerToUser,
  removeFollowerFromUser,
  addFollowingToUser,
  removeFollowingFromUser,
} from '@/firebase/client'

export const useFollow = (initialFollowers, initialFollowing) => {
  const [followersArray, setFollowersArray] = useState(initialFollowers)
  const [followingArray, setFollowingArray] = useState(initialFollowing)

  const handleFollow = async (user_id, follower_id) => {
    setFollowersArray([...followersArray, follower_id])
    await addFollowerToUser(user_id, follower_id)
    await addFollowingToUser(follower_id, user_id)
  }

  const handleUnfollow = async (user_id, follower_id) => {
    setFollowersArray(
      followersArray.filter(follower => follower !== follower_id)
    )
    await removeFollowerFromUser(user_id, follower_id)
    await removeFollowingFromUser(follower_id, user_id)
  }

  return {
    followersArray,
    followingArray,
    handleFollow,
    handleUnfollow,
  }
}
