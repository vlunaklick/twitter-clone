import { useNavigateLink } from '@/hooks/useNavigateLink'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import Navbar from '@/components/app/Navbar'

export default function Error404() {
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
          <LeftArrow className="w-8 fill-slate-900 dark:fill-slate-100" />
        </Button>
        <h2 className="pl-3 font-semibold dark:text-white">Inicio</h2>
      </Header>
      <section className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center p-2 text-slate-600 dark:text-slate-300 min-[520px]:min-h-[calc(90vh-100px)]">
        <h3 className="text-center text-4xl font-bold text-slate-900 dark:text-white">
          404
        </h3>
        <p className="mt-2 text-center text-2xl font-semibold">
          Esta página no existe. Intente hacer otra busqueda.
        </p>
      </section>
      <Navbar />
    </>
  )
}
