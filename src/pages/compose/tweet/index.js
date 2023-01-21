import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/hooks/useUser'
import useUploadImage from '@/hooks/useUploadImage'
import { addLitty } from '@/firebase/client'

import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Head from 'next/head'
import UploadImage from '@/components/svg/UploadImage'

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
  const { imgURL, dragged, handerDragEnter, handleDragLeave, handleDragDrop, handleRemoveImage, handleUploadImage } = useUploadImage()

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
        content: message,
        img: imgURL
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
      <Head>
        <title>Crear Litty / Littera</title>
      </Head>
      <header className="sticky top-0 w-full border-b border-slate-200 h-[50px] backdrop-blur flex items-center">
        <Button onClick={handleBack} maxWidth={false} className='font-bold ml-2' variant={'none'}>
          <LeftArrow className={'fill-slate-900 w-8'} />
        </Button>
        <Button onClick={handleSubmit} maxWidth={false} className='ml-auto mr-2' variant={'rounded'} disabled={isButtonDisabbled}>Littiar</Button>
      </header>
      <form onSubmit={handleSubmit} className={'border-b border-slate-200 p-2'}>
        <textarea className={'w-full resize-none p-2 outline-none min-h-[140px] border rounded-sm ' +
        (dragged ? 'border-sky-500 border-dashed' : 'border-transparent')}
          value={message}
          onChange={handleChange}
          maxLength={140}
          placeholder="¿Qué está pasando?"
          onDragEnter={handerDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDragDrop}
          ></textarea>
          {
            imgURL && (
              <picture className='relative'>
                <button
                  onClick={() => handleRemoveImage()}
                  className='absolute right-1 top-7 rounded-full text-white bg-slate-900 w-6 h-6 text-xs hover:bg-slate-800 bg-opacity-30 transition-colors'>✖</button>
                <img src={imgURL} className='rounded' />
              </picture>
            )
          }
      </form>
      <section className='flex w-full items-center border-b border-slate-200 p-1 px-4 max-h-[50px] h-full'>
        <input
          type={'file'}
          id={'file'}
          onChange={handleUploadImage}
          accept='image/*'
          className='hidden'
        />
        <label htmlFor={'file'} className='flex items-center justify-center'>
          <UploadImage className='fill-sky-500 w-8 cursor-pointer' width={28} height={28} />
        </label>
      </section>

    </>
  )
}
