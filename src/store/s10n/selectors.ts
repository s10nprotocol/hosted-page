import { createSelector } from '@reduxjs/toolkit'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { RootState, useAppSelector } from '../index'

const selectCurrentMerchantTokenId = (state: RootState) => state.s10n.currentMerchantTokenId
const selectMerchantMetaMap = (state: RootState) => state.s10n.merchantMetaMap
const selectAccountMerchantIds = (state: RootState) => state.s10n.accountMerchantList
const selectSupportedTokens = (state: RootState) => state.s10n.supportedTokens
const selectCurrentMerchant = createSelector(
  selectCurrentMerchantTokenId,
  selectMerchantMetaMap,
  (merchantTokenId, merchantMap) => {
    if (merchantTokenId === -1) {
      return null
    }
    return merchantMap[merchantTokenId]
  }
)
const selectAccountMerchants = (account: string) =>
  createSelector(selectAccountMerchantIds, selectMerchantMetaMap, (idMap, merchantMap) => {
    return idMap[account.toLowerCase()]?.map((id) => merchantMap[id])
  })
const selectTokenMap = (state: RootState) => state.s10n.tokenMap

export const useSelectCurrentMerchant = () => {
  const { account } = useWeb3React()
  const currentMerchant = useAppSelector(selectCurrentMerchant)
  const ownerMerchantIdsMap = useAppSelector(selectAccountMerchantIds)
  if (!account) return undefined
  const ids = ownerMerchantIdsMap[account.toLowerCase()]

  if (currentMerchant && ids?.includes(Number(currentMerchant.merchantTokenId))) {
    return currentMerchant
  }
  return undefined
}

export const useSelectCurrentUserMerchantList = () => {
  const currentMerchantTokenId = useAppSelector((state) => state.s10n.currentMerchantTokenId)
  return currentMerchantTokenId
}

export const useSelectAccountMerchants = (account: string) => {
  const selector = useMemo(() => selectAccountMerchants(account), [account])
  const merchants = useAppSelector(selector) || []
  return merchants
}

export const useSelectTokenInfo = (tokenAddress: string): { decimals: number; symbol: string } | undefined => {
  const tokenMap = useAppSelector(selectTokenMap)

  return tokenMap[tokenAddress.toLowerCase()]
}

export const useSelectSupportedTokens = () => {
  const tokens = useAppSelector(selectSupportedTokens)
  return tokens
}

export const useSelectMaxMerchantAmount = () => {
  const maxMerchantAmount = useAppSelector((state) => state.s10n.maxMerchantAmount)
  return maxMerchantAmount
}
