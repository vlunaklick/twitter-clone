import { useState, useEffect } from 'react'

const LITTS_OPTIONS = {
  LITTS: 'litts',
  LIKED_LITTS: 'likedLitts',
  SHARED_LITTS: 'sharedLitts',
}

export const useLittsShown = () => {
  const [littsShown, setLittsShown] = useState(LITTS_OPTIONS.LITTS)

  useEffect(() => {
    setLittsShown(LITTS_OPTIONS.LITTS)
  }, [])

  const showLikedLitts = () => {
    setLittsShown(LITTS_OPTIONS.LIKED_LITTS)
  }

  const showSharedLitts = () => {
    setLittsShown(LITTS_OPTIONS.SHARED_LITTS)
  }

  const showLitts = () => {
    setLittsShown(LITTS_OPTIONS.LITTS)
  }

  return {
    littsShown,
    LITTS_OPTIONS,
    showLikedLitts,
    showSharedLitts,
    showLitts,
  }
}
