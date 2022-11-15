import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'

const abi = [
  // Read-Only Functions
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function allowance(address owner, address spender) view returns (uint256)',

  // Authenticated Functions
  'function transfer(address to, uint amount) returns (bool)',
  'function approve(address spender, uint amount) returns (bool)',

  // Events
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

export const useTokenMethods = () => {
  const { provider } = useWeb3React()

  const getAllowance = useCallback(
    async (token: string, account: string, spender: string) => {
      console.log(provider, token, account)
      if (provider) {
        const erc20 = new Contract(token, abi, provider)
        const amount = await erc20.allowance(account, spender)
        return amount
      }
    },
    [provider]
  )

  const getDecimals = useCallback(
    async (token: string) => {
      if (provider) {
        const erc20 = new Contract(token, abi, provider)
        const amount = await erc20.decimals()
        return amount
      }
    },
    [provider]
  )

  const getBalance = useCallback(
    async (token: string, account: string) => {
      if (provider) {
        const erc20 = new Contract(token, abi, provider)
        const amount = await erc20.balanceOf(account)
        return amount
      }
    },
    [provider]
  )

  const approve = useCallback(
    async (token: string, spender: string, amount: string) => {
      if (provider) {
        const erc20 = new Contract(token, abi, provider.getSigner() || provider)
        const tx = await erc20.approve(spender, amount)
        return tx
      }
    },
    [provider]
  )
  return { getAllowance, getBalance, approve, getDecimals }
}
