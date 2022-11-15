import ErrorIcon from '@/uikit/icons/Cancel'
import InfoIcon from '@/uikit/icons/Info'
import SuccessIcon from '@/uikit/icons/Ok'
import { FC, memo } from 'react'
import { Types } from './types'

interface AlertProps {
  type: Types
  content: React.ReactNode
  onClose: () => void
}

const renderIcon = (type: Types) => {
  if (type === 'success') {
    return (
      <span className="mr-1 text-green-500">
        <SuccessIcon width="16px" height="16px" />
      </span>
    )
  }
  if (type === 'info') {
    return (
      <span className="mr-1 text-blue-500">
        <InfoIcon width={16} height={16} />
      </span>
    )
  }
  if (type === 'warning') {
    return (
      <span className="mr-1 text-yellow-500">
        <InfoIcon width={16} height={16} />
      </span>
    )
  }
  if (type === 'danger') {
    return (
      <span className="mr-1 text-red-600 flex-none">
        <ErrorIcon width={16} height={16} />
      </span>
    )
  }
  return null
}

const getColorCls = (type: Types) => {
  if (type === 'success') {
    return 'bg-green-50 border-green-300'
  }
  if (type === 'info') {
    return 'bg-blue-50 border-blue-300'
  }
  if (type === 'warning') {
    return 'bg-yellow-50 border-yellow-300'
  }
  if (type === 'danger') {
    return 'bg-red-50 border-red-300'
  }
}

export const Alert: FC<AlertProps> = memo(({ type, content }) => {
  return (
    <div className={`flex border px-2 py-1 items-center rounded ${getColorCls(type)}`}>
      {renderIcon(type)}
      <div className=" text-sm">{content}</div>
    </div>
  )
})
