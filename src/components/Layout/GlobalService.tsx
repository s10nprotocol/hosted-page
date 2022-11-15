import { CONNECTIONS } from '@/connection'
import { appConfig } from '@/constants'
import { useModalHandler } from '@/hooks/interaction/useModalHandler'
import { useMount } from '@/hooks/useMount'
import { useAppDispatch } from '@/store'
import { updateAppState } from '@/store/appConfig'
import { useSelectSupportChains } from '@/store/appConfig/selectors'
import { updateSupportTokens } from '@/store/s10n'
import { Modal } from '@/uikit/Modal'
import { useWeb3React } from '@web3-react/core'
import { FC, memo, useCallback, useEffect, useMemo } from 'react'

export const GlobalService: FC = memo(() => {
  const { isActivating, isActive, chainId, connector, account } = useWeb3React()

  const [[isShow], showSwitch, closeSwitch] = useModalHandler()
  const dispatch = useAppDispatch()
  const supportedChains = useSelectSupportChains()
  const supportedChainIds = useMemo(() => {
    return supportedChains.map((c) => c.chainId)
  }, [supportedChains])

  // update app config
  const updateAppConfig = useCallback(async () => {
    const config = appConfig
    dispatch(updateAppState({ supportChains: config.chains }))
    if (config.tokens && config.tokens.length > 0) {
      dispatch(updateSupportTokens(config.tokens))
    }
  }, [dispatch])

  useEffect(() => {
    updateAppConfig()
  }, [updateAppConfig])

  // enable web3
  useMount(() => {
    const connectorId = window.localStorage.getItem('connectorId') as string | null | undefined
    if (!isActive && !isActivating && connectorId) {
      const connection = CONNECTIONS.find((c) => c.type === connectorId)
      if (connection && connection.connector.connectEagerly) {
        connection.connector.connectEagerly()
      }
    }
  })

  const handleSwitchNetwork = useCallback(() => {
    if (
      chainId &&
      isActive &&
      supportedChainIds.length !== 0 &&
      !supportedChainIds.includes(`0x${chainId.toString(16)}`)
    ) {
      connector.activate(Number(supportedChainIds[0]))
      showSwitch()
    }
  }, [chainId, connector, isActive, showSwitch, supportedChainIds])

  // switch to target network
  useEffect(() => {
    if (
      chainId &&
      isActive &&
      supportedChainIds.length !== 0 &&
      !supportedChainIds.includes(`0x${chainId.toString(16)}`)
    ) {
      connector.activate(Number(supportedChainIds[0]))
      showSwitch()
    }
    if (chainId && isActive && supportedChainIds.includes(`0x${chainId.toString(16)}`)) {
      closeSwitch()
    }
  }, [chainId, closeSwitch, connector, isActive, showSwitch, supportedChainIds])

  if (isShow) {
    return (
      <Modal visible={true}>
        <div className="rounded-lg px-6 py-8 bg-gray-700 flex flex-col items-center">
          <div>{`Please switch Your network to ${supportedChains[0]?.chainName}!`}</div>
          <button className="mt-5 btn btn-primary" onClick={handleSwitchNetwork}>
            Switch Network
          </button>
        </div>
      </Modal>
    )
  }
  return null
})
