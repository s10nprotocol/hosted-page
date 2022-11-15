import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
}

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
}

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }))
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
}

const RPC_URLS: { [chainId: number]: string[] } = {
  1: [
    'https://eth-mainnet.g.alchemy.com/v2/QYkohBUIgbqMid4xJeJ2WP-rqTazSgow',
    'https://mainnet.infura.io/v3/70d32c152fbd4bbdb38119b2f905044d',
  ],
  5: [
    'https://goerli.infura.io/v3/70d32c152fbd4bbdb38119b2f905044d',
    'https://rpc.goerli.mudit.blog/',
    'https://rpc.ankr.com/eth_goerli',
  ],
}

// const RPC_URLS: { [chainId: number]: string } = {
//   1: 'https://eth-mainnet.g.alchemy.com/v2/QYkohBUIgbqMid4xJeJ2WP-rqTazSgow',
//   4: 'https://eth-rinkeby.alchemyapi.io/v2/hNq8rS8ubGtj1GWPva6Yii8-JIkjzLHI',
// }

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>((actions) => {
  // Avoid testing for the best URL by only passing a single URL per chain.
  // Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).

  return new WalletConnect({
    actions,
    options: {
      rpc: RPC_URLS,
      qrcode: true,
      // bridge: 'https://bridge.walletconnect.org',
    },
    // defaultChainId: 5,
    onError,
  })
})
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
}

export const CONNECTIONS = [injectedConnection, walletConnectConnection]

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
    }
  }
}

export async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}
