import { utils } from 'ethers'
import { minChargePlanPrice } from '../constants'

export const abi = [
  'event Upgraded(address indexed name)',
  'event Initialized(uint8 version)',
  'event AdminChanged(address previousAdmin, address newAdmin)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event MerchantCreated(address indexed owner, uint256 tokenId, string name)',
  'event MerchantUpdated(address indexed owner, uint256 tokenId, string name)',
  'event PlanCreated(uint256 indexed merchantTokenId, uint256 planIndex, uint256 price, address paymentToken, address payeeAddress, uint8 period, string name, string description, uint maxTermLength, bool isSBT, bool canResubscribe)',
  'event PlanUpdated(uint256 indexed merchantTokenId, uint256 planIndex, address payeeAddress, string name, string description)',
  'event PlanDisabled(uint256 indexed merchantTokenId, uint256 planIndex)',
  'event SubscriptionCreated(uint256 merchantTokenId, uint256 planIndex, address subscriber, uint256 subscriptionTokenId)',
  'event SubscriptionCharged(uint256 indexed merchantTokenId, uint256 indexed subscriptionTokenId, uint256 price, address paymentToken, address indexed payeeAddress, uint256 billingTime, uint256 platformFee, address platformFeeAddress)',
  'event SubscriptionCanceled(uint256 merchantTokenId, uint256 subscriptionTokenId)',
]

export const getSubManagerInterface = () => {
  const iface = new utils.Interface(abi)
  return iface
}

export const getBillingPeriod = (periodEnum: 0 | 1 | 2 | 3 | 4) => {
  const m = {
    0: 'DAILY',
    1: 'WEEKLY',
    2: 'MONTHLY',
    3: 'QUARTERLY',
    4: 'ANNUALLY',
  }
  return m[periodEnum]
}

export const getTimePeriod = (periodEnum: number) => {
  const m: Record<string, string> = {
    0: 'DAY',
    1: 'WEEK',
    2: 'MONTH',
    3: 'QUARTER',
    4: 'YEAR',
  }
  return m[periodEnum]
}

export const getTimePeriodNumber = (periodEnum: number) => {
  const m: Record<string, number> = {
    0: 24 * 60 * 60,
    1: 7 * 24 * 60 * 60,
    2: 31 * 24 * 60 * 60,
    3: 92 * 24 * 60 * 60,
    4: 365 * 24 * 60 * 60,
  }
  return m[periodEnum]
}

export const formatChargeError = (msg?: string) => {
  if (msg?.includes('transfer amount exceeds balance')) {
    return 'Charge Failed: balance is not enough!'
  }
  if (msg?.includes('must after bill time')) {
    return ''
  }
  if (!msg) {
    return ''
  }

  return 'Charge Failed'
}

export const validatePlanPrice = (price: number) => {
  return price >= minChargePlanPrice || price === 0
}
