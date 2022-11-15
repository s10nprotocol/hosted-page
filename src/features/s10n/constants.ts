import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const subManagerContractAddress = publicRuntimeConfig.subManagerContractAddress
export const theGraphApiUrl = publicRuntimeConfig.theGraphApiUrl
export const maxMerchantAmount = publicRuntimeConfig.maxMerchantAmount
export const minChargePlanPrice = publicRuntimeConfig.minChargePlanPrice
export const TEST_TOKEN_ADDRESS = '0xb0be6e5f1edCcd2f0D8A8b1AbcfC2bB609c5B8F2'
export const merchantTokenContract = publicRuntimeConfig.merchantTokenContract
export const subscriptionTokenContract = publicRuntimeConfig.subscriptionTokenContract
