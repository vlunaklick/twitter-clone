/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from 'react'

import { fetchUserByField, fetchLittsByField } from '@/firebase/client'
import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { useFollow } from '@/hooks/useFollow'
import { useButtonStates } from '@/hooks/useButtonStates'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import NavLayout from '@/components/app/NavLayout'
import Timeline from '@/components/pages/Timeline'
import Information from '@/components/pages/profile/Information'
import BannerAndIcon from '@/components/pages/profile/BannerAndIcon'

export default function UserPage({
  id,
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
  const { followersArray, followingArray, handleFollow, handleUnfollow } =
    useFollow(followers, following)

  const { status, handleLoadingState, handleSuccessState, COMPOSE_STATES } =
    useButtonStates()

  const { handleBack, handlePush } = useNavigateLink(
    `/profile/${userName}/edit`
  )

  const [youFollowing, setYouFollowing] = useState(false)

  useEffect(() => {
    if (user) {
      const areYouFollowing = followersArray.some(
        follower => follower === user.id
      )
      setYouFollowing(areYouFollowing)
    }
  }, [user, followersArray])

  const handleClick = async () => {
    handleLoadingState()
    if (youFollowing) {
      await handleUnfollow(id, user.id)
    } else {
      await handleFollow(id, user.id)
    }
    handleSuccessState()
  }

  const isButtonDisabled = status === COMPOSE_STATES.LOADING

  return (
    <>
      <NavLayout className="w-full">
        <Header>
          <Button onClick={handleBack} variant="header_icon">
            <LeftArrow className={'w-8 fill-slate-900 dark:fill-slate-100'} />
          </Button>
        </Header>

        <BannerAndIcon
          header={header}
          avatar={avatar}
          name={name}
          userName={userName}
          user={user}
          handlePush={handlePush}
          handleFollow={handleClick}
          areYouFollowing={youFollowing}
          isButtonDisabled={isButtonDisabled}
        />

        <Information
          name={name}
          userName={userName}
          biography={biography}
          followers={followersArray}
          following={followingArray}
        />

        <Timeline litts={litts} mainUser_id={user?.id || ''} />
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
