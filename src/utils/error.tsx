import { ErrorDisplay } from '@/components/ErrorDisplay'
import { toast } from 'react-toastify'

export const toastError = (message: string) => {
  toast.error(<ErrorDisplay message={message} />, {
    position: 'bottom-right',
    theme: 'dark',
    data: {
      isHideInNC: true,
    },
  })
}

export const handleTxError = async (fn: () => void) => {
  try {
    await fn()
    return true
  } catch (e: any) {
    toastError(e?.message)
    return false
  }
}
