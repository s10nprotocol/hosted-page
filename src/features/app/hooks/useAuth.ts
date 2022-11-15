import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { getAuthSignMessage, validateTimestamp } from '../utils'

let isAuthing = false

type AuthInfo = Record<string, number>

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useLocalStorage<AuthInfo>('authInfo', {})

  const { provider, account } = useWeb3React()
  const signer = provider?.getSigner()
  const auth = useCallback(async () => {
    if (account && signer && !isAuthing) {
      isAuthing = true
      const ts = Date.now()
      const message = getAuthSignMessage({ address: account, timestamp: ts })
      try {
        const signature = await signer.signMessage(message)
        const result = await fetch('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({ address: account, timestamp: ts, signature }),
        }).then((res) => res.json())
        if (result.success) {
          setAuthInfo((prev) => ({ ...prev, [account]: ts }))
        }
      } catch (e) {
        console.log(e)
      } finally {
        isAuthing = false
      }
    }
  }, [account, setAuthInfo, signer])

  return {
    auth,
    isAuthorized: account && authInfo[account] && validateTimestamp(authInfo[account]),
  }
}
