import { useRouter } from 'next/router'

export const useNavigateLink = href => {
  const router = useRouter()

  const handlePush = e => {
    e.preventDefault()
    router.push(href)
  }

  const handleReplace = e => {
    e.preventDefault()
    router.replace(href)
  }

  const handleBack = () => {
    router.back()
  }

  return { router, handleBack, handlePush, handleReplace }
}
