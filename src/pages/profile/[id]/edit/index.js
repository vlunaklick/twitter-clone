/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from 'react'

import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import {
  fetchUserByField,
  saveImageAndGetURL,
  updateUserById,
  updateAllLittsByUserId,
} from '@/firebase/client'
import { useInput } from '@/hooks/useInput'
import useUploadImage from '@/hooks/useUploadImage'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Camara from '@/components/svg/Camara'

export default function ProfileEdit({
  id,
  name,
  userName,
  avatar,
  header,
  biography,
}) {
  const { user, USER_STATES, updateData } = useContext(UserContext)
  const { router, handleBack } = useNavigateLink()
  const { value: newName, onChange: setNewName } = useInput(name)
  const { value: newBiography, onChange: setNewBiography } = useInput(biography)

  const {
    imgURL: avatarURL,
    file: avatarFile,
    handleUploadImage: handleAvatar,
  } = useUploadImage(avatar)

  const {
    imgURL: headerURL,
    file: headerFile,
    handleUploadImage: handleHeader,
  } = useUploadImage(header)

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.replace('/home')
    }
  }, [user, router, USER_STATES])

  const handleSubmit = async e => {
    e.preventDefault()

    let avatarImgURL = avatar
    let headerImgURL = header

    if (avatarURL !== avatar) {
      avatarImgURL = await saveImageAndGetURL(avatarFile)
    }

    if (headerURL !== header) {
      headerImgURL = await saveImageAndGetURL(headerFile)
    }

    const data = {
      name: newName,
      biography: newBiography > 100 ? newBiography.slice(0, 100) : newBiography,
      avatar: avatarImgURL,
      header: headerImgURL,
    }

    updateUserById(id, data)
      .then(() => {
        updateData(data)
        updateAllLittsByUserId(id, data).then(() => {
          router.replace(`/profile/${userName}`)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Header>
        <Button
          onClick={handleBack}
          className="ml-2 font-bold"
          variant={'none'}
        >
          <LeftArrow className={'w-8 fill-slate-900 dark:fill-slate-100'} />
        </Button>
        <h2 className="pl-3 font-semibold">Editar perfil</h2>
        <Button
          className="ml-auto mr-4 w-fit text-xs"
          variant="none"
          onClick={handleSubmit}
        >
          Guardar
        </Button>
      </Header>

      <div className="relative flex h-[138px] w-full flex-col items-center justify-center border-y border-slate-200 object-cover dark:border-slate-900">
        <button className="h-full w-full overflow-hidden">
          <input
            type={'file'}
            id={'header'}
            onChange={handleHeader}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor={'header'}
            className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center bg-black object-cover opacity-60"
          >
            <Camara width={30} height={30} className={'fill-white'} />
          </label>
          <img
            className="h-full w-full object-cover"
            src={headerURL}
            alt={userName + ' header'}
          />
        </button>
        <button className="absolute left-4 -bottom-10 h-20 w-20 overflow-hidden rounded-full border-4 border-white dark:border-slate-900">
          <input
            type={'file'}
            id={'avatar'}
            onChange={handleAvatar}
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor={'avatar'}
            className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center bg-black object-cover opacity-60"
          >
            <Camara width={30} height={30} className={'fill-white'} />
          </label>
          <img
            className="aspect-square bg-slate-900 object-cover dark:bg-white"
            src={avatarURL}
            alt={name + ' avatar'}
          />
        </button>
      </div>

      <form className="mt-8 flex w-full flex-col p-4" onSubmit={handleSubmit}>
        <label className="text-xs font-medium text-slate-900 dark:text-slate-400">
          Nombre
        </label>
        <input
          className="border-b border-slate-200 bg-white pb-1 text-sm outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 focus:dark:border-sky-500"
          type="text"
          name="name"
          value={newName}
          onChange={setNewName}
        />
        <label className="mt-4 text-xs font-medium text-slate-900 dark:text-slate-400">
          Biografía
        </label>
        <textarea
          className="min-h-[50px] w-full resize-none border-b border-slate-200 bg-white pb-1 text-sm outline-none transition-colors dark:border-slate-700 dark:bg-slate-900 focus:dark:border-sky-500"
          name="biography"
          maxLength={100}
          value={newBiography}
          onChange={setNewBiography}
        />
      </form>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const user = await fetchUserByField('userName', id)

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...user,
    },
  }
}
