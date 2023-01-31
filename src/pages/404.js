import { useRouterNavigation } from '@/hooks/useRouterNavigation'

import Header from '@/components/app/Header'
import Button from '@/components/app/Button'
import LeftArrow from '@/components/svg/LeftArrow'
import NavLayout from '@/components/layouts/NavLayout'

export default function Error404() {
  const { handleBack } = useRouterNavigation()

  return (
    <>
      <NavLayout>
        <Header>
          <Button onClick={handleBack} variant="header_icon">
            <LeftArrow className="w-8 fill-gray-900 dark:fill-gray-100" />
          </Button>

          <h2 className="pl-3 font-semibold dark:text-white">Inicio</h2>
        </Header>

        <section className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center p-2 text-gray-600 dark:text-gray-300 min-[520px]:min-h-[calc(90vh-100px)]">
          <h3 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
            404
          </h3>

          <p className="mt-2 text-center text-2xl font-semibold">
            Esta página no existe. Intente hacer otra busqueda.
          </p>
        </section>
      </NavLayout>
    </>
  )
}
