import { useAppDispatch } from '@/store'
import { updateTokenInfo } from '@/store/s10n'
import { useSelectTokenInfo } from '@/store/s10n/selectors'
import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect } from 'react'

const abi = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

let erc20: Contract | null = null

const requestTasks: Record<string, boolean> = {}

export const useTokenInfo = (tokenAddress: string) => {
  const tokenInfo = useSelectTokenInfo(tokenAddress)
  const dispatch = useAppDispatch()
  const saveTokenInfo = useCallback(
    (address: string, decimals: number, symbol: string) => {
      dispatch(updateTokenInfo({ address, decimals, symbol }))
    },
    [dispatch]
  )
  const { provider } = useWeb3React()

  const updateTokenMap = useCallback(async () => {
    if (provider) {
      try {
        if (requestTasks[tokenAddress]) return
        requestTasks[tokenAddress] = true
        if (!erc20) {
          erc20 = new Contract(tokenAddress, abi, provider)
        }
        const [decimals, symbol] = await Promise.all([erc20.decimals(), erc20.symbol()])
        saveTokenInfo(tokenAddress, decimals, symbol)
      } catch (e) {
      } finally {
        if (requestTasks[tokenAddress]) {
          requestTasks[tokenAddress] = false
        }
      }
    }
  }, [provider, saveTokenInfo, tokenAddress])

  useEffect(() => {
    if (!tokenInfo) {
      if (!requestTasks[tokenAddress]) {
        updateTokenMap()
      }
    }
  }, [tokenAddress, tokenInfo, updateTokenMap])

  return tokenInfo
}
