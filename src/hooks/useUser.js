import { useState, useEffect } from 'react'

import { onAuthStateChange } from '@/firebase/client'

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  return {
    user,
    USER_STATES
  }
}
