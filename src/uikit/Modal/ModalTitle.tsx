import Close from '@/uikit/icons/Close'
import { FC, memo } from 'react'

interface ModalTitleProps {
  title: string
  onClose: () => void
}

export const ModalTitle: FC<ModalTitleProps> = memo(({ title, onClose }) => {
  return (
    <header className="flex items-center justify-between px-4 py-4">
      <h2 className="flex-grow text-xl font-bold text-white">{title}</h2>
      <div
        className="w-6 h-6 rounded-md flex justify-center items-center hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer"
        onClick={onClose}
      >
        <Close size={16} />
      </div>
    </header>
  )
})
