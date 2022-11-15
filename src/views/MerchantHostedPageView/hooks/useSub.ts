import { TEST_TOKEN_ADDRESS } from '@/features/s10n/constants'
import { useTokenMethods } from '@/hooks/useToken'
import { BigNumber } from '@ethersproject/bignumber'
import type { Transaction } from 'ethers'
import { useCallback } from 'react'

export const useTestAllowance = () => {
  const { getAllowance } = useTokenMethods()

  const testAllowance = useCallback(
    async (account: string, spender: string, amount: string) => {
      const allowance = (await getAllowance(TEST_TOKEN_ADDRESS, account, spender)) as BigNumber
      if (allowance && allowance.gt(BigNumber.from(amount))) {
        return true
      }
      return false
    },
    [getAllowance]
  )
  return testAllowance
}

export const useTestBalance = () => {
  const { getBalance } = useTokenMethods()

  const testBalance = useCallback(
    async (amount: string, account: string) => {
      const balance = (await getBalance(TEST_TOKEN_ADDRESS, account)) as BigNumber
      if (balance && balance.gt(BigNumber.from(amount))) {
        return true
      }
      return false
    },
    [getBalance]
  )
  return testBalance
}

export const useAddAllowance = () => {
  const { approve } = useTokenMethods()

  const addAllowance = useCallback(
    async (spender: string, amount: string) => {
      const tx = (await approve(TEST_TOKEN_ADDRESS, spender, amount)) as Transaction
      await (tx as any).wait()
    },
    [approve]
  )
  return addAllowance
}
