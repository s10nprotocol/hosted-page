import { useScanHost } from '@/hooks/useScanHost'
import { useTokenInfo } from '@/hooks/useTokenInfo'
import { getEllipsisText } from '@/utils/formatter'
import { FC, memo } from 'react'

interface TokenSymbolProps {
  tokenAddress: string
}

export const TokenSymbol: FC<TokenSymbolProps> = memo(({ tokenAddress }) => {
  const tokenInfo = useTokenInfo(tokenAddress)
  const scanHost = useScanHost()
  return (
    <div className="tooltip z-50 max-w-lg" data-tip={getEllipsisText(tokenAddress, 6)}>
      <a target="_blank" rel="noreferrer" href={`${scanHost}/address/${tokenAddress}`} className="link">
        {`${tokenInfo?.symbol}`}
      </a>
    </div>
  )
})
