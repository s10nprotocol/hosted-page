import { FC } from 'react'
import { Provider } from 'urql'
import { client } from './api'

interface GraphqlProviderProps {
  children: React.ReactNode
}

export const GraphqlProvider: FC<GraphqlProviderProps> = ({ children }) => {
  return <Provider value={client}>{children}</Provider>
}
