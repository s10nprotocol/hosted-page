import { useWeb3React } from '@web3-react/core'
import { FC, memo } from 'react'
import { menuItems } from '../../constants'
import { renderChainLogo } from '../NetworkLogos'

const NetworkSelector: FC = memo(() => {
  const { isActive, chainId } = useWeb3React()

  if (!isActive || !chainId) return null
  const selectedChainInfo = menuItems.find((item) => item.chainId === chainId)

  return (
    <div className="flex items-center px-2 sm:px-4 sm:py-2 rounded-full sm:border-2 sm:border-black dark:sm:border-gray-200 ">
      {renderChainLogo(selectedChainInfo?.icon)}
      <span className="sm:ml-2 font-semibold dark:text-white w-0 sm:w-auto overflow-hidden">
        {selectedChainInfo?.value}
      </span>
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
