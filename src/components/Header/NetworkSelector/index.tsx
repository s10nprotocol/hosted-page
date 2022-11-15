import { useWeb3React } from '@web3-react/core'
import { FC, memo } from 'react'
import { renderChainLogo } from './NetworkLogos'

const menuItems = [
  {
    key: '0x1',
    chainId: 1,
    value: 'Ethereum',
    icon: 'ETH',
  },
  {
    key: '0x539',
    chainId: 1337,
    value: 'Local Chain',
    icon: 'ETH',
  },
  {
    key: '0x3',
    chainId: 3,
    value: 'Ropsten Testnet',
    icon: 'ETH',
  },
  {
    key: '0x4',
    chainId: 4,
    value: 'Rinkeby Testnet',
    icon: 'ETH',
  },
  {
    key: '0x2a',
    chainId: 42,
    value: 'Kovan Testnet',
    icon: 'ETH',
  },
  {
    key: '0x5',
    chainId: 5,
    value: 'Goerli Testnet',
    icon: 'ETH',
  },
  {
    key: '0x38',
    chainId: 56,
    value: 'Binance',
    icon: 'BSC',
  },
  {
    key: '0x61',
    chainId: 97,
    value: 'Smart Chain Testnet',
    icon: 'BSC',
  },
  {
    key: '0x89',
    chainId: 137,
    value: 'Polygon',
    icon: 'MATIC',
  },
  {
    key: '0x13881',
    chainId: 80001,
    value: 'Mumbai',
    icon: 'MATIC',
  },
  {
    key: '0xa86a',
    chainId: 43114,
    value: 'Avalanche',
    icon: 'AVAX',
  },
  {
    key: '0xa869',
    chainId: 43113,
    value: 'Avalanche Testnet',
    icon: 'AVAX',
  },
]

const NetworkSelector: FC = memo(() => {
  const { account, chainId } = useWeb3React()

  if (!account || !chainId) return null
  const selectedChainInfo = menuItems.find((item) => item.chainId === chainId)

  return (
    <div className="flex items-center px-4 py-2 rounded-full border border-gray-200 ">
      {renderChainLogo(selectedChainInfo?.icon)}
      <span className="ml-2 font-semibold">{selectedChainInfo?.value || chainId}</span>
    </div>
  )

  // return (
  //   <Dropdown
  //     hideAfterPopupClick
  //     popper={
  //       <ul className="bg-white bg-opacity-20 w-44 mt-2 rounded-lg py-3 px-1 backdrop-blur">
  //         {menuItems.map((item) => {
  //           return (
  //             <li
  //               className="flex h-10 px-2 items-center hover:bg-blue-600 rounded-md cursor-pointer"
  //               key={item.key}
  //               onClick={() => {
  //                 switchNetwork(item.key)
  //               }}
  //             >
  //               {renderChainLogo(item.icon)}
  //               <span className="ml-2 text-xs font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
  //                 {item?.value}
  //               </span>
  //             </li>
  //           )
  //         })}
  //       </ul>
  //     }
  //   >

  //   </Dropdown>
  // )
})

export default NetworkSelector
