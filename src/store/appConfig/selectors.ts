import { RootState, useAppSelector } from '../index'

const selectSupportChains = (state: RootState) => state.appConfig.supportChains

export const useSelectSupportChains = () => {
  const supportChains = useAppSelector(selectSupportChains)
  return supportChains
}
