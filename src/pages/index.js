import { useEffect } from 'react'

import { loginWithGithub } from '@/firebase'
import { useUser } from '@/context/userContext'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Spinner from '@/components/svg/Spinner'

export default function Home() {
  const { isUserNotLogged, isUserNotKnown } = useUser()
  const { handleHome } = useRouterNavigation()

  useEffect(() => {
    if (!isUserNotLogged) {
      handleHome()
    }
  }, [isUserNotLogged, handleHome])

  const handleLogin = async () => {
    await loginWithGithub()
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center gap-7 p-3">
        <Hero />

        {isUserNotLogged && (
          <Button onClick={handleLogin} maxWidth={true}>
            Join us with GitHub
          </Button>
        )}

        {isUserNotKnown && <Spinner />}
      </main>
    </>
  )
}
