import { useMerchantList } from '@/features/s10n/hooks/useMerchantList'
import { useSelectCurrentMerchant } from '@/store/s10n'

export const useMerchantState = () => {
  const currentMerchant = useSelectCurrentMerchant()
  const { refresh } = useMerchantList()

  return { currentMerchant, updateMerchantList: refresh }
}
