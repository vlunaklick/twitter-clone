import { useRouter } from 'next/router'
import Link from 'next/link'

import { getLitBySlug } from '@/firebase/admin'
import useDateFormat from '@/hooks/useDateFormat'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Avatar from '@/components/app/Avatar'
import Reuse from '@/components/svg/Reuse'
import Like from '@/components/svg/Like'

export default function LittPage({
  id,
  name,
  userName,
  avatar,
  content,
  createdAt,
  likesCount,
  sharedCount,
  img,
}) {
  const { formattedDate } = useDateFormat(createdAt)

  const router = useRouter()

  const handleBack = () => {
    router.push('/home')
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
          <LeftArrow className="w-8 fill-slate-900 dark:fill-slate-100" />
        </Button>
        <h2 className="pl-3 font-semibold">Litt</h2>
      </Header>
      <article className="p-3">
        <header className="flex items-center gap-2">
          <Link href={`/profile/${userName}`}>
            <Avatar src={avatar} />
          </Link>
          <div className="flex flex-col">
            <strong className="text-sm text-slate-900 dark:text-white">
              {name}
            </strong>
            <small className="text-xs text-slate-600 dark:text-slate-500">
              @{userName}
            </small>
          </div>
        </header>
        <section className="flex flex-col gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
          {content && <p className="mt-2">{content}</p>}
          {img && (
            <picture className="mt-2 flex items-center justify-center rounded-md bg-slate-50 shadow-inner">
              <img
                src={img}
                alt={content}
                className="rounded-lg object-contain"
              />
            </picture>
          )}
          <time title={formattedDate} className="text-xs text-slate-600">
            {formattedDate}
          </time>
        </section>
        {(likesCount > 0 || sharedCount > 0) && (
          <section className="flex gap-3 border-b border-slate-200 py-2 text-xs font-medium text-slate-900 dark:border-slate-700">
            {likesCount > 0 && (
              <p>
                {likesCount}{' '}
                <span className="font-normal text-slate-500">Me gustas</span>
              </p>
            )}
            {sharedCount > 0 && (
              <p>
                {sharedCount}{' '}
                <span className="font-normal text-slate-500">Relittls</span>
              </p>
            )}
          </section>
        )}
        <footer className="just flex items-center gap-8 border-b border-slate-200 py-2 dark:border-slate-700">
          <div className="group flex cursor-pointer items-center justify-center gap-1">
            <button className="rounded-full fill-slate-800 p-1 transition-colors group-hover:bg-yellow-50 group-hover:fill-yellow-600 dark:fill-slate-100">
              <Reuse width={20} heigth={20} />
            </button>
            <span className="text-xs transition-colors group-hover:text-yellow-600">
              {likesCount > 0 ? likesCount : ''}
            </span>
          </div>

          <div className="group flex cursor-pointer items-center justify-center gap-1">
            <button className="rounded-full fill-slate-800 p-1 transition-colors group-hover:bg-red-50 group-hover:fill-red-500 dark:fill-slate-100">
              <Like width={25} heigth={25} />
            </button>
            <span className="text-xs transition-colors group-hover:text-red-500">
              {sharedCount > 0 ? sharedCount : ''}
            </span>
          </div>
        </footer>
      </article>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  const litt = await getLitBySlug(id)

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
