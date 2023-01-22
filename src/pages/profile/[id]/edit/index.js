import { useContext } from 'react'

import { UserContext } from '@/context/userContext'
import { useNavigateLink } from '@/hooks/useNavigateLink'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'

export default function ProfileEdit() {
  const { user } = useContext(UserContext)
  const { handleBack } = useNavigateLink()

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
        <h2 className="pl-3 font-semibold">Profile editor</h2>
      </Header>
    </>
  )
}
