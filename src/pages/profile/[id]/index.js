/* eslint-disable @next/next/no-img-element */
import {
  fetchUserByField,
  fetchLittsByField,
  fetchLikedLitts,
} from '@/firebase/client'
import { useUser } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { useFollow } from '@/hooks/useFollow'
import { useButtonStates } from '@/hooks/useButtonStates'
import { useProfileLitts } from '@/hooks/useProfileLitts'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import NavLayout from '@/components/app/NavLayout'
import Timeline from '@/components/pages/Timeline'
import Information from '@/components/pages/profile/Information'
import BannerAndIcon from '@/components/pages/profile/BannerAndIcon'
import Dropdown from '@/components/pages/profile/Dropdown'

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
  likedLitts,
}) {
  const { user } = useUser()

  const {
    followersArray,
    followingArray,
    handleFollow,
    handleUnfollow,
    youFollowing,
  } = useFollow(followers, following, user)

  const { littsShown, showLikedLitts, showLitts, LITTS_OPTIONS } =
    useProfileLitts()

  const { handleLoadingState, handleSuccessState, isButtonActive } =
    useButtonStates()

  const { handleBack, handlePush } = useNavigateLink()

  const handleClick = async () => {
    handleLoadingState()
    if (youFollowing) {
      await handleUnfollow(id, user.id)
    } else {
      await handleFollow(id, user.id)
    }
    handleSuccessState()
  }

  const handleEditProfile = () => {
    handlePush(`/profile/${userName}/edit`)
  }

  return (
    <>
      <NavLayout className="w-full">
        <Header>
          <Button onClick={handleBack} variant="header_icon">
            <LeftArrow className={'w-8 fill-gray-900 dark:fill-gray-100'} />
          </Button>

          {user && <Dropdown />}
        </Header>

        <BannerAndIcon
          header={header}
          avatar={avatar}
          name={name}
          userName={userName}
          user={user}
          handleEditProfile={handleEditProfile}
          handleFollow={handleClick}
          areYouFollowing={youFollowing}
          isButtonDisabled={isButtonActive}
        />

        <Information
          name={name}
          userName={userName}
          biography={biography}
          followers={followersArray}
          following={followingArray}
        />

        <nav className="flex border-b border-gray-200 font-medium dark:border-gray-800">
          <button
            className={
              'w-full border-r border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-[#192335] ' +
              (littsShown === LITTS_OPTIONS.LITTS &&
                'bg-gray-50 dark:bg-[#141d30]')
            }
            onClick={showLitts}
          >
            Litts
          </button>
          <button
            className={
              'w-full p-2 hover:bg-gray-50 dark:hover:bg-[#192335] ' +
              (littsShown === LITTS_OPTIONS.LIKED_LITTS &&
                'bg-gray-50 dark:bg-[#141d30]')
            }
            onClick={showLikedLitts}
          >
            Me gustas
          </button>
        </nav>

        {littsShown === LITTS_OPTIONS.LIKED_LITTS && (
          <Timeline litts={likedLitts} mainUser_id={user?.id || ''} />
        )}

        {littsShown === LITTS_OPTIONS.LITTS && (
          <Timeline litts={litts} mainUser_id={user?.id || ''} />
        )}
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

  const likedLitts = await fetchLikedLitts(user.id)

  return {
    props: {
      ...user,
      litts: littsFromUser || [],
      likedLitts: likedLitts || [],
    },
  }
}
