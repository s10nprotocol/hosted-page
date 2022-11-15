import { useCallback } from 'react'
import { useQuery } from 'urql'

interface FetchInvoiceOpts {
  planName?: string
  merchantName?: string
  merchantTokenId?: number | string
  subscriber?: string
  invoiceStartTime?: number
  invoiceEndTime?: number
}

export interface InvoiceEntitiesResponse {
  invoiceEntities: {
    id: string
    subscriptionTokenId: string
    subscription: {
      subscriber: string
      subscriptionStartTime: string
      subscriptionEndTime: string
      nextBillingTime: string
      plan: {
        name: string
        billingPeriod: String
        merchant: {
          name: string
          owner: string
        }
      }
    }
    price: string
    paymentToken: string
    payeeAddress: string
    billingTime: string
    createdAt: string
    txHash: string
  }[]
}

const getQuery = (filter: FetchInvoiceOpts) => {
  const filterStrings: string[] = []
  if (filter.merchantTokenId) {
    filterStrings.push(`merchantTokenId: "${filter.merchantTokenId}"`)
  }
  if (filter.planName) {
    filterStrings.push(`plan_: {name_contains_nocase: "${filter.planName}"}`)
  }
  if (filter.merchantName) {
    filterStrings.push(`merchant_: {name_contains_nocase: "${filter.merchantName}"}`)
  }
  if (filter.invoiceStartTime) {
    filterStrings.push(`createdAt_gt:"${filter.invoiceStartTime}"`)
  }
  if (filter.subscriber) {
    filterStrings.push(`subscription_: {subscriber_contains: "${filter.subscriber.toLowerCase()}"}`)
  }
  if (filter.invoiceEndTime) {
    filterStrings.push(`createdAt_lt:"${filter.invoiceEndTime}"`)
  }
  let filterContent = ''
  if (filterStrings.length > 0) {
    filterContent = `where: {${filterStrings.join(',')}}`
  }

  const query = `query ($skip: Int, $size: Int) {
    invoiceEntities(
      ${filterContent}
      orderBy: createdAt
      orderDirection: desc
      skip: $skip
      first: $size
    ) {
      id
      subscriptionTokenId
      subscription{
        subscriber
        subscriptionStartTime
        subscriptionEndTime
        nextBillingTime
        plan {
          name
          billingPeriod
          merchant {
            name
            owner
          }
        }
      }
      price
      paymentToken
      payeeAddress
      platformFee
      billingTime
      createdAt
      txHash
    }
  }`
  return query
}

export const useMerchantInvoiceSearch = (filter: FetchInvoiceOpts, vars?: any) => {
  const query = getQuery(filter)
  const [result, reexecuteQuery] = useQuery<InvoiceEntitiesResponse>({
    query,
    pause: true,
    variables: vars,
  })

  const refresh = useCallback(() => {
    reexecuteQuery({ requestPolicy: 'network-only' })
  }, [reexecuteQuery])

  return { result, refresh }
}
