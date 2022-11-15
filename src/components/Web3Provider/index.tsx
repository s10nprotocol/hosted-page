import { connect, Connection, CONNECTIONS, getConnection } from '@/connection'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { FC, ReactNode, useEffect } from 'react'

interface Web3ProviderProps {
  children: ReactNode
}

export const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  const connectorId = useLocalStorage('connectorId')

  let selectedConnection: Connection | undefined
  if (connectorId) {
    selectedConnection = getConnection(connectorId as any)
  }

  useEffect(() => {
    if (selectedConnection) {
      connect(selectedConnection.connector)
    } // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const connections = CONNECTIONS
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }) => [connector, hooks])

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}
