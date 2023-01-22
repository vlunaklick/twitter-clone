import { useRouter } from 'next/router'

export const useNavigateLink = href => {
  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  const handleBack = () => {
    router.back()
  }

  return { router, handleClick, handleBack }
}
