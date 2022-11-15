import { useCallback } from 'react'
import { useQuery } from 'urql'

interface PlanResponse {
  planIndex: string
  name: string
  description: string
  price: string
  paymentToken: string
  billingPeriod: number
  payeeAddress: string
  maxTermLength: string
  enabled: boolean
  isSBT: boolean
  canReSubscribe: boolean
  createdAt: string
}

interface MerchantInfoRes {
  merchantEntity: {
    id: string
    merchantTokenId: string
    name: string
    owner: string
    createdAt: string
    plans: PlanResponse[]
  }
  aggregateMerchantDailyEntities: {
    id: string
    merchantTokenId: string
    amount: string
    ts: string
    updatedAt: string
    createdAt: string
  }[]
  aggregateMerchantTotalEntity: {
    amount: string
    createdAt: string
    id: string
    merchantTokenId: string
    updatedAt: string
  }
  subscriptionEntities: {
    id: string
    subscriptionStartTime: string
    subscriptionEndTime: string
    nextBillingTime: string
    plan: {
      planIndex: string
    }
  }[]
}

const MerchantEntityQuery = `
  query MerchantEntityQuery ($merchantTokenId: String!) {
      merchantEntity(id: $merchantTokenId) {
        id
        merchantTokenId
        name
        owner
        createdAt
        plans {
          planIndex
          name
          description
          price
          paymentToken
          billingPeriod
          payeeAddress
          maxTermLength
          enabled
          isSBT
          canReSubscribe
          createdAt
        }
      }
      aggregateMerchantDailyEntities(where: {merchantTokenId: $merchantTokenId}) {
        id
        merchantTokenId
        amount
        ts
        updatedAt
        createdAt
      }
      aggregateMerchantTotalEntity(id: $merchantTokenId) {
        id
        merchantTokenId
        amount
        updatedAt
        createdAt
      }
      subscriptionEntities(
        where: {merchantTokenId: $merchantTokenId}
        orderBy: createdAt
        orderDirection: desc
      ) {
        id
        subscriptionStartTime
        subscriptionEndTime
        nextBillingTime
        plan {
          planIndex
        }
      }
  }
`

export const useMerchantStat = (merchantTokenId?: string | number) => {
  const [result, reexecuteQuery] = useQuery<MerchantInfoRes>({
    query: MerchantEntityQuery,
    variables: { merchantTokenId: String(merchantTokenId) },
    pause: merchantTokenId === undefined,
  })

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' })
  }, [reexecuteQuery])

  return { result, refresh }
}
