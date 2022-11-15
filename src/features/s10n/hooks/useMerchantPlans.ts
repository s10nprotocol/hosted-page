import { useCallback } from 'react'
import { useQuery } from 'urql'

export interface PlanResponse {
  planEntities: {
    id: string
    planIndex: string
    name: string
    description: string
    price: string
    paymentToken: string
    billingPeriod: string
    payeeAddress: string
    maxTermLength: string
    enabled: boolean
    isSBT: boolean
    canReSubscribe: boolean
    createdAt: string
  }[]
}

const PlanEntityQuery = `
  query PlanEntitierQuery ($merchantTokenId: String!) {
    planEntities(
      where: {merchantTokenId: $merchantTokenId}
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      name
      description
      paymentToken
      price
      billingPeriod
      merchantTokenId
      planIndex
      payeeAddress
      isSBT
      canReSubscribe
      maxTermLength
      enabled
      createdAt
    }
  }
`

export const useMerchantPlans = (merchantTokenId?: string | number) => {
  const [result, reexecuteQuery] = useQuery<PlanResponse>({
    query: PlanEntityQuery,
    variables: { merchantTokenId: String(merchantTokenId) },
    pause: merchantTokenId === undefined,
  })

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' })
  }, [reexecuteQuery])

  return { result, refresh }
}
