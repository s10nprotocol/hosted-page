import { networkConfigs } from '@/constants/network'

export const getExplorer = (chain: string) => networkConfigs[chain]?.blockExplorerUrl
