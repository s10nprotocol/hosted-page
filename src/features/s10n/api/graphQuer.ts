import { theGraphApiUrl } from '@/features/s10n/constants'
import { createClient } from 'urql'

export const client = createClient({
  url: theGraphApiUrl,
})

export const queryAllMerchantByOwner = async (owner: string) => {
  return client
    .query(
      `query {
          merchantEntities(
            where: {owner: "${owner}"}
            orderBy: createdAt
            orderDirection: desc
          ) {
            id
            name
            owner
            merchantTokenId
            updatedAt
            createdAt
          }
        }
      `,
      {}
    )
    .toPromise()
}

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

export const queryMerchantInfo = async (merchantTokenId: number | string) => {
  return client
    .query<MerchantInfoRes>(
      `
        {
          merchantEntity(id: ${merchantTokenId}) {
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
          aggregateMerchantDailyEntities(where: {merchantTokenId: "${merchantTokenId}"}) {
            id
            merchantTokenId
            amount
            ts
            updatedAt
            createdAt
          }
          aggregateMerchantTotalEntity(id: ${merchantTokenId}) {
            id
            merchantTokenId
            amount
            updatedAt
            createdAt
          }
          subscriptionEntities(
            where: {merchantTokenId: "${merchantTokenId}"}
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
      `,
      {}
    )
    .toPromise()
}

export const queryAllMerchantPlans = async (merchantTokenId: number | string) => {
  return client
    .query(
      `query {
        planEntities(
          where: {merchantTokenId: "${merchantTokenId}"}
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
          updatedAt
          createdAt
        }
        }
      `,
      {}
    )
    .toPromise()
}

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
  includeMerchant?: string
  includePlan?: string
}

export const querySubscriptionByFilters = async (filter: FetchSubscriptionOpts) => {
  const filterStrings: string[] = []
  if (filter.merchantTokenId) {
    filterStrings.push(`merchantTokenId: "${filter.merchantTokenId}"`)
  }
  if (filter.plan) {
    filterStrings.push(`plan_: {name_contains_nocase: "${filter.plan}"}`)
  }
  if (filter.createStartTime) {
    filterStrings.push(`createdAt_gt:"${filter.createStartTime}"`)
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
  return client
    .query(
      `query {
          subscriptionEntities(
            ${filterContent}
            orderBy: createdAt
            orderDirection: desc
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
      `,
      {}
    )
    .toPromise()
}

interface FetchInvoiceOpts {
  merchantTokenId?: number | string
  subscriber?: string
  plan?: string
  merchant?: string
  invoiceStartTime?: number
  invoiceEndTime?: number
  page?: number
  size?: number
  includeMerchant?: 'true' | 'false'
}

export interface InvoiceResponse {
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

export const queryInvoicesByFilters = async (filter: FetchInvoiceOpts) => {
  const filterStrings: string[] = []
  if (filter.merchantTokenId) {
    filterStrings.push(`merchantTokenId: "${filter.merchantTokenId}"`)
  }
  if (filter.subscriber) {
    filterStrings.push(`subscription_:{subscriber: "${filter.subscriber}"}`)
  }
  if (filter.plan) {
    filterStrings.push(`plan_: {name_contains_nocase: "${filter.plan}"}`)
  }
  if (filter.merchant) {
    filterStrings.push(`plan_: { merchant_{name_contains_nocase: "${filter.merchant}"}}`)
  }
  if (filter.invoiceStartTime) {
    filterStrings.push(`createdAt_gt:"${filter.invoiceStartTime}"`)
  }
  if (filter.invoiceEndTime) {
    filterStrings.push(`createdAt_lt:"${filter.invoiceEndTime}"`)
  }
  let filterContent = ''
  if (filterStrings.length > 0) {
    filterContent = `where: {${filterStrings.join(',')}}`
  }
  return client
    .query<InvoiceResponse>(
      `query {
        invoiceEntities(
          ${filterContent}
          orderBy: createdAt
          orderDirection: desc
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
          billingTime
          createdAt
          txHash
        }
      }
      `,
      {}
    )
    .toPromise()
}
