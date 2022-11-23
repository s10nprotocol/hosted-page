import { S10nSDK } from '@s10nprotocol/sdk'
import { useCallback, useEffect } from 'react'

import { subManagerContractAddress } from '@/features/s10n/constants'
import { callAndRetry } from '@/utils'
import { useWeb3React } from '@web3-react/core'

let s10nSDKInstant: S10nSDK | null = null

interface CreatePlanOpts {
  merchantTokenId: number
  name: string
  desc: string
  billingPeriod: number
  paymentToken: string
  payeeAddress: string
  pricePerBillingPeriod: string
  isSBT: boolean
  maxTermLength: number
  canResubscribe: boolean
}

export const useS10n = () => {
  const { account, provider } = useWeb3React()

  useEffect(() => {
    if (account && provider && !s10nSDKInstant) {
      s10nSDKInstant = new S10nSDK(subManagerContractAddress, provider.getSigner())
      callAndRetry(async () => {
        await s10nSDKInstant?.init()
      })
    }
  }, [provider, account])

  const createMerchant = useCallback(async (data: { name: string; isSBT: boolean }) => {
    if (s10nSDKInstant) {
      const result = await s10nSDKInstant.createMerchant(data.name, data.isSBT)
      return result
    }
  }, [])

  const init = useCallback(async () => {
    if (s10nSDKInstant) {
      await s10nSDKInstant.init()
    }
  }, [])

  const getPlan = useCallback(async (merchantTokenId: number, planIndex: number) => {
    if (s10nSDKInstant) {
      const result = await s10nSDKInstant.getPlan(merchantTokenId, planIndex)
      return result
    }
  }, [])

  const createPlan = useCallback(async (data: CreatePlanOpts) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.createPlan(data)
      return tx
    }
  }, [])

  const updatePlan = useCallback(
    async (merchantTokenId: number, planIndex: number, name: string, description: string, payeeAddress: string) => {
      if (s10nSDKInstant) {
        const tx = await s10nSDKInstant.updatePlan(merchantTokenId, planIndex, name, description, payeeAddress)
        return tx
      }
    },
    []
  )

  const disabledPlan = useCallback(async (merchantTokenId: number, planIndex: number) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.disablePlan(merchantTokenId, planIndex)
      return tx
    }
  }, [])

  const enablePlan = useCallback(async (merchantTokenId: number, planIndex: number) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.enablePlan(merchantTokenId, planIndex)
      return tx
    }
  }, [])

  const getPlanManagerAddress = useCallback(async () => {
    if (s10nSDKInstant) {
      const result = await s10nSDKInstant.planManager()
      return result
    }
  }, [])

  const createSub = useCallback(async (data: { merchantTokenId: number; planIndex: number }) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.createSubscription(data.merchantTokenId, data.planIndex)
      return tx
    }
  }, [])

  const chargeSub = useCallback(async (subscriptionTokenId: number) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.charge(subscriptionTokenId)
      return tx
    }
  }, [])

  const cancelSub = useCallback(async (data: { subscriptionTokenId: number }) => {
    if (s10nSDKInstant) {
      const tx = await s10nSDKInstant.cancelSubscription(data.subscriptionTokenId)
      return tx
    }
  }, [])

  const getMerchantSubscriptionTotal = useCallback(async (merchantTokenId: number) => {
    if (s10nSDKInstant) {
      const total = await s10nSDKInstant.getMerchantSubscriptionTotal(merchantTokenId)
      return total.toNumber()
    }
  }, [])

  const getMerchantPlanSubscriptionTotal = useCallback(async (merchantTokenId: number, planIndex: number) => {
    if (s10nSDKInstant) {
      const total = await s10nSDKInstant.getMerchantPlanSubscriptionTotal(merchantTokenId, planIndex)
      return total.toNumber()
    }
  }, [])

  const getSubscriptionTokenURI = useCallback(async (subscriptionTokenId: number) => {
    if (s10nSDKInstant) {
      return s10nSDKInstant.getSubscriptionTokenUri(subscriptionTokenId)
    }
  }, [])

  return {
    merchantTokenAddress: s10nSDKInstant?.merchantTokenManager,
    subscriptionTokenAddress: s10nSDKInstant?.subscriptionTokenManager,
    init,
    createMerchant,
    getPlanManagerAddress,
    getPlan,
    createPlan,
    disabledPlan,
    enablePlan,
    updatePlan,
    createSub,
    chargeSub,
    cancelSub,
    getMerchantSubscriptionTotal,
    getMerchantPlanSubscriptionTotal,
    getSubscriptionTokenURI,
  }
}
