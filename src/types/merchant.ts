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
