import { useRouter } from 'next/router'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Navbar from '@/components/app/Navbar'

export default function Error404 () {
  const router = useRouter()

  const handleBack = () => {
    router.push('/home')
  }

  return (
    <>
      <Header>
        <Button onClick={handleBack} maxWidth={false} className='font-bold ml-2' variant={'none'}>
          <LeftArrow className={'fill-slate-900 w-8'} />
        </Button>
        <h2 className='font-semibold pl-3'>Inicio</h2>
      </Header>
      <section className='min-[520px]:min-h-[calc(90vh-100px)] min-h-[calc(100vh-100px)] p-2 text-slate-600 flex items-center justify-center flex-col'>
        <h3 className='text-4xl font-bold text-center text-slate-900'>404</h3>
        <p className='text-2xl font-semibold text-center mt-2'>Esta página no existe. Intente hacer otra busqueda.</p>
      </section>
      <Navbar />
    </>
  )
}
