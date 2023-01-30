import { useState, useEffect, createContext, useContext } from 'react'

import { onAuthStateChange } from '@/firebase/client'

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider
      value={{
        user,
        USER_STATES,
        updateData,
        revalidateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
