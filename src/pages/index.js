import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { loginWithGithub } from '@/firebase/client'

import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Spinner from '@/components/svg/Spinner'
import useUser from '@/hooks/useUser'

export default function Home () {
  const { user, USER_STATES } = useUser()
  const router = useRouter()

  const handleLogin = () => {
    loginWithGithub()
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (user) {
      router.replace('/home')
    }
  }, [user, router])

  return (
    <>
      <main className="flex items-center flex-col justify-center p-3 gap-7">
        <Hero />
        {
          user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleLogin}>Join us with GitHub</Button>
          )
        }
        {
          user === USER_STATES.NOT_KNOWN && (
            <Spinner />
          )
        }
      </main>
    </>
  )
}
