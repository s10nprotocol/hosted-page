import Close from '@/uikit/icons/Close'
import Image from 'next/image'
import { FC, memo, useCallback } from 'react'

import Blokies from '@/uikit/Blockies'
import { Modal } from '@/uikit/Modal'
import { getEllipsisText } from '@/utils/formatter'

import { useModalHandler } from '@/hooks/interaction/useModalHandler'

import { connectors } from '@/components/Header/config'
import { CONNECTIONS } from '@/connection'
import { useScanHost } from '@/hooks/useScanHost'
import { useWeb3React } from '@web3-react/core'

const Account: FC = memo(() => {
  const { account, chainId, connector } = useWeb3React()
  const authenticate = useCallback(async (connectorId: string) => {
    const connection = CONNECTIONS.find((c) => c.type === connectorId)
    await connection?.connector.activate()
  }, [])
  const logout = useCallback(() => {
    if (connector.deactivate) {
      connector.deactivate()
    } else {
      connector.resetState()
    }
  }, [connector])
  const [[isConnectorVisible], showConnector, hideConnector] = useModalHandler()
  const [[isDisconnectorVisible], showDisconnector, hideDisconnector] = useModalHandler()
  const scanHost = useScanHost()
  const handleLogout = useCallback(() => {
    logout()
    hideDisconnector()
  }, [hideDisconnector, logout])

  return (
    <>
      <div className="flex items-center">
        {account && (
          <div
            className="flex items-center border-0 md:border-2 border-gray-900 dark:border-gray-50 cursor-pointer hover:bg-gray-100/20 dark:hover:bg-gray-700 py-1 px-4 rounded-3xl"
            onClick={showDisconnector}
          >
            <p className="text-black dark:text-white font-bold w-0 sm:mr-2 sm:w-auto overflow-hidden">
              {getEllipsisText(account, 6)}
            </p>
            <Blokies seed={account} className="rounded-full" />
          </div>
        )}
        {!account && (
          <button
            id="connectBtn"
            onClick={showConnector}
            className="px-6 py-2 text-white bg-sky-600 hover:bg-sky-700 rounded-3xl"
          >
            Connect
          </button>
        )}
      </div>
      <Modal visible={isConnectorVisible} onMaskClick={hideConnector}>
        <div
          className="bg-white p-4 rounded-2xl dark:bg-gray-600"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}
        >
          {connectors.map(({ title, icon, connectorId }, key) => (
            <div
              className="flex flex-col items-center w-36 py-4"
              key={key}
              onClick={async () => {
                try {
                  hideConnector()
                  await authenticate(connectorId)
                  window.localStorage.setItem('connectorId', connectorId)
                } catch (e) {
                  console.error(e)
                }
              }}
            >
              <Image width="50" height="50" src={icon} alt={title} />
              <span className="pt-2 text-black dark:text-white">{title}</span>
            </div>
          ))}
        </div>
      </Modal>
      <Modal visible={isDisconnectorVisible} onMaskClick={hideDisconnector}>
        <div className="pb-4 w-96 bg-white dark:bg-gray-700 rounded-2xl">
          <header className="flex items-center justify-between px-4 py-4">
            <h2 className="flex-grow text-xl font-bold text-black dark:text-white">Account</h2>
            <div
              className="w-6 h-6 rounded-md flex justify-center text-gray-600 dark:text-gray-50 items-center hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer"
              onClick={hideDisconnector}
            >
              <Close size={16} />
            </div>
          </header>
          <div className="flex flex-col mx-4 p-4 border border-gray-500 rounded-xl">
            <div className="flex items-center text-black">
              <Blokies seed={account || ''} className="ml-2 rounded-full" />
              <p className="ml-4 font-bold text-black dark:text-white">{getEllipsisText(account || '', 6)}</p>
            </div>
            <div className="mt-2">
              {chainId && (
                <a
                  className="mt-4 link text-blue-600 dark:text-blue-300"
                  href={`${scanHost}/address/${account}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="px-2">View on Explorer</p>
                </a>
              )}
            </div>
          </div>
          <div className="mt-4 flex mx-4">
            <button
              className="w-full  px-6 py-2 bg-red-700 dark:bg-red-800 text-white rounded-lg"
              onClick={handleLogout}
            >
              Disconnect
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
})

export default Account
