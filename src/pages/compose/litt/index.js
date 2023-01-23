import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'

import { saveImageAndGetURL, saveLittWithId } from '@/firebase/client'
import useUploadImage from '@/hooks/useUploadImage'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { UserContext } from '@/context/userContext'

import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import UploadImage from '@/components/svg/UploadImage'
import Avatar from '@/components/app/Avatar'
import Header from '@/components/app/Header'
import { useButtonStates } from '@/hooks/useButtonStates'

export default function ComposeTweet() {
  const { user, USER_STATES } = useContext(UserContext)
  const { router, handleBack } = useNavigateLink()
  const { status, handleLoadingState, COMPOSE_STATES } = useButtonStates()
  const [message, setMessage] = useState('')

  const {
    imgURL,
    file,
    dragged,
    handerDragEnter,
    handleDragLeave,
    handleDragDrop,
    handleRemoveImage,
    handleUploadImage,
  } = useUploadImage()

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.replace('/home')
    }
  }, [user, router, USER_STATES])

  const handleChange = e => {
    setMessage(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    handleLoadingState()
    if (message.length <= 141 && message.length > 0) {
      let imgUploadedSrc = null
      if (file) {
        imgUploadedSrc = await saveImageAndGetURL(file)
      }

      saveLittWithId({
        user_id: user.id,
        userId: user.userId,
        userName: user.userName,
        name: user.name,
        avatar: user.avatar,
        content: message,
        img: imgUploadedSrc,
      })
        .then(data => {
          setMessage('')
          router.push('/home')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  const isRemoveImageDisabled = status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear Litt / Littera</title>
      </Head>
      <Header>
        <Button onClick={handleBack} variant={'header_icon'}>
          <LeftArrow className={'w-8 fill-slate-900 dark:fill-slate-100'} />
        </Button>
        <Button
          onClick={handleSubmit}
          className="ml-auto mr-2"
          variant={'rounded'}
          disabled={isButtonDisabled}
        >
          Littiar
        </Button>
      </Header>
      <section className="flex gap-1 border-b border-slate-200 p-2 dark:border-slate-700">
        {user && <Avatar src={user.avatar} />}
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            className={
              'min-h-[140px] w-full resize-none rounded-sm border p-2 outline-none dark:bg-slate-900 ' +
              (dragged ? 'border-dashed border-sky-500' : 'border-transparent')
            }
            value={message}
            onChange={handleChange}
            maxLength={140}
            placeholder="¿Qué está pasando?"
            onDragEnter={handerDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDragDrop}
          ></textarea>
          {imgURL && (
            <picture className="relative flex max-h-[334px] max-w-[334px] items-center justify-center rounded-md bg-slate-50 shadow-inner dark:bg-slate-800">
              <Button
                onClick={() => handleRemoveImage()}
                variant={'img_cancel'}
                disabled={isRemoveImageDisabled}
              >
                ✖
              </Button>
              <img src={imgURL} className="rounded object-contain" />
            </picture>
          )}
        </form>
      </section>
      <section className="flex h-full max-h-[50px] w-full items-center border-b border-slate-200 p-1 px-4 dark:border-slate-700">
        <input
          type={'file'}
          id={'file'}
          onChange={handleUploadImage}
          accept="image/*"
          className="hidden"
        />
        <label htmlFor={'file'} className="flex items-center justify-center">
          <UploadImage
            className="w-8 cursor-pointer fill-sky-500"
            width={28}
            height={28}
          />
        </label>
      </section>
    </>
  )
}
