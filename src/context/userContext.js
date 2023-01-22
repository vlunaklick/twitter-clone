import useUser from '@/hooks/useUser'
import { createContext } from 'react'

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const { user, USER_STATES } = useUser()

  return (
    <UserContext.Provider
      value={{
        user,
        USER_STATES,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
