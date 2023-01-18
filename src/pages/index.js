import { useEffect, useState } from 'react'

import { loginWithGithub, onAuthStateChange } from '@/firebase/client'

import AppLayout from '@/components/app/AppLayout'
import Button from '@/components/app/Button'
import Hero from '@/components/pages/index/Hero'
import Avatar from '@/components/app/Avatar'

export default function Home () {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChange(setUser)
  }, [])

  const handleLogin = () => {
    loginWithGithub()
      .catch(err => console.log(err))
  }

  console.log(user)

  return (
    <AppLayout>
      <main className="flex items-center flex-col justify-center p-3 gap-7">
        <Hero />
        {user === null && (
          <Button onClick={handleLogin}>Join us with GitHub</Button>
        )}
        {user && (
          <Avatar src={user.photo} alt={user.name} name={user.name} withText />
        )}
      </main>
    </AppLayout>
  )
}
