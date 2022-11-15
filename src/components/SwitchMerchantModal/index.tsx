import { useAppDispatch } from '@/store'
import { updateCurrentMerchantTokenId } from '@/store/s10n'
import { useSelectAccountMerchants } from '@/store/s10n/selectors'
import { Modal, ModalTitle } from '@/uikit/Modal'
import { useWeb3React } from '@web3-react/core'
import { FC, memo, useCallback } from 'react'

const maskStyle = { background: 'transparent' }

interface SwitchMerchantModalProps {
  visible: boolean
  onClose: () => void
  onUpdate?: () => Promise<void>
}

const SwitchMerchantModal: FC<SwitchMerchantModalProps> = memo(({ visible, onClose, onUpdate }) => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  const merchants = useSelectAccountMerchants(account || '')
  const handleSwitchMerchant = useCallback(
    (newId: number) => {
      dispatch(updateCurrentMerchantTokenId(newId))
      onClose()
    },
    [dispatch, onClose]
  )

  return (
    <Modal visible={visible} onMaskClick={onClose} maskStyles={maskStyle}>
      <div className="w-96 border border-gray-500  bg-gray-800 backdrop-blur rounded-2xl shadow-2xl">
        <ModalTitle title="Create a new merchaint" onClose={onClose} />
        <main className="px-4 h-96 bg-zinc-900 rounded-b-2xl overflow-y-auto">
          <div className="w-full flex flex-col divide-y divide-gray-700">
            {merchants?.map((m) => (
              <div
                key={m.merchantTokenId}
                className="px-2 w-full h-16 flex items-center hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  handleSwitchMerchant(Number(m.merchantTokenId))
                }}
              >
                {m.name}
              </div>
            ))}
          </div>
        </main>
      </div>
    </Modal>
  )
})

export default SwitchMerchantModal
