import { useState } from 'react'

export const useOnLoad = () => {
  const [loaded, setLoaded] = useState(() => false)

  const handleLoad = () => {
    setTimeout(() => {
      setLoaded(() => true)
    }, 100)
  }

  return { loaded, handleLoad }
}
