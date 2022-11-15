import type { utils } from 'ethers'

export enum BillingPeriod {
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  YEAR,
}

export interface PlanType {
  merchantId: number
  name: string
  description: string
  billingPeriod: BillingPeriod
  paymentToken: string // address
  pricePerBillingPeriod: string
  enabled: boolean
}

export interface MerchantTokenType {
  tokenId: number
  name: string
  payeeAddress: string
}

export interface UserMerchantData {
  merchantAmout?: number
  merchantList?: MerchantTokenType[]
}

export interface SubTokenType {
  tokenId: number
  name: string
  image: string
  description: string
  attributes: { trait_type: string; value: string }[]
}

export interface SubInfoType {
  enabled: boolean
  merchantTokenId: number
  nextBillingTime: number
  planIndex: number
  subEndTime: number
  subStartTime: number
  subTokenId: number
}

export interface SubscriptionEntity {
  subscriptionTokenId: number
  merchantTokenId: number
  planIndex: number
  subscriber: string
  createdAtBlockNumber: number
  createdTimestamp: number
  updatedAtBlockNumber: number
  updatedTimestamp: number
  nextBillingTime?: number | null
  endTime?: number | null
  priceNumber?: number | null
  enabled: boolean
  // plan?: PlanEntity
}

export interface PlanEntity {
  contract: string
  merchantTokenId: number
  planIndex: number
  name: string
  description: string
  payeeAddress: string
  price: string
  paymentToken: string
  maxTermLength: number
  period: number
  isSBT: boolean
  canResubscribe: boolean
  createdAtBlockNumber: number
  createdTimestamp: number
  updatedAtBlockNumber: number
  updatedTimestamp: number
  enabled: boolean
}

export interface PlanTheGraphEntity {
  merchantTokenId: string
  planIndex: string
  name: string
  description: string
  payeeAddress: string
  price: string
  paymentToken: string
  maxTermLength: string
  billingPeriod: number
  isSBT: boolean
  canReSubscribe: boolean
  createdAt: string
  enabled: boolean
}

export interface MerchantEntity {
  merchantTokenId: number
  name: string
  merchantOwner: string
  createdTimestamp: number
  updatedTimestamp: number
  plans?: PlanEntity[]
}

export interface MerchantTheGraphEntity {
  merchantTokenId: string
  name: string
  owner: string
  createdAt: string
}

export interface InvoiceEntity {
  subscriptionTokenId: number
  contract: string
  merchantTokenId: number
  price: string
  paymentToken: string
  payeeAddress: string
  billingTime: number
  platformFee: string
  platformFeeAddress: string
  createdAtBlockNumber: number
  createdTimestamp: number
  transactionHash?: string
  // merchant?: MerchantEntity
  // subscription?: SubscriptionEntity
}

export interface InvoiceTheGraphEntity {
  subscriptionTokenId: string
  price: string
  paymentToken: string
  payeeAddress: string
  billingTime: string
  createdAt: string
}

export interface LogEntity {
  transactionHash: string
  blockNumber: number
  blockHash: string
  transactionIndex: number
  address: string
  data: string
  logIndex: number
  topic0: string
  topic1: string | null
  topic2: string | null
  topic3: string | null
}

export type EventHandler = (
  log: utils.LogDescription,
  contract: string,
  blockNumber: number,
  timestamp: number,
  logEntity: LogEntity
) => Promise<any[]>

export interface MerchantStatistics {
  activeSubscriptionCount: 2
  totalSubscriptionCount: 3
  cumulativeIncome: 2
  futureIncome: 0
  planSubscriptionStat: { planIndex: number; count: number }[]
}

export type DetailMerchantInfo = MerchantEntity & { plans: PlanEntity[] } & { statistics: MerchantStatistics }

export interface TokenEntity {
  address: string
  decimals: number
  symbol: string
  rate: number
}

export interface UserStat {
  userSubscriptionCount: number
  userSubs: (SubscriptionEntity & { plan: PlanEntity })[]
  userFuturePayment: number
  tokens: TokenEntity[]
}

export interface PaginationResponse<T> {
  page: number
  total: number
  size: number
  data: T[]
}

export interface MerchantSubscriptionsResponse {
  page: number
  total: number
  size: number
  data: SubscriptionEntity[]
}

export interface ChargeFailure {
  subscriptionTokenId: number
  dueTime: number
  newestFailReason: string
  subscriber: string
  merchantTokenId: number
}
