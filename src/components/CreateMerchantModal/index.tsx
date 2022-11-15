import { Modal, ModalTitle } from '@/uikit/Modal'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { FC, memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateMerchantState } from './hooks'

const maskStyle = { background: 'transparent' }

interface CreateFormData {
  name: string
  isSBT: boolean
}

interface CreateMerchantModalProps {
  visible: boolean
  onClose: () => void
  onUpdate?: () => Promise<void>
}

const CreateMerchantModal: FC<CreateMerchantModalProps> = memo(({ visible, onClose, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', isSBT: true } })
  const [isLoading, setIsLoading] = useState(false)
  const { createMerchant } = useCreateMerchantState()
  const onSubmit = useCallback(
    async (data: CreateFormData) => {
      try {
        setIsLoading(true)
        await createMerchant(data, onClose)
        reset()
        onUpdate && (await onUpdate())
      } catch (e) {
        console.log('create merchant error', e)
      } finally {
        setIsLoading(false)
      }
    },
    [createMerchant, onClose, onUpdate, reset]
  )
  return (
    <Modal visible={visible} onMaskClick={onClose} maskStyles={maskStyle}>
      <div className="w-96 bg-zinc-800 bg-opacity-80 border border-gray-500 backdrop-blur rounded-2xl shadow-2xl">
        <ModalTitle title="Create a new merchant" onClose={onClose} />
        <main className="px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className=" w-full text-sm font-medium ">Merchant Name</label>
              <input
                {...register('name', {
                  required: 'Merchant Name is required!',
                  maxLength: { value: 50, message: 'The max length is 50.' },
                })}
                type="text"
                className="my-1 px-2 py-1 bg-gray-50 bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-full shadow-sm rounded-md"
              />
              <p className="h-4 text-xs text-red-600">{errors.name?.message}</p>
            </div>

            <div className="flex flex-col">
              <label className="flex w-full text-sm font-medium">
                Is Soul Bounded Token{' '}
                <div
                  className="tooltip"
                  data-tip="SBT means Merchant NFT can not be transfer from one address to another"
                >
                  <QuestionMarkCircleIcon className="ml-1 w-4 h-5 text-gray-400" />
                </div>
              </label>
              <input {...register('isSBT')} type="checkbox" className="toggle toggle-accent" />
              <p className="h-4 text-xs text-red-600">{errors.isSBT?.message}</p>
            </div>

            <div className=" py-3 text-right">
              <button type="submit" className={`btn btn-primary h-9 min-h-fit ${isLoading ? 'loading' : ''}`}>
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </Modal>
  )
})

export default CreateMerchantModal
