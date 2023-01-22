/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import { useState } from 'react'

import { getUserById, getLittsById } from '@/firebase/client'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import LittTimeline from '@/components/pages/LittTimeline'

export default function UserPage({
  userName,
  name,
  avatar,
  email,
  followers,
  following,
  header,
  litts,
}) {
  const [timeline, setTimeline] = useState(litts)

  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <Header>
        <Button
          onClick={handleBack}
          maxWidth={false}
          className="ml-2 font-bold"
          variant={'none'}
        >
          <LeftArrow className={'w-8 fill-slate-900 dark:fill-slate-100'} />
        </Button>
      </Header>
      <div className="relative flex w-full flex-col items-center justify-center border-y border-slate-200 object-cover dark:border-slate-700">
        <img
          className="object-cover"
          src={
            header ||
            'https://i.pinimg.com/736x/10/82/a1/1082a1628e396e67143a8bbf31513b16.jpg'
          }
          alt={name + ' header'}
        />
        <img
          className="absolute left-4 -bottom-6 h-20 w-20 rounded-full border-2 border-white object-cover dark:border-slate-900"
          src={avatar || 'https://i.pravatar.cc/300'}
          alt={name + ' avatar'}
        />
        <Button
          className={
            'absolute right-4 -bottom-6 rounded-full border border-slate-800 bg-slate-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-900 dark:border-slate-50 dark:bg-slate-50 dark:text-black hover:dark:border-slate-100 hover:dark:bg-slate-100'
          }
          variant="none"
          maxWidth={false}
        >
          Editar perfil
        </Button>
      </div>
      <div className="mt-3 flex w-full flex-col border-b border-slate-200 p-4 dark:border-slate-800">
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {name}
        </h1>
        <h2 className="text-xs text-slate-600 dark:text-slate-400">
          @{userName}
        </h2>
        <div className="mt-1 flex gap-2 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-black dark:text-white">
              {following ? following.length : 0}
            </span>{' '}
            siguiendo
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-black dark:text-white">
              {followers ? followers.length : 0}
            </span>{' '}
            seguidores
          </p>
        </div>
      </div>
      <section>
        {timeline.map(
          ({
            id,
            userName,
            name,
            avatar,
            content,
            createdAt,
            likesCount,
            sharedCount,
            img,
          }) => (
            <LittTimeline
              key={id}
              id={id}
              userName={userName}
              name={name}
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              likesCount={likesCount}
              sharedCount={sharedCount}
              img={img}
            />
          )
        )}
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const user = await getUserById('userName', id)

  if (!user) {
    return {
      notFound: true,
    }
  }

  const littsFromUser = await getLittsById('userId', user.userId)

  return {
    props: {
      ...user,
      litts: littsFromUser || [],
    },
  }
}
