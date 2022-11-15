import { useMerchantList } from '@/features/s10n/hooks/useMerchantList'
import { useS10n } from '@/features/s10n/hooks/useS10n'
import { sleep } from '@/utils'
import { handleTxError } from '@/utils/error'
import { useCallback } from 'react'

import { toast } from 'react-toastify'

export const useCreateMerchantState = () => {
  const { createMerchant } = useS10n()
  const { refresh } = useMerchantList()

  const handleCreateMerchant = useCallback(
    async (data: { name: string; isSBT: boolean }, onClose: () => void) => {
      await handleTxError(async () => {
        const result = await createMerchant(data)
        console.log(result)
        onClose()
        const txPromise = result.wait()
        toast.promise(
          txPromise,
          {
            pending: 'Creating your merchant...',
            success: 'Created Success!',
            error: 'Created Failed!',
          },
          { theme: 'dark' }
        )
        await txPromise
        refresh()
        const udpatePromise = sleep(3000)
        toast.promise(
          udpatePromise,
          {
            pending: 'Updating your data...',
            success: 'Updated Success!',
            error: 'Updated Failed!',
          },
          {
            theme: 'dark',
          }
        )
      })
    },
    [createMerchant, refresh]
  )

  return { createMerchant: handleCreateMerchant }
}
