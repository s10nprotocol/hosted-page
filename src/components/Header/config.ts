import Metamask from './WalletIcons/metamaskWallet.png'
import WalletConnect from './WalletIcons/wallet-connect.svg'

export const connectors = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: 'INJECTED',
    priority: 1,
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: 'WALLET_CONNECT',
    priority: 2,
  },
  // {
  //   title: "Trust Wallet",
  //   icon: TrustWallet,
  //   connectorId: "injected",
  //   priority: 3,
  // },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: "injected",
  //   priority: 999,
  // },
]
