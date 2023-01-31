import { useRouter } from 'next/router'

export const useRouterNavigation = () => {
  const router = useRouter()

  const handlePush = href => {
    router.push(href)
  }

  const handleReplace = href => {
    router.replace(href)
  }

  const handleBack = () => {
    router.back()
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleLogin = () => {
    router.replace('/')
  }

  const handleHome = () => {
    router.push('/home')
  }

  return {
    router,
    handleBack,
    handlePush,
    handleReplace,
    refreshData,
    handleLogin,
    handleHome,
  }
}
