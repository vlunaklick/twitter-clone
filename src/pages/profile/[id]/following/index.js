import { fetchUserByField, fetchFollowing } from '@/firebase'
import { useUser } from '@/context/userContext'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'

import NavLayout from '@/components/layouts/NavLayout'
import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import UserCardShort from '@/components/pages/profile/UserCardShort'

export default function Following({ id, following }) {
  const { user } = useUser()

  const { handleBack } = useRouterNavigation()

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
          <UserCardShort key={userF.id} {...userF} main_user={user} />
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
