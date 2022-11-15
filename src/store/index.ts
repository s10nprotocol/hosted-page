import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import appConfigReducer from './appConfig'
import s10n from './s10n'

export function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      appConfig: appConfigReducer,
      s10n,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
      }),
    devTools: process.env.NODE_ENV === 'development',
    preloadedState,
  })
}

export type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>

export type AppDispatch = Store['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useStore = (preloadedState: any) => {
  const store = useMemo(() => {
    return makeStore(preloadedState)
  }, [preloadedState])
  return store
}
