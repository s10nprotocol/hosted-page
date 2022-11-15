import Image from 'next/image'
import { FC, memo, useCallback } from 'react'

import Blokies from '@/uikit/Blockies'
import { Modal, ModalTitle } from '@/uikit/Modal'
import { getEllipsisText } from '@/utils/formatter'

import { useModalHandler } from '@/hooks/interaction/useModalHandler'

import { CONNECTIONS } from '@/connection'
import { useScanHost } from '@/hooks/useScanHost'
import { useWeb3React } from '@web3-react/core'
import { connectors } from './config'

const Account: FC = memo(() => {
  const { account, chainId, connector } = useWeb3React()
  const [[isConnectorVisible], showConnector, hideConnector] = useModalHandler()
  const [[isDisconnectorVisible], showDisconnector, hideDisconnector] = useModalHandler()
  const scanHost = useScanHost()
  const handleLogout = useCallback(() => {
    window.localStorage.setItem('connectorId', '')
    if (connector?.deactivate) {
      void connector.deactivate()
    } else {
      void connector.resetState()
    }
    hideDisconnector()
  }, [connector, hideDisconnector])

  return (
    <>
      <div className="flex items-center">
        {account && (
          <div
            className="flex items-center border border-gray-200 cursor-pointer hover:bg-gray-100 hover:bg-opacity-10 py-1 px-4 rounded-full"
            onClick={showDisconnector}
          >
            <p className=" font-bold">{getEllipsisText(account, 6)}</p>
            <Blokies seed={account} className="ml-2 rounded-full" />
          </div>
        )}
        {!account && (
          <button
            id="connectBtn"
            onClick={showConnector}
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Connect
          </button>
        )}
      </div>
      <Modal visible={isConnectorVisible} onMaskClick={hideConnector} maskStyles={{ background: 'transparent' }}>
        <div className="bg-gray-700 p-4 rounded-2xl" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {connectors.map(({ title, icon, connectorId }, key) => (
            <div
              className="flex flex-col items-center w-36 py-4"
              key={key}
              onClick={async () => {
                try {
                  hideConnector()
                  const connection = CONNECTIONS.find((c) => c.type === connectorId)
                  window.localStorage.setItem('connectorId', connectorId)
                  if (connection) {
                    await connection.connector.activate()
                  }
                } catch (e) {
                  console.error(e)
                }
              }}
            >
              <Image width="50" height="50" src={icon} alt={title} />
              <span className="pt-2">{title}</span>
            </div>
          ))}
        </div>
      </Modal>
      <Modal visible={isDisconnectorVisible} onMaskClick={hideDisconnector} maskStyles={{ background: 'transparent' }}>
        <div className="pb-4 w-96 bg-gray-700 rounded-2xl">
          <ModalTitle title="Account" onClose={hideDisconnector} />
          <div className="flex flex-col mx-4 p-4 border border-gray-300 bg-black bg-opacity-10 rounded-xl">
            <div className="flex items-center">
              <Blokies seed={account || ''} className="ml-2 rounded-full" />
              <p className=" ml-1 font-bold">{getEllipsisText(account || '', 6)}</p>
            </div>
            <div>
              {chainId && (
                <a href={`${scanHost}/address/${account}`} target="_blank" rel="noreferrer">
                  <p className="px-2">View on Explorer</p>
                </a>
              )}
            </div>
          </div>
          <div className="mt-4 flex mx-4">
            <button
              className="w-full  px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg"
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
