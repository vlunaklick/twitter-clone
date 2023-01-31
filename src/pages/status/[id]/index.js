import Link from 'next/link'

import { useUser } from '@/context/userContext'
import { fetchLittById } from '@/firebase'
import { useDateFormat } from '@/hooks/useDateFormat'
import { useRouterNavigation } from '@/hooks/useRouterNavigation'
import { useLitt } from '@/hooks/useLitt'
import { useButtonStates } from '@/hooks/useButtonStates'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Avatar from '@/components/app/Avatar'
import Reuse from '@/components/svg/Reuse'
import Like from '@/components/svg/Like'
import NavLayout from '@/components/layouts/NavLayout'
import LittImage from '@/components/pages/LittImage'
import LittAmounts from '@/components/pages/status/LittAmounts'
import DropdownLitt from '@/components/pages/DropdownLitt'

export default function LittPage({
  id,
  name,
  userName,
  avatar,
  content,
  createdAt,
  likes,
  likesCount,
  shares,
  sharesCount,
  img,
}) {
  const { user } = useUser()

  const { handleBack, handleLogin } = useRouterNavigation()

  const { formattedDate } = useDateFormat(createdAt)

  const {
    handleLoadingState: handleLoadingLikeState,
    handleSuccessState: handleSuccessLikeState,
    isButtonActive: isLikeButtonActive,
  } = useButtonStates()

  const {
    handleLoadingState: handleLoadingShareState,
    handleSuccessState: handleSuccessShareState,
    isButtonActive: isShareButtonActive,
  } = useButtonStates()

  const {
    isLiked,
    isShared,
    likedCount,
    sharedCount,
    handleLike,
    handleShare,
  } = useLitt({
    user,
    initialLikesCount: likesCount,
    initialSharesCount: sharesCount,
    likes,
    shares,
  })

  const handleLiked = async () => {
    if (user === undefined) return
    if (user === null) return handleLogin()

    handleLoadingLikeState()
    await handleLike(id, user?.id)
    handleSuccessLikeState()
  }

  const handleShared = async () => {
    if (user === undefined) return
    if (user === null) return handleLogin()

    handleLoadingShareState()
    await handleShare(id, user?.id)
    handleSuccessShareState()
  }

  return (
    <>
      <NavLayout>
        <Header>
          <Button onClick={handleBack} variant={'header_icon'}>
            <LeftArrow className="w-8 fill-gray-900 dark:fill-gray-100" />
          </Button>

          <h2 className="pl-3 font-semibold">Litt</h2>
        </Header>

        <article className="p-3">
          <header className="flex items-center gap-2">
            <Link href={`/profile/${userName}`}>
              <Avatar src={avatar} />
            </Link>
            <div className="flex flex-col">
              <strong className="text-sm text-gray-900 dark:text-white">
                {name}
              </strong>
              <small className="text-xs text-gray-600 dark:text-gray-500">
                @{userName}
              </small>
            </div>
            <DropdownLitt littId={id} />
          </header>

          <footer className="flex flex-col gap-2 border-b border-gray-200 pb-2 dark:border-gray-700">
            {content && <p className="mt-2">{content}</p>}
            <LittImage src={img} alt={content} />
            <time title={formattedDate} className="text-xs text-gray-600">
              {formattedDate}
            </time>
          </footer>

          {(likedCount > 0 || sharedCount > 0) && (
            <section className="flex gap-3 border-b border-gray-200 py-2 text-xs font-medium text-gray-900 dark:border-gray-700">
              <LittAmounts count={sharedCount} text={'Relitt'} />
              <LittAmounts count={likedCount} text={'Me gustas'} />
            </section>
          )}

          <section className="just flex items-center gap-8 border-b border-gray-200 py-2 dark:border-gray-700">
            <div className="group flex items-center justify-center gap-1 fill-gray-800 dark:fill-gray-100">
              <Button
                variant="icon"
                className={
                  'group-hover:bg-yellow-50 group-hover:fill-yellow-500 ' +
                  (isShared ? 'fill-yellow-500' : '')
                }
                disabled={isShareButtonActive}
                onClick={() => handleShared()}
              >
                <Reuse width={20} heigth={20} />
              </Button>
              <span className="text-xs transition-colors group-hover:text-yellow-500">
                {sharedCount > 0 ? sharedCount : ''}
              </span>
            </div>

            <div className="group flex items-center justify-center gap-1 fill-gray-800 dark:fill-gray-100">
              <Button
                variant="icon"
                className={
                  'group-hover:bg-red-50 group-hover:fill-red-500 ' +
                  (isLiked ? 'fill-red-500' : '')
                }
                disabled={isLikeButtonActive}
                onClick={() => handleLiked()}
              >
                <Like width={25} heigth={25} />
              </Button>
              <span className="text-xs transition-colors group-hover:text-red-500">
                {likedCount > 0 ? likedCount : ''}
              </span>
            </div>
          </section>
        </article>
      </NavLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const litt = await fetchLittById(id)

  if (!litt) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...litt,
    },
  }
}
