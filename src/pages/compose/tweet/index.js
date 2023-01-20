import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/hooks/useUser'
import { addLitty } from '@/firebase/client'

import Button from '@/components/app/Button'
import LeftArrow from '@/components/addons/LeftArrow'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1
}

export default function ComposeTweet () {
  const { user, USER_STATES } = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.replace('/home')
    }
  }, [user, router, USER_STATES])

  const handleBack = () => {
    router.push('/home')
  }

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    if (message.length <= 141 && message.length > 0) {
      addLitty({
        userId: user.userId,
        userName: user.userName,
        name: user.name,
        avatar: user.avatar,
        content: message
      })
        .then(data => {
          setMessage('')
          router.push('/home')
        })
        .catch(err => {
          console.log(err)
          setStatus(COMPOSE_STATES.ERROR)
        })
    }
  }

  const isButtonDisabbled = message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <>
      <header className="sticky top-0 w-full border-b border-slate-200 h-[50px] backdrop-blur flex items-center">
        <Button onClick={handleBack} maxWidth={false} className='font-bold ml-2' variant={'none'}>
          <LeftArrow className={'fill-slate-900 w-8'} />
        </Button>
        <Button onClick={handleSubmit} maxWidth={false} className='ml-auto mr-2' variant={'rounded'} disabled={isButtonDisabbled}>Littiar</Button>
      </header>
      <form onSubmit={handleSubmit}>
        <textarea className='w-full resize-none p-4 outline-none min-h-[140px] border-b border-slate-200'
          value={message}
          onChange={handleChange}
          maxLength={140}
          placeholder="¿Qué está pasando?"></textarea>
      </form>
    </>
  )
}
