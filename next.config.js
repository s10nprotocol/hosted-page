/** @type {import('next').NextConfig} */
const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }

    return config
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    stage: process.env.STAGE,
    subManagerContractAddress: process.env.SUBMANAGER_CONTRACT,
    theGraphApiUrl: process.env.THE_GRAPH_API_URL,
    maxMerchantAmount: process.env.MAX_MERCHANT,
    minChargePlanPrice: process.env.MIN_CHARGE_AMOUNT,
    merchantTokenContract: process.env.MERCHANT_TOKEN_CONTRACT,
    subscriptionTokenContract: process.env.SUBSCRIPTION_TOKEN_CONTRACT,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
