import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const QUERY_SIZE = 10
export const stage = publicRuntimeConfig.stage

export const appConfig =
  stage === 'production'
    ? {
        tokens: [
          {
            address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
            decimals: 6,
            symbol: 'USDC',
            rate: 1,
          },
        ],
        chains: [
          {
            chainId: '0x89',
            chainName: 'Polygon',
            iconId: 'MATIC',
          },
        ],
      }
    : {
        tokens: [
          {
            address: '0x66FdcC9c1241e5e5119404c5A8428e3f8A538da7',
            decimals: 6,
            symbol: 'SUSD',
            rate: 1,
          },
        ],
        chains: [
          {
            chainId: '0x5',
            chainName: 'Goerli',
            iconId: 'GoerliETH',
          },
        ],
      }
