// import { fetchMerchantInfo } from '@/features/s10n/api'
import { queryMerchantInfo } from '@/features/s10n/api/graphQuer'
import { MerchantTheGraphEntity, PlanTheGraphEntity } from '@/features/s10n/types'
import { useCallback, useEffect, useState } from 'react'

type MerchantInfo = MerchantTheGraphEntity & { plans: Omit<PlanTheGraphEntity, 'merchantTokenId'>[] }

export const useLandingViewState = (merchantTokenId: string) => {
  const [merchantInfo, setMerchantInfo] = useState<MerchantInfo | null>(null)
  const [isNotExist, setIsNotExist] = useState(false)

  const updateMerchantInfo = useCallback(async () => {
    const result = await queryMerchantInfo(Number(merchantTokenId))
    console.log(result)
    if (result.data?.merchantEntity) {
      setMerchantInfo(result.data?.merchantEntity)
    }
    if (result.data?.merchantEntity === null) {
      setIsNotExist(true)
    }
  }, [merchantTokenId])

  useEffect(() => {
    updateMerchantInfo()
  }, [updateMerchantInfo])

  return { merchantInfo, isNotExist }
}
