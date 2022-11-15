import { AvaxLogo, BSCLogo, ETHLogo, PolygonLogo } from '@/uikit/logos/ChainLogos'

export const renderChainLogo = (chainSym?: string) => {
  if (chainSym === 'ETH') return <ETHLogo />
  if (chainSym === 'AVAX') return <AvaxLogo />
  if (chainSym === 'BSC') return <BSCLogo />
  if (chainSym === 'MATIC') return <PolygonLogo />
  return null
}
