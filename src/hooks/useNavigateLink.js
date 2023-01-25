import { useRouter } from 'next/router'

export const useNavigateLink = href => {
  const router = useRouter()

  const handlePush = e => {
    router.push(href)
  }

  const handleReplace = e => {
    router.replace(href)
  }

  const handleBack = () => {
    router.back()
  }

  const refreshData = () => {
    router.replace(router.asPath)
  }

  return { router, handleBack, handlePush, handleReplace, refreshData }
}
