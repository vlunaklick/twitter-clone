import { useContext, useEffect } from 'react'
import Head from 'next/head'

import { saveImageAndGetURL, saveLittWithId } from '@/firebase/client'
import { UserContext } from '@/context/userContext'
import useUploadImage from '@/hooks/useUploadImage'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { useInput } from '@/hooks/useInput'
import { useButtonStates } from '@/hooks/useButtonStates'

import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Avatar from '@/components/app/Avatar'
import Header from '@/components/app/Header'
import Options from '@/components/pages/compose/Options'
import ImagePreview from '@/components/pages/compose/ImagePreview'

export default function ComposeTweet() {
  const { user, USER_STATES } = useContext(UserContext)
  const { router, handleBack } = useNavigateLink()
  const { status, handleLoadingState, COMPOSE_STATES } = useButtonStates()
  const {
    value: content,
    onChange: onContentChange,
    reset: resetContent,
  } = useInput('')

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
      router.replace('/')
    }
  }, [user, router, USER_STATES])

  const handleSubmit = async e => {
    e.preventDefault()
    handleLoadingState()
    if (content.length <= 141 && content.length > 0) {
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
        content: content,
        img: imgUploadedSrc,
      })
        .then(data => {
          resetContent()
          router.push('/home')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const isButtonDisabled =
    content.length === 0 || status === COMPOSE_STATES.LOADING

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
            value={content}
            onChange={onContentChange}
            maxLength={140}
            placeholder="¿Qué está pasando?"
            onDragEnter={handerDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDragDrop}
          ></textarea>

          <ImagePreview
            imgURL={imgURL}
            handleRemoveImage={handleRemoveImage}
            isRemoveImageDisabled={isRemoveImageDisabled}
          />
        </form>
      </section>

      <Options handleUploadImage={handleUploadImage} />
    </>
  )
}
