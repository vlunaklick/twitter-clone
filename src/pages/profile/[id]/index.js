/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'

import { fetchUserByField, fetchLittsByField } from '@/firebase/client'
import { useNavigateLink } from '@/hooks/useNavigateLink'
import { UserContext } from '@/context/userContext'
import { useTimeline } from '@/hooks/useTimeline'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import NavLayout from '@/components/app/NavLayout'
import Timeline from '@/components/pages/Timeline'
import Information from '@/components/pages/profile/Information'
import BannerAndIcon from '@/components/pages/profile/BannerAndIcon'

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

        <BannerAndIcon
          header={header}
          avatar={avatar}
          name={name}
          userName={userName}
          user={user}
          handlePush={handlePush}
          areYouFollowing={areYouFollowing}
        />

        <Information
          name={name}
          userName={userName}
          biography={biography}
          followers={followers}
          following={following}
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
