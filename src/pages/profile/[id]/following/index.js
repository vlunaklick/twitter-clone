import { useContext } from 'react'

import { fetchUserByField, fetchFollowing } from '@/firebase/client'
import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'

import NavLayout from '@/components/app/NavLayout'
import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import OtherUsers from '@/components/pages/profile/OtherUsers'

export default function Following({ id, following }) {
  const { user } = useContext(UserContext)

  const { handleBack } = useNavigateLink()

  return (
    <>
      <NavLayout className="w-full">
        <Header>
          <Button onClick={handleBack} variant="header_icon">
            <LeftArrow className={'w-8 fill-gray-900 dark:fill-gray-100'} />
          </Button>

          <div className="ml-5">
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Siguiendo
            </h1>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              {following?.length || 0} seguidos
            </p>
          </div>
        </Header>

        {following?.map(userF => (
          <OtherUsers key={userF.id} {...userF} main_user={user?.id || ''} />
        ))}
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

  const following = await fetchFollowing(user.id)

  return {
    props: {
      ...user,
      following,
    },
  }
}
