import { useEffect } from 'react'

import { loginWithGithub } from '@/firebase/client'
import { useUser } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'

import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Spinner from '@/components/svg/Spinner'

export default function Home() {
  const { user, USER_STATES } = useUser()
  const { handleHome } = useNavigateLink()

  useEffect(() => {
    if (user) {
      handleHome()
    }
  }, [user, handleHome])

  const handleLogin = async () => {
    await loginWithGithub()
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-7 p-3">
        <Hero />

        {user === USER_STATES.NOT_LOGGED && (
          <Button onClick={handleLogin} maxWidth={true}>
            Join us with GitHub
          </Button>
        )}

        {user === USER_STATES.NOT_KNOWN && <Spinner />}
      </main>
    </>
  )
}
