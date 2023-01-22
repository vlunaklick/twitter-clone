import { useContext, useEffect } from 'react'

import { loginWithGithub } from '@/firebase/client'
import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'

import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Spinner from '@/components/svg/Spinner'

export default function Home() {
  const { user, USER_STATES } = useContext(UserContext)
  const { router } = useNavigateLink()

  const handleLogin = async () => {
    await loginWithGithub()
  }

  useEffect(() => {
    if (user) {
      router.replace('/home')
    }
  }, [user, router])

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-7 p-3">
        <Hero />
        {user === USER_STATES.NOT_LOGGED && (
          <Button onClick={handleLogin}>Join us with GitHub</Button>
        )}
        {user === USER_STATES.NOT_KNOWN && <Spinner />}
      </main>
    </>
  )
}
