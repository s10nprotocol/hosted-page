import { useTokenInfo } from '@/hooks/useTokenInfo'
import { formatUnits } from '@ethersproject/units'
import { FC, memo } from 'react'

interface TokenPriceProps {
  tokenAddress: string
  price: string
}

export const TokenPrice: FC<TokenPriceProps> = memo(({ tokenAddress, price }) => {
  const tokenInfo = useTokenInfo(tokenAddress)
  return <>{formatUnits(price, tokenInfo?.decimals || 18)}</>
})
