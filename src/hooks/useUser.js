import { useState, useEffect } from 'react'

import { onAuthStateChange, refetchUser } from '@/firebase/client'

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  const updateData = data => {
    setUser(prevUser => ({
      ...prevUser,
      ...data,
    }))
  }

  const revalidateUser = async () => {
    const newUser = await refetchUser(user.userId)
    setUser(newUser)
  }

  return {
    user,
    USER_STATES,
    updateData,
    revalidateUser,
  }
}
