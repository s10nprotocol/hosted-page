import { toast } from 'react-toastify'

export const toastSyncingChainData = () => {
  toast.dark(
    'Your data update is syncing by the blockchain network, it will take several seconds to show the update here. ',
    {
      position: 'top-center',
      autoClose: 10000,
      data: {
        isHideInNC: true,
      },
    }
  )
}

interface SignPayload {
  timestamp: number
  address: string
}
export const getAuthSignMessage = (payload: SignPayload) => {
  return `This is S10N, welcome!\n\nClick "Sign" to sign in. No password needed! This request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will be reset after 24 hours.\n\nWallet address:\n${payload.address}\n\ntimestamp:\n${payload.timestamp}`
}

export const validateTimestamp = (ts: number) => {
  return ts + 24 * 60 * 60 * 1000 > Date.now()
}
