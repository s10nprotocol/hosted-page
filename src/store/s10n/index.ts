import { MerchantTheGraphEntity, TokenEntity } from '@/features/s10n/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Address = string

interface AppConfigType {
  merchantMetaMap: Record<Address, MerchantTheGraphEntity>
  currentMerchantTokenId: number
  accountMerchantList: Record<Address, number[]>
  tokenMap: Record<string, { decimals: number; symbol: string }>
  supportedTokens: TokenEntity[]
  maxMerchantAmount: number
}

export const initialS10nState = {
  merchantMetaMap: {},
  accountMerchantList: {},
  currentMerchantTokenId: -1,
  tokenMap: {},
  maxMerchantAmount: 5,
} as AppConfigType

export const s10nSlick = createSlice({
  name: 'appConfig',
  initialState: initialS10nState,
  reducers: {
    updataMerchantMeta: (state, action: PayloadAction<MerchantTheGraphEntity>) => {
      state.merchantMetaMap[action.payload.merchantTokenId] = action.payload
    },
    updateCurrentMerchantTokenId: (state, action: PayloadAction<number>) => {
      state.currentMerchantTokenId = action.payload
      window?.localStorage.setItem('merchantTokenId', String(action.payload))
    },
    updateFromMerchantList: (state, action: PayloadAction<MerchantTheGraphEntity[]>) => {
      action.payload.forEach((merchant) => {
        state.merchantMetaMap[merchant.merchantTokenId] = {
          ...merchant,
          merchantTokenId: merchant.merchantTokenId,
        }
        if (state.accountMerchantList[merchant.owner.toLowerCase()]) {
          if (!state.accountMerchantList[merchant.owner.toLowerCase()].includes(Number(merchant.merchantTokenId))) {
            state.accountMerchantList[merchant.owner.toLowerCase()].push(Number(merchant.merchantTokenId))
          }
        } else {
          state.accountMerchantList[merchant.owner.toLowerCase()] = [Number(merchant.merchantTokenId)]
        }
      })
      const merchantTokenIdInLocalStorage = window?.localStorage.getItem('merchantTokenId')
      if (
        merchantTokenIdInLocalStorage &&
        action.payload.find((m) => Number(m.merchantTokenId) === Number(merchantTokenIdInLocalStorage))
      ) {
        state.currentMerchantTokenId = Number(merchantTokenIdInLocalStorage)
      } else if (action.payload[0]) {
        state.currentMerchantTokenId = Number(action.payload[0].merchantTokenId)
        window?.localStorage.setItem('merchantTokenId', action.payload[0].merchantTokenId)
      }
    },
    updateTokenInfo: (state, action: PayloadAction<{ address: string; decimals: number; symbol: string }>) => {
      state.tokenMap[action.payload.address] = { decimals: action.payload.decimals, symbol: action.payload.symbol }
    },
    updateSupportTokens: (state, action: PayloadAction<TokenEntity[]>) => {
      state.supportedTokens = action.payload
      action.payload.forEach((token) => {
        state.tokenMap[token.address] = {
          decimals: token.decimals,
          symbol: token.symbol,
        }
      })
    },
    updateS10nState: (state, action: PayloadAction<Partial<AppConfigType>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const {
  updataMerchantMeta,
  updateFromMerchantList,
  updateSupportTokens,
  updateTokenInfo,
  updateS10nState,
  updateCurrentMerchantTokenId,
} = s10nSlick.actions

export default s10nSlick.reducer

export * from './selectors'
