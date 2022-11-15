import { ChainEntity } from '@/features/app'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Theme = 'dark' | 'light'

interface AppConfigType {
  theme: Theme
  supportChains: ChainEntity[]
}

export const initialAppState: AppConfigType = {
  theme: 'dark',
  supportChains: [],
}

export const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState: initialAppState,
  reducers: {
    useDarkTheme: (state) => {
      state.theme = 'dark'
    },
    useLightTheme: (state) => {
      state.theme = 'light'
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
    updateSupportChains: (state, action: PayloadAction<ChainEntity[]>) => {
      state.supportChains = action.payload
    },
    updateAppState: (state, action: PayloadAction<Partial<AppConfigType>>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { useDarkTheme, useLightTheme, setTheme, updateSupportChains, updateAppState } = appConfigSlice.actions

export default appConfigSlice.reducer
