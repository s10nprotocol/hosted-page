import { useModalHandler } from '@/hooks/interaction/useModalHandler'
import { useAppDispatch } from '@/store'
import { updateCurrentMerchantTokenId, useSelectAccountMerchants, useSelectMaxMerchantAmount } from '@/store/s10n'
import Menu from '@/uikit/Menu'
import { PlusIcon } from '@heroicons/react/solid'
import { useWeb3React } from '@web3-react/core'
import dynamic from 'next/dynamic'
import React, { FC, memo, useCallback, useMemo } from 'react'
import { useMerchantState } from './hooks'

const WrappedCreateMerchantModal = dynamic(() => import('../CreateMerchantModal'), { ssr: false })

interface CreateMerchantUIProps {
  onCreate: () => void
}

export const CreateMerchantUI: FC<CreateMerchantUIProps> = memo(({ onCreate }) => {
  return (
    <div
      className="w-full flex cursor-pointer py-1 px-1 rounded hover:bg-zinc-900 hover:bg-opacity-20"
      onClick={onCreate}
    >
      <span className="flex-grow">Create Merchant</span>{' '}
      <PlusIcon className="ml-2 w-6 h-6  text-gray-400 hover:text-blue-300" />
    </div>
  )
})

export const MerchantSwitcher: FC = memo(() => {
  const { currentMerchant } = useMerchantState()
  const maxMerchantAmount = useSelectMaxMerchantAmount()
  const [[isShowCreateMerchant, isCreateRender], showCreateMerchant, closeCreateMerchant] = useModalHandler()

  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const merchants = useSelectAccountMerchants(account || '')
  const handleSwitchMerchant = useCallback(
    (newId: number) => {
      dispatch(updateCurrentMerchantTokenId(newId))
    },
    [dispatch]
  )

  const menuItems = useMemo(() => {
    const items: { key: string; icon?: React.ReactNode; label: string }[] = [
      ...merchants.map((m) => {
        return {
          key: `switchMerchant-${m.merchantTokenId}`,
          label: m.name,
        }
      }),
    ]
    if (merchants.length < maxMerchantAmount) {
      items.push({
        key: 'createMerchant',
        icon: <PlusIcon />,
        label: 'Create New Merchant',
      })
    }
    return items
  }, [maxMerchantAmount, merchants])

  const handleMenuClick = useCallback(
    (itemKey: string) => {
      if (itemKey === 'createMerchant') {
        showCreateMerchant()
      } else if (itemKey.split('-')[0] === 'switchMerchant') {
        const newId = itemKey.split('-')[1]
        handleSwitchMerchant(Number(newId))
      }
    },
    [handleSwitchMerchant, showCreateMerchant]
  )

  const handleCreateClick = useCallback(() => {
    if (account) {
      showCreateMerchant()
    } else {
      ;(document.querySelector('#connectBtn') as HTMLButtonElement)?.click()
    }
  }, [account, showCreateMerchant])

  return (
    <div className="flex px-4 z-10 w-full h-20 bg-slate-400 bg-opacity-10 rounded-b-3xl items-center ">
      {!currentMerchant && <CreateMerchantUI onCreate={handleCreateClick} />}
      {currentMerchant && (
        <div className="flex w-full">
          <div className="flex flex-col flex-grow flex-shrink">
            <span className=" text-xs text-gray-400">Current Merchant</span>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap break-words font-bold">
              {currentMerchant.name}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Menu items={menuItems} onClick={handleMenuClick}>
              <div className="p-2 cursor-pointer rounded-full hover:bg-black hover:bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>

                {/* <AdjustmentsIcon className="w-6 h-6" /> */}
              </div>
            </Menu>
          </div>
        </div>
      )}
      {isCreateRender && <WrappedCreateMerchantModal visible={isShowCreateMerchant} onClose={closeCreateMerchant} />}
    </div>
  )
})
