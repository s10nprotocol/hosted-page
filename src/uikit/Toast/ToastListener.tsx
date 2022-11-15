import { useToast } from './hooks'
import { ToastContainer } from './ToastContainer'

export const ToastListener = () => {
  const { toasts, remove } = useToast()

  const handleRemove = (id: string) => remove(id)

  return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}
