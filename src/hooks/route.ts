import { useRouter } from 'next/router'

export const useRouteConfig = () => {
  const router = useRouter()
  const path = router.pathname
  const isInMerchant = /^\/merchant(\/.*)?[\/#\?]?$/i.test(path)
  const isInConsumer = /^\/consumer(\/.*)?[\/#\?]?$/i.test(path)
  return { isInMerchant, isInConsumer }
}
