import { networkConfigs } from '@/constants/network'
import { useWeb3React } from '@web3-react/core'

export const getExplorer = (chain: string) => networkConfigs[chain]?.blockExplorerUrl

export const useScanHost = () => {
  const { chainId } = useWeb3React()
  if (chainId) {
    return getExplorer(`0x${chainId.toString(16)}`)
  } else {
    return ''
  }
}
