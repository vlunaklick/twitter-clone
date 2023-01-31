/* eslint-disable @next/next/no-img-element */
import {
  fetchUserByField,
  fetchLittsByField,
  fetchLikedLitts,
} from '@/firebase'
import { useUser } from '@/context/userContext'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'
import { useFollow } from '@/hooks/useFollow'
import { useButtonStates } from '@/hooks/useButtonStates'
import { useLittsShown } from '@/hooks/useLittsShown'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import NavLayout from '@/components/layouts/NavLayout'
import Timeline from '@/components/pages/Timeline'
import ProfileInformation from '@/components/pages/profile/ProfileInformation'
import ProfileBanner from '@/components/pages/profile/ProfileBanner'
import ProfileDropdown from '@/components/pages/profile/ProfileDropdown'

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
    youFollowing,
    handleFollow,
    handleUnfollow,
  } = useFollow(followers, following, user)

  const { littsShown, showLikedLitts, showLitts, LITTS_OPTIONS } =
    useLittsShown()

  const { handleLoadingState, handleSuccessState, isButtonActive } =
    useButtonStates()

  const { handleBack, handlePush } = useRouterNavigation()

  const handleFollowClick = async () => {
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

          {user && <ProfileDropdown />}
        </Header>

        <ProfileBanner
          header={header}
          avatar={avatar}
          name={name}
          userName={userName}
          user={user}
          handleEditProfile={handleEditProfile}
          handleFollow={handleFollowClick}
          areYouFollowing={youFollowing}
          isButtonDisabled={isButtonActive}
        />

        <ProfileInformation
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
          <Timeline litts={likedLitts} connectedUserId={user?.id || ''} />
        )}

        {littsShown === LITTS_OPTIONS.LITTS && (
          <Timeline litts={litts} connectedUserId={user?.id || ''} />
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
