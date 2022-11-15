import { useCallback } from 'react'
import { useQuery } from 'urql'

interface FetchSubscriptionOpts {
  merchantTokenId?: number | string
  plan?: string
  enabled?: string
  createStartTime?: number
  createEndTime?: number
  planIndex?: number | string
  subscriber?: string
  page?: number
  size?: number
}

export interface SubscriptionEntitiesResponse {
  subscriptionEntities: {
    subscriptionTokenId: string
    subscriber: string
    merchantTokenId: string
    subscriptionStartTime: string
    subscriptionEndTime: string
    nextBillingTime: string
    updatedAt: string
    createdAt: string
    plan: {
      id: string
      name: string
      price: string
      paymentToken: string
      billingPeriod: number
      merchant: {
        name: string
      }
    }
  }[]
}

const getQuery = (filter: FetchSubscriptionOpts) => {
  const filterStrings: string[] = []
  if (filter.merchantTokenId) {
    filterStrings.push(`merchantTokenId: "${filter.merchantTokenId}"`)
  }
  if (filter.planIndex !== undefined) {
    filterStrings.push(`planIndex: "${filter.planIndex}"`)
  } else if (filter.plan) {
    filterStrings.push(`plan_: {name_contains_nocase: "${filter.plan}"}`)
  }
  if (filter.createStartTime) {
    filterStrings.push(`createdAt_gt:"${filter.createStartTime}"`)
  }
  if (filter.subscriber) {
    filterStrings.push(`subscriber_contains: "${filter.subscriber.toLowerCase()}"`)
  }
  if (filter.createEndTime) {
    filterStrings.push(`createdAt_lt:"${filter.createEndTime}"`)
  }
  if (filter.enabled && filter.enabled === 'true') {
    const cur = Math.floor(Date.now() / 1000)
    filterStrings.push(`nextBillingTime_gt: "${cur}"`)
  }
  if (filter.enabled && filter.enabled === 'false') {
    const cur = Math.floor(Date.now() / 1000)
    filterStrings.push(`nextBillingTime_lte: "${cur}"`)
  }
  let filterContent = ''
  if (filterStrings.length > 0) {
    filterContent = `where: {${filterStrings.join(',')}}`
  }

  const query = `query ($skip: Int, $size: Int) {
    subscriptionEntities(
      ${filterContent}
      orderBy: createdAt
      orderDirection: desc
      skip: $skip
      first: $size
    ) {
      subscriptionTokenId
      subscriber
      merchantTokenId
      subscriptionStartTime
      subscriptionEndTime
      nextBillingTime
      updatedAt
      createdAt
      plan {
        id
        name
        price
        paymentToken
        billingPeriod
        merchant {
          name
        }
      }
    }
  }
`
  return query
}

export const useSubscriptionSearch = (filter: FetchSubscriptionOpts, vars?: any) => {
  const query = getQuery(filter)
  const [result, reexecuteQuery] = useQuery<SubscriptionEntitiesResponse>({
    query,
    pause: true,
    variables: vars,
  })

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' })
  }, [reexecuteQuery])

  return { result, refresh }
}
