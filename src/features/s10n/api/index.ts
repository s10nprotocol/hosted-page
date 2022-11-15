import qs from 'query-string'
import type {
  DetailMerchantInfo,
  InvoiceEntity,
  MerchantEntity,
  MerchantSubscriptionsResponse,
  PaginationResponse,
  PlanEntity,
  SubscriptionEntity,
  UserStat,
} from '../types'

export const fetchUserMerchantList = async (owner: string) => {
  const result = await fetch(`/api/v1/merchants?owner=${owner}`, { method: 'GET' }).then((res) => res.json())
  return result
}

export const fetchMerchantInfo = async (merchantTokenId: number | string) => {
  const result = await fetch(`/api/v1/merchant/${merchantTokenId}`, { method: 'GET' }).then((res) => res.json())
  return result as DetailMerchantInfo
}

interface FetchSubscriptionOpts {
  merchantTokenId?: number
  plan?: string
  enabled?: string
  createStartTime?: number
  createEndTime?: number
  planIndex?: number
  subscriber?: string
  page?: number
  size?: number
  includeMerchant?: string
  includePlan?: string
}

export const fetchSubscriptionList = async (opts: FetchSubscriptionOpts) => {
  const query = qs.stringify(opts)
  const result = await fetch(`/api/v1/subscriptions?${query}`, { method: 'GET' }).then((res) => res.json())
  return result as MerchantSubscriptionsResponse
}

export const updateEventSync = async () => {
  const result = await fetch(`/api/v1/jobs/updateEventSync`, { method: 'POST' }).then((res) => res.json())
  return result
}

interface FetchPlansOpts {
  merchantId: number
}

export const fetchMerchantPlans = async (opts: FetchPlansOpts) => {
  const query = qs.stringify(opts)
  const result = await fetch(`/api/v1/plans?${query}`, { method: 'GET' }).then((res) => res.json())
  return result as PlanEntity[]
}

interface FetchInvoiceOpts {
  merchantTokenId?: number
  subscriber?: string
  plan?: string
  invoiceStartTime?: number
  invoiceEndTime?: number
  page?: number
  size?: number
  includeMerchant?: 'true' | 'false'
}

export const fetchInvoices = async (opts: FetchInvoiceOpts) => {
  const query = qs.stringify(opts)
  const result = await fetch(`/api/v1/invoices?${query}`, { method: 'GET' }).then((res) => res.json())
  return result as PaginationResponse<
    InvoiceEntity & { merchant: MerchantEntity } & { subscription: SubscriptionEntity & { plan: PlanEntity } }
  >
}

export const fetchUserStats = async (account: string) => {
  const query = qs.stringify({ account })
  const result = await fetch(`/api/v1/user-stat?${query}`, { method: 'GET' }).then((res) => res.json())
  return result as UserStat
}

export * from './graphQuer'
