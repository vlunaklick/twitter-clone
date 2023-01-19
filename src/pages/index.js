import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { loginWithGithub, onAuthStateChange } from '@/firebase/client'

import AppLayout from '@/components/app/AppLayout'
import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Spinner from '@/components/addons/Spinner'

const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function Home () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const router = useRouter()

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

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
    <AppLayout>
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
    </AppLayout>
  )
}
