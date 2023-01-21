import { useRouter } from 'next/router'

import { getLitBySlug } from '@/firebase/admin'
import useDateFormat from '@/hooks/useDateFormat'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Avatar from '@/components/app/Avatar'
import Reuse from '@/components/svg/Reuse'
import Like from '@/components/svg/Like'

export default function LittyPage ({ id, name, userName, avatar, content, createdAt, likesCount, sharedCount, img }) {
  const { formattedDate } = useDateFormat(createdAt)

  const router = useRouter()

  const handleBack = () => {
    router.push('/home')
  }

  return (
    <>
      <Header className="sticky top-0 w-full border-b border-slate-200 h-[50px] backdrop-blur flex items-center">
        <Button onClick={handleBack} maxWidth={false} className='font-bold ml-2' variant={'none'}>
          <LeftArrow className={'fill-slate-900 w-8'} />
        </Button>
        <h2 className='font-semibold pl-3'>Litty</h2>
      </Header>
      <article className='p-3'>
        <header className='flex gap-2 items-center'>
          <Avatar src={avatar} />
          <div className='flex flex-col'>
            <strong className='text-slate-900 text-sm'>
              {name}
            </strong>
            <small className='text-slate-600 text-xs'>
              @{userName}
            </small>
          </div>
        </header>
        <section className='border-b border-slate-200 pb-2 flex flex-col gap-2'>
          {content && (
            <p className='mt-2'>
              {content}
            </p>
          )}
          {img && (
            <picture className='flex items-center justify-center mt-2 shadow-inner rounded-md bg-slate-50'>
              <img
                src={img}
                alt={content}
                className='rounded-lg object-contain'
              />
            </picture>
          )}
          <time title={formattedDate} className='text-slate-600 text-xs'>
            {formattedDate}
          </time>
        </section>
       {
        (likesCount > 0 || sharedCount > 0) && (
          <section className='border-b border-slate-200 py-2 flex gap-3 text-xs text-slate-900 font-medium'>
            {
              likesCount > 0 && (
                <p>
                  {likesCount} <span className='text-slate-500 font-normal'>Me gustas</span>
                </p>
              )
            }
            {
              sharedCount > 0 && (
                <p>
                  {sharedCount} <span className='text-slate-500 font-normal'>Relittls</span>
                </p>
              )
            }
          </section>
        )
       }
        <footer className='flex gap-8 border-b border-slate-200 py-2 items-center just'>
          <div className='flex items-center group justify-center gap-1 cursor-pointer'>
            <button className='transition-colors p-1 rounded-full group-hover:bg-sky-50 group-hover:fill-sky-500'>
              <Reuse width={20} heigth={20} />
            </button>
            <span className='group-hover:text-sky-500 text-xs transition-colors'>
              {likesCount > 0 ? likesCount : ''}
            </span>
          </div>

          <div className='flex items-center group justify-center gap-1 cursor-pointer'>
            <button className='transition-colors p-1 rounded-full group-hover:bg-red-50 group-hover:fill-red-500'>
              <Like width={25} heigth={25} />
            </button>
            <span className='group-hover:text-red-500 text-xs transition-colors'>
              {sharedCount > 0 ? sharedCount : ''}
            </span>
          </div>
        </footer>
      </article>
    </>
  )
}

export async function getServerSideProps (context) {
  const { id } = context.params

  const litty = await getLitBySlug(id)

  if (!litty) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ...litty
    }
  }
}
