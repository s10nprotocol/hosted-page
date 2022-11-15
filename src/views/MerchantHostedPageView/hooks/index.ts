// import { fetchMerchantInfo } from '@/features/s10n/api'
import { queryMerchantInfo } from '@/features/s10n/api/graphQuer'
import { MerchantTheGraphEntity, PlanTheGraphEntity } from '@/features/s10n/types'
import { useCallback, useEffect, useState } from 'react'

type MerchantInfo = MerchantTheGraphEntity & { plans: Omit<PlanTheGraphEntity, 'merchantTokenId'>[] }

export const useLandingViewState = (merchantTokenId: string) => {
  const [merchantInfo, setMerchantInfo] = useState<MerchantInfo | null>(null)

  const updateMerchantInfo = useCallback(async () => {
    const result = await queryMerchantInfo(Number(merchantTokenId))
    if (result.data?.merchantEntity) {
      setMerchantInfo(result.data?.merchantEntity)
    }
  }, [merchantTokenId])

  useEffect(() => {
    updateMerchantInfo()
  }, [updateMerchantInfo])

  return { merchantInfo }
}
