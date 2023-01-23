/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'

import { fetchUserByField, fetchLittsByField } from '@/firebase/client'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { UserContext } from '@/context/userContext'
import { useTimeline } from '@/hooks/useTimeline'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import LittTimeline from '@/components/pages/LittTimeline'
import NavLayout from '@/components/app/NavLayout'

export default function UserPage({
  userName,
  name,
  avatar,
  biography,
  followers,
  following,
  header,
  litts,
}) {
  const { user } = useContext(UserContext)

  const { timeline, setTimeline, handleShared, handleLiked } =
    useTimeline(litts)

  const { handleBack, handlePush } = useNavigateLink(
    `/profile/${userName}/edit`
  )

  const handleFollow = () => {
    console.log('follow')
  }

  const areYouFollowing = following?.includes(user?.user_id)

  return (
    <>
      <NavLayout className="w-full">
        <Header>
          <Button onClick={handleBack} variant="header_icon">
            <LeftArrow className={'w-8 fill-slate-900 dark:fill-slate-100'} />
          </Button>
        </Header>
        <div className="relative flex h-[131px] w-full flex-col items-center justify-center border-y border-slate-200 object-cover dark:border-slate-900">
          <img
            className="h-full w-full object-fill"
            src={
              header ||
              'https://i.pinimg.com/736x/10/82/a1/1082a1628e396e67143a8bbf31513b16.jpg'
            }
            alt={name + ' header'}
          />
          <img
            className="absolute left-4 -bottom-10 aspect-square h-20 w-20 rounded-full border-4 border-white bg-slate-900 object-contain dark:border-slate-900 dark:bg-white"
            src={avatar || 'https://i.pravatar.cc/300'}
            alt={name + ' avatar'}
          />
          {user && user.userName === userName && (
            <Button onClick={handlePush} variant="edit_profile">
              Editar perfil
            </Button>
          )}
          {user && user.userName !== userName && (
            <Button onClick={handlePush} variant="edit_profile">
              {areYouFollowing ? 'Siguiendo' : 'Seguir'}
            </Button>
          )}
        </div>
        <div className="mt-6 flex w-full flex-col gap-2 border-b border-slate-200 p-4 dark:border-slate-800">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {name}
            </h1>
            <h2 className="text-xs text-slate-600 dark:text-slate-400">
              @{userName}
            </h2>
          </div>
          <p className="text-xs text-slate-900 dark:text-white">{biography}</p>
          <div className="flex gap-2 text-xs">
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
              likes,
              likesCount,
              shares,
              sharesCount,
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
                likes={likes}
                likesCount={likesCount}
                shares={shares}
                sharesCount={sharesCount}
                img={img}
                handleShared={handleShared}
                handleLiked={handleLiked}
                mainUser_id={user?.id || ''}
              />
            )
          )}
        </section>
      </NavLayout>
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

  const littsFromUser = await fetchLittsByField('userId', user.userId)

  return {
    props: {
      ...user,
      litts: littsFromUser || [],
    },
  }
}
